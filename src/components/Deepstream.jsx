import React, { Component } from 'react';
import dt from 'deepstream.io-client-js';
import https from '../pages/InterView/reqs/InterViewReq.js';

export default class Deepstream extends Component {
    constructor(props) {
        super(props)
        // &#xe680; 来电
        //&#xe67f; 视频
        //&#xe67e; 接听中
        this.state = {
            dataList: [],
            interviewType: '&#xe680;',
            music: true,
            listNum: 0,
            clinet: '',
            once: true
        }
    }
    componentDidMount() {
        let _this = this;
        let client = dt('ws://deepstream-staging.pingchang666.com');
        let listNameArr = ['ios2018','android2018'] //队列名称
        client.on('error', function (error) {
            console.log(error)
        })
        client.login();
        this.setState({
            client
        })
        client.on('connectionStateChanged', function (connectionState) {
            if (connectionState === 'OPEN') {
                listNameArr && listNameArr.forEach(function (listname, index) {
                    let list = client.record.getList(listname);
                    list.subscribe(_this.listChanged.bind(_this, listname), true);
                })
            }
        })
    }
    listChanged(listname,params) {
        let dataJson = [], dataList = {}, listNum = 0,_this = this;
        console.log("listname1234:", listname);
        console.log("等待面签的id1234:", params);
        console.log('dataList1234:', _this.state.dataList);
        // 删除数据
        if (!params.length) {
            dataList = _this.state.dataList
            dataList[listname] = []
            _this.setState({
                dataList
            })
            listNum = 0;
            for (let key in this.state.dataList) {
                let recordArr = _this.state.dataList[key];
                for (let i = 0; i < recordArr.length; i++) {
                    listNum += 1;
                }
            }
            // if (_this.music && listNum) {
            //     document.querySelector("#audio").play();
            //     _this.setState({
            //         interviewType: '&#xe67f;'
            //     })
            // }
            this.setState({
                listNum
            })
            return;
        }
        params && params.forEach(function (id, index) {
            _this.state.client.record.getRecord(id).whenReady(function (record) {
                let jsonObj = {
                    id: id,
                    value: record.get()
                };
                jsonObj.value.customName ? dataJson.push(jsonObj) : "";
                let length = params.length - 1
                if (index == length) {
                    dataList[listname] = dataJson;
                    _this.setState({
                        dataList
                    })
                    for (let key in _this.state.dataList) {
                        let itemArra = _this.state.dataList[key]
                        for (let i = 0; i < itemArra.length; i++) {
                            listNum += 1;
                        }
                    }
                    // if (_this.music && listNum) {
                    //     document.querySelector("#audio").play();
                    //     _this.setState({
                    //         interviewType: '&#xe67f;'
                    //     })
                    // }
                    _this.setState({
                        listNum
                    })
                }
            })
        })
    }
    interviewType(type) {
        if(type=='creditCard') {
            return(<span>信用卡面签</span>)
        }else if(type=='interviewOnly') {
            return(<span>仅面签</span>)
        }else {
            return(<span>进件</span>)
        }
    }
    
    interviewAnswer(id,listname) {
        let {clinet} = this.state
        https.initInterviw().then((data) => {
            if (this.state.once) {
                this.props.initNetcall(data.data)
                this.setState({
                    once: false,
                })
            }
            let list = clinet.record.getList(listname);
            list.removeEntry(id);
            clinet.event.emit(id, { accid: data.data.accId });
        })
    }
    
    
    render() {
        let { dataList, listNum } = this.state
        console.log("datalist:",dataList)
        return (
            <div className='pch-interview'>
                <audio src = 'https://lx-static.cn-bj.ufileos.com/lib/audio/interview-mp3.mp3' loop id='audio'></audio>  
                <div className='icon'>
                    &#xe680;
                    <span className='pch-interview-num'>{listNum}</span>
                </div>
                <ul className='pch-interview-name'>
                    {
                        Object.keys(dataList).map((listname) => {
                            console.log(dataList[listname])
                            return (
                                dataList[listname].map((item, index) => {
                                    return (
                                                <li key={index}>
                                                        <span>{item.value.customName}</span>
                                                        {this.interviewType(item.value.type)}
                                                        <span className='pch-interviw-answer' onClick={this.interviewAnswer.bind(this,item.id,listname)}>接听</span>
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