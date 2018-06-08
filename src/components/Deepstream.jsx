import React, { Component } from 'react';
import dt from 'deepstream.io-client-js';
import http from '../pages/InterView/reqs/InterViewReq.js';
import {Feedback} from '@icedesign/base';
const Toast = Feedback.toast;
export default class Deepstream extends Component {
    constructor(props) {
        super(props)
        // &#xe680; 来电
        //&#xe67f; 视频
        //&#xe67e; 接听中
        this.state = {
            dataList: [],
            interviewState: 1,
            music: false,//提示音和接挺icon状态
            listNum: 0,
            client: '',
            once: true
        }
        this.connectionState = false;
        this.listNameArr = [];
    }
    componentDidMount() {
        let _this = this;
        //<!-- ws://deepstream-staging.pingchang666.com --> 予发布
        //<!-- wss://deepstream.pingchang666.com -->生产
        let client = dt(http._config.PC_DEEPSTREAM_HOST);
        // let listNameArr = 'creditCard/d1cb47ee145e9e26008cff0d0c534157$creditCard/0acc7dfd8b1d24edd908c79c01d20574' //队列名称
        client.on('error', function (error) {
            console.log(error)
        })
        client.login();
        this.client = client;
        _this.setState({
            client
        })
        client.on('connectionStateChanged', (connectionState) => { 
            this.connectionState = connectionState;
            this.deepLink();
        })
        
        http.initInterview().then((data) => {
            this.listNameArr = data.data.list&&data.data.list.split('$');
            this.deepLink();
        })
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            music: this.props.musicState
        })
    }

    deepLink() {
        let _this = this;
        if (this.connectionState === 'OPEN' && this.listNameArr && this.listNameArr.length > 0) {
            this.listNameArr && this.listNameArr.forEach((listname, index) => {
                if (listname) {
                    let list = this.client.record.getList(listname);
                    list.subscribe(_this.listChanged.bind(_this, listname), true);
                }
            })
        }
    }
    listChanged(listname, params) {
        let dataJson = [], dataList = {}, listNum = 0, _this = this;
        console.log("listname:", listname);
        console.log("ididid:", params);
        // 删除数据
        if (!params.length) {
            dataList = _this.state.dataList
            dataList[listname] = []
            _this.setState({
                dataList
            })
            listNum = 0;
            for (let key in dataList) {
                let recordArr = dataList[key];
                for (let i = 0; i < recordArr.length; i++) {
                    listNum += 1;
                }
            }
            if (listNum) {
                _this.setState({
                    interviewState: 2,
                    music: true,
                })
            } else {
                _this.setState({
                    interviewState: 1,
                    music: false,
                })
            }
            _this.setState({
                listNum
            })
            return;
        }
        let callMap = {}
        params && params.forEach(function (id, index) {
            _this.state.client.record.getRecord(id).whenReady(function (record) {
                // let jsonObj = {
                //     id: id,
                //     value: record.get()
                // };
                if (record.get('customName')) {
                    callMap[record.get('id')] = {
                        id: id,
                        value: record.get()
                    }
                }
                // jsonObj.value.customName ? dataJson.push(jsonObj) : "";
                let length = params.length - 1
                if (index == length) {
                    let idList = [];
                    for (let interviewId in callMap) {
                        idList.push(interviewId);
                    }
                    http.interviewPermissions(idList.join(',')).then((data) => {
                        for (var i = 0; i < data.data.length; i++) {
                            dataJson.push(callMap[data.data[i].id])
                        }
                        dataList[listname] = dataJson;
                        _this.setState({
                            dataList
                        })
                        for (let key in dataList) {
                            let itemArra = dataList[key]
                            for (let i = 0; i < itemArra.length; i++) {
                                listNum += 1;
                            }
                        }
                        if (listNum) {
                            // document.querySelector("#audio").play();
                            _this.setState({
                                interviewState: 2,
                                music: true,
                            })
                        } else {
                            _this.setState({
                                interviewState: 1,
                                music: false,
                            })
                        }
                        _this.setState({
                            listNum
                        })
                    })

                }
            })
        })
    }
    interviewType(type) {
        if (type == 'creditCard') {
            return (<span>信用卡面签</span>)
        } else if (type == 'interviewOnly') {
            return (<span>仅面签</span>)
        } else {
            return (<span>进件</span>)
        }
    }
    interviewAnswer(id, listname, loanId, type) {
        let { client } = this.state
        let userAgent = navigator.userAgent;
            if (userAgent.indexOf("Chrome") == -1) {
                Toast.show({
                    type: "help",
                    content: "视频面签暂只支持chrome～",
                  });
                return;
            }
        http.initInterview().then((data) => {
            if (this.state.once) {
                this.props.initNetcall(data.data, true)
                this.setState({
                    once: false,
                })
            }
            let list = client.record.getList(listname);
            list.removeEntry(id);
            client.event.emit(id, { accid: data.data.accid });
            this.setState({
                music: false
            })
            // 展示详情
            this.props.interviewDetail(loanId, type)
            // document.querySelector("#audio").pause();
        })
    }

    render() {
        let { dataList, listNum, interviewState, music } = this.state, interview, video, listening = <span>&#xe67e;</span>;
        console.log("datalist:", dataList)
        // console.log("music:",music)

        switch (interviewState) {
            case 1:
                interview = <span>&#xe67f;</span>
                break;
            case 2:
                interview = <span>&#xe680;</span>
                break;
        }
        if (music && listNum) {
            video = <audio src='https://lx-static.cn-bj.ufileos.com/lib/audio/interview-mp3.mp3' autoPlay loop id='audio'></audio>;
        } else {
            video = '';
            interview = <span>&#xe67e;</span>;
        }
        return (
            <div className='pch-interview-deep'>
                {/* 面签提示音 */}
                {video}
                <div className='icon'>
                    {/* {interview} */}
                    <span>&#xe67e;</span>
                    <span className='pch-interview-num'>{listNum}</span>
                </div>
                <ul className='pch-interview-name'>
                    {
                        Object.keys(dataList).map((listname) => {
                            // console.log(dataList[listname])
                            return (
                                dataList[listname].map((item, index) => {
                                    return (
                                        <li key={index}>
                                            <span>{item.value.customName}</span>
                                            {this.interviewType(item.value.type)}
                                            <span className='pch-interviw-answer' onClick={this.interviewAnswer.bind(this, item.id, listname, item.value.id, item.value.type)}>接听</span>
                                        </li>
                                    )
                                })
                            )
                        })
                    }
                </ul>

            </div>
        )
    }
}
