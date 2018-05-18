import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import {
    FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';
import { PROCESS_VIEW } from '../../constants/ProcessViewConstant';
import { PchMaterialSelect } from 'components';

const { Row, Col } = Grid;
const { Option } = Select;
const FormItem = Form.Item;

export default class ProcessDetailItem extends Component {
    constructor() {
        super();

        this.state = {
            execModeData: [{
                value: 0,
                name: '系统'
            }, {
                value: 1,
                name: '页面'
            }]
        };
    }

    /**
     * 获取方式
     * @param  {[type]} execMode [description]
     * @return {[type]}          [description]
     */
    // getExecModeName(execMode) {
    //     let data = this.state.execModeData.filter((item) => item.value == execMode);

    //     if (data.length > 0) {
    //         return data[0].name;
    //     } else {
    //         return '--';
    //     }
    // }
    
    getTransToTaskName(v){
        let d = this.props.selectData;
        let name;

        d.map((item) => {
            if(item.value == v){
                name = item.name;
                return;
            }
        });

        return name || '--';
    }

    render() {
        const { index, item, selectData, setModule, changeView } = this.props;
        console.log(selectData, item.transToTaskOrder, selectData[item.transToTaskOrder])

        return (
            <Row align="top" key={index} className={`container-right-tabRow`}>
                <Col xxs="6" s="2" l="2" className="pch-icon-setting">
                </Col>
                <Col xxs="6" s="3" l="3" className="pch-moduleName">
                    {item.taskTypeName} - {item.taskAlias}
                </Col>
                <Col xxs="6" s="2" l="8">
                    {item.transitionItems && item.transitionItems.map((list, ind) => {
                        return (
                            <div className="pch-target-name" key={ind}>
                                <Input className="input-bottom" disabled defaultValue={list.conditionName} size="large" text={list.transToTaskName} />
                                <i className="icon icon-arrow">&#xe603;</i>
                                <Input disabled size="large" defaultValue={this.getTransToTaskName(list.transToTaskOrder)} />
                            </div>
                        );
                    })}
                </Col>
                <Col xxs="6" s="2" l="3">
                    {item.pageId ? <a className='pch-target' onClick={changeView.bind(this, PROCESS_VIEW.PREVIEWPAGE, item)}>预览</a> : '--'}
                </Col>
                <Col xxs="6" s="2" l="4">
                    {item.productCollectionId ? <div className="pch-target-name">{item.productCollectionName}</div> : '--'}
                </Col>
                <Col xxs="6" s="2" l="2">
                    {item.privilegeItems ? <a className="pch-target" onClick={changeView.bind(this, PROCESS_VIEW.VIEWAUTH, item)}>查看</a> : '--'}
                </Col>
                <Col xxs="6" s="3" l="2">
                    {item.haveRequiredField == '1' ? <a className="pch-target" onClick={changeView.bind(this, PROCESS_VIEW.VIEWFIELD, item)}>查看</a> : '--'}
                </Col>
                {/* <Col xxs="6" s="2" l="3">
                    <div className="pch-target-name">
                        {this.getExecModeName(item.execMode)}
                    </div>
                </Col> */}
            </Row>
        );
    }
}
