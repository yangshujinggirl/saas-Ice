import React, { Component } from 'react';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';
import ProcessFormItem from '../ProcessFormItem';
import ProcessDetailItem from '../ProcessDetailItem';

const {Row, Col} = Grid;

export default class ProcessFormItemList extends Component {
    constructor() {
        super();

        this.state = {};
    }

    getSelectList = (order) => {
        let result = [];

        // 所有模块另默认加一个“结束”模块
        result.push({
            name: '结束',
            value: -1
        });

        this.props.taskItems.map((item) => {
            if (item.taskOrder != order) {
                result.push({
                    name: item.taskAlias,
                    value: item.taskOrder,
                });
            }
        });

        return result;
    }

    render() {
        const { taskItems = [], setModule, changeView, editable = true, validateForm } = this.props;

        return (
            <div className="container-right-con">
                <Row className="container-right-title">
                    <Col xxs="6" s="2" l="2">
                    </Col>
                    <Col xxs="6" s="3" l="3">
                        模块
                    </Col>
                    <Col xxs="6" s="2" l="8" className="pch-target-name">
                        <span>条件</span><span>跳转</span>
                    </Col>
                    <Col xxs="6" s="2" l="3">
                        页面
                    </Col>
                    <Col xxs="6" s="2" l="4">
                        材料清单
                    </Col>
                    <Col xxs="6" s="2" l="2">
                        权限
                    </Col>
                    <Col xxs="6" s="3" l="2">
                        必要数据
                    </Col>
                    {/* <Col xxs="6" s="2" l="3">
                        方式
                    </Col> */}
                </Row>
                {taskItems.map((item, index) => {
                    if(editable){
                     return (
                         <ProcessFormItem
                             key={index}
                             index={index}
                             item={item}
                             taskItems={taskItems}
                             selectData={this.getSelectList(item.taskOrder)}
                             setModule={setModule}
                             changeView={changeView}
                             validateForm={validateForm} />
                         );
                    }else{
                        return(
                            <ProcessDetailItem
                             key={index}
                             index={index}
                             item={item}
                             selectData={this.getSelectList(item.taskOrder)}
                             setModule={setModule}
                             changeView={changeView} />
                         );
                    }
                 })}
            </div>
            );
    }
}
