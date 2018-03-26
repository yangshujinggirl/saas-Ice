/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Button, Input, Select, Field, DatePicker, Upload, Dialog, Checkbox, Radio } from '@icedesign/base';
import Sortable, { SortableContainer } from 'react-anything-sortable';
import "./SetFont.scss"
import 'react-anything-sortable/sortable.css';
const { Group: CheckboxGroup } = Checkbox;
const { Group: RadioGroup } = Radio;


export default class setFont extends Component {
    static displayName = 'SetFont';

    constructor(props) {
        super(props);

        // 请求参数缓存
        this.state = {
            arraList: [5, 6, 7, 8, 9],
            visible: true,
            value: ["orange"]
        };
    }
    field = new Field(this, {
        parseName: true,
        scrollToFirstError: true
    })
    
    handleSort = (sortedArray) => {
        this.setState({
            arraList: sortedArray
        });
    }

    handleAddElement = () => {
        this.setState({
            arraList: this.state.arraList.concat(Math.round(Math.random() * 1000))
        });
    }

    handleRemoveElement = (index) => {
        const newArr = this.state.arraList.slice();
        newArr.splice(index, 1);

        this.setState({
            arraList: newArr
        });
    }


    render() {
        const { init, setValue, getValue } = this.field;
        const list = [
            {
                value: "apple",
                label: "必须填"
            },
            {
                value: "pear",
                label: "值唯一"
            },
            {
                value: "orange",
                label: "只读"
            },
            {
                value: "orange",
                label: "独占一行"
            }
        ];
        const footer = (
            <div>
                <Button type="primary" style={{ marginLeft: '10px' }} onClick={this.onSuccess}>
                    提交
                </Button>
                <Button type="secondary" style={{ marginLeft: '10px' }} onClick={this.onClose}>
                    取消
                </Button>
            </div>
        );

        function renderItem(num, index) {
            return (
                <SortableContainer key={num} className="dynamic-item firstModle" sortData={num}>
                    <div>
                        <label htmlFor="">
                            <span>资方名称{num}</span>
                        </label>
                        <Input placeholder="" {...init("input")} />
                        <span className='edite icon'>&#xe62a;</span>
                    </div>
                    <span className="delete"
                        onClick={this.handleRemoveElement.bind(this, index)}>
                        &times;
                    </span>
                </SortableContainer>
            );
        }
        return (
            <div className="setFont">
                <IceContainer className='subtitle'>
                    <div className="pageName">
                        <label>页面名称</label>
                        <input type="text" name='' />
                    </div>
                </IceContainer>
                <div className="container">
                    <div className="container-left">
                        <ul>
                            <li className="active">
                                客户申请信息
                            </li>
                            <li>材料提交</li>
                        </ul>
                    </div>
                    <div className="container-right">
                        <div className="dynamic-demo">
                            <div className='baseDetail customer'>
                                <span className=''>
                                    <Input placeholder="" value='基本信息' readOnly className='moduleStr' />
                                </span>
                            </div>
                            <Sortable onSort={this.handleSort} sortHandle="handle">
                                {this.state.arraList.map(renderItem, this)}
                            </Sortable>
                        </div>
                        <div className='submit'>
                            <Button
                                type="secondary"
                                style={{ marginLeft: '10px' }}>
                                返回
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
