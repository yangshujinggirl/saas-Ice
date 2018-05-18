import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import {
    FormBinderWrapper as IceFormBinderWrapper, 
    FormBinder as IceFormBinder,
    FormError as IceFormError
} from '@icedesign/form-binder';
import { PROCESS_VIEW } from '../../constants/ProcessViewConstant';
import { PchMaterialSelect } from 'components';

const { Row, Col } = Grid;
const { Option } = Select;
const FormItem = Form.Item;

export default class ProcessFormItem extends Component {
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

    //select生成
    renderSelect = (data) => {
        return (
            data && data.map((item, index) => {
                return (
                    <Select.Option key={index} value={`${item.value}`}>
                        {item.name || '--'}
                    </Select.Option>
                );
            })
        );
    }

    /**
     * 校验模块别名，名称必填且不能重复
     * @param  {[type]}   rule     [description]
     * @param  {[type]}   value    [description]
     * @param  {Function} callback [description]
     * @return {[type]}            [description]
     */
    validatorTaskAlias = (rule, value, callback) => {
        if (rule.required && !value) {
            callback('模块名称不能为空');
            return;
        }

        let { taskItems = [], item } = this.props;
        taskItems.map((task) => {
            if(task.taskAlias == value && task.taskOrder != item.taskOrder){
                callback('模块别名不能重复');
            }
        })
        callback();
    }

    /**
     * 更改材料清单下拉框
     * @param  {[type]} value [description]
     * @param  {[type]} data  [description]
     * @return {[type]}       [description]
     */
    handleCollectionChange(value, data){
        this.props.item.productCollectionId = value;
    }

    render() {
        const { index, item, selectData, setModule, changeView } = this.props;

        return (
            <Row align="top" key={index} className="container-right-tabRow">
                <Col xxs="6" s="2" l="2" className="pch-icon-setting">
                    {index != 0 && <i onClick={() => setModule(item, 'minus', index)} className="icon"></i>}
                </Col>
                <Col xxs="6" s="3" l="3" className="pch-moduleName">
                    <div className="pch-realname">
                        {item.taskTypeName}
                    </div>
                    <IceFormBinder name={`taskItems[${index}].taskAlias`} required max={10} validator={this.validatorTaskAlias} >
                        <Input size="large" />
                    </IceFormBinder>
                    <div><IceFormError name={`taskItems[${index}].taskAlias`} /></div>
                </Col>
                <Col xxs="6" s="2" l="8">
                    {item.transitionItems && item.transitionItems.map((list, ind) => {
                        return (
                            <div className="pch-target-name" key={ind}>
                                <Input className="input-bottom" disabled defaultValue={list.conditionName} size="large" />
                                <i className="icon icon-arrow">&#xe603;</i>
                                <IceFormBinder name={`taskItems[${index}].transitionItems[${ind}].transToTaskOrder`}>
                                    <Select size="large" className="select-middle">
                                        {this.renderSelect(selectData)}
                                    </Select>
                                </IceFormBinder>
                            </div>
                        );
                    })}
                </Col>
                <Col xxs="6" s="2" l="3" className="pch-task-page">
                    {item.haveConfigPage ? <a className={'pch-target' + (item.pageId ? '' : ' disabled')} onClick={changeView.bind(this, PROCESS_VIEW.PREVIEWPAGE, item)}>预览</a> : '--'}
                    {item.haveConfigPage ? <a className='pch-target' onClick={changeView.bind(this, PROCESS_VIEW.EDITPAGE, item)}>编辑</a> : ''}
                </Col>
                <Col xxs="6" s="2" l="4">
                    {item.haveCollection == '1' ? <div className="pch-target-name"><IceFormBinder name={`taskItems[${index}].productCollectionId`}><PchMaterialSelect onChange={this.handleCollectionChange.bind(this)} /></IceFormBinder></div> : '--'}
                    {item.haveCollection == '1' ? <a className="pch-target" href="/#/product/filelist" target="_blank">添加</a> : ''}
                </Col>
                <Col xxs="6" s="2" l="2">
                    {item.canPrivilegeEditable == '1' ? <a className="pch-target" onClick={changeView.bind(this, PROCESS_VIEW.EDITAUTH, item)}>编辑</a> : '--'}
                </Col>
                <Col xxs="6" s="3" l="2">
                    {item.haveRequiredField == '1' ? <a className="pch-target" onClick={changeView.bind(this, PROCESS_VIEW.VIEWFIELD, item)}>查看</a> : '--'}
                </Col>
                {/* <Col xxs="6" s="2" l="3">
                    <div className="pch-target-name">
                        <IceFormBinder name={`taskItems[${index}].execMode`}>
                            <Select className="pch-type-name" size="large">
                                {this.renderSelect(this.state.execModeData)}
                            </Select>
                        </IceFormBinder>
                    </div>
                </Col> */}
            </Row>
        );
    }
}
