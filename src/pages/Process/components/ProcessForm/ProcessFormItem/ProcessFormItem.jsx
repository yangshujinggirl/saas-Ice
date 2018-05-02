import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Input, Grid, Select, Button, DatePicker, Form } from '@icedesign/base';

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder,
} from '@icedesign/form-binder';

const {Row, Col} = Grid;
const {Option} = Select;
const FormItem = Form.Item;

export default class ProcessFormItem extends Component {
    constructor() {
        super();
    }

    //select生成
    renderSelect = (data) => {
        return (
            data && data.map((item, index) => {
                return (
                    <Select.Option key={index} value={`${item.value}`}>
                        {item.name}
                    </Select.Option>
                    );
            })
        );
    };

    render() {
        const {index, item, selectData, setModule} = this.props;
        return (
            <Row align="top" key={index} className={`container-right-tabRow ${index%2===0 ? '' : 'even'}`}>
                <Col xxs="6" s="2" l="2" className="pch-icon-setting">
                    {index != 0 && <i onClick={() => setModule(item, 'minus', index)} className="icon"></i>}
                </Col>
                <Col xxs="6" s="3" l="3" className="pch-moduleName">
                    <div className="pch-realname">
                        {item.taskTypeName}
                    </div>
                    <IceFormBinder name={`taskItems[${index}].taskAlias`} required max={10} message="模块名称">
                        <Input onChange={this.moduleChange} />
                    </IceFormBinder>
                </Col>
                <Col xxs="6" s="2" l="6">
                    {item.transitionItems && item.transitionItems.map((list, ind) => {
                         return (
                             <div className="pch-target-name" key={ind}>
                                 <Select disabled defaultValue={list.conditionName}>
                                     {this.renderSelect([{
                                          name: list.conditionName,
                                          value: list.conditionName,
                                      }])}
                                 </Select>
                                 <IceFormBinder name={`taskItems[${index}].targetName[${ind}]`}>
                                     <Select>
                                         {this.renderSelect(selectData)}
                                     </Select>
                                 </IceFormBinder>
                             </div>
                             );
                     })}
                </Col>
                <Col xxs="6" s="2" l="3">
                    {item.page ? <a className='pch-target'>预览</a> : '--'}
                    {item.page ? <a className='pch-target'>编辑</a> : '--'}
                </Col>
                <Col xxs="6" s="2" l="3">
                    <Select className="pch-page-name">
                    	{this.renderSelect(item.page)}
                    </Select>
                    {item.private && <a className="pch-target">添加</a>}
                </Col>
                <Col xxs="6" s="2" l="2">
                    {item.private && <a className="pch-target">编辑</a>}
                </Col>
                <Col xxs="6" s="3" l="2">
                    {item.source && <a className="pch-target">查看</a>}
                </Col>
                <Col xxs="6" s="2" l="3">
                    {item.type ? <IceFormBinder name={`rightFromList[${index}].type`}>
                                     <Select className="pch-type-name">
                                         {this.renderSelect(item.type)}
                                     </Select>
                                 </IceFormBinder> : '--'}
                </Col>
            </Row>
            );
    }
}
