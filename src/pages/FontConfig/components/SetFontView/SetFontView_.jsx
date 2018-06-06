/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { Balloon, Button, Input, Select, Field, DatePicker, Upload, Dialog, Checkbox, Radio, CascaderSelect } from '@icedesign/base';
import cx from 'classnames';
import FontConfigReq from './../../reqs/FontConfigReq.js'
import { Title } from 'components';
import SetFontMenus from '../SetFont/SetFontMenus';

const {Group: CheckboxGroup} = Checkbox;
const {Group: RadioGroup} = Radio;


export default class SetFontView_ extends Component {
    static displayName = 'SetFont';

    constructor(props) {
        super(props);

        // 请求参数缓存
        this.state = {
            resData: []
        };
    }

    // 返回
    handleCancel = () => {
        if (this.props.changeView) {
            this.props.changeView();
            return;
        }
        this.props.router.push(`font`)
    }

    componentDidMount() {

        // 固定左侧菜单
        window.onscroll = function() {
            let scrollFix = document.querySelector('.scrollFix');
            if (!scrollFix) {
                return
            }
            if (window.scrollY > 130) {
                scrollFix.style.cssText += 'position:fixed;top:50px;'
            } else {
                scrollFix.style.cssText += 'position:static;top:auto;'
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.resData) {
            this.setState({
                resData: nextProps.resData
            })
        }
    }

    render() {

        const dataSource = [
            {
                value: "2973",
                label: "陕西",
                children: [
                    {
                        value: "2974",
                        label: "西安",
                        children: [
                            {
                                value: "2975",
                                label: "西安市"
                            },
                            {
                                value: "2976",
                                label: "高陵县"
                            }
                        ]
                    },
                    {
                        value: "2980",
                        label: "铜川",
                        children: [
                            {
                                value: "2981",
                                label: "铜川市"
                            },
                            {
                                value: "2982",
                                label: "宜君县"
                            }
                        ]
                    }
                ]
            },
            {
                value: "3371",
                label: "新疆",
                children: [
                    {
                        value: "3430",
                        label: "巴音郭楞蒙古自治州",
                        children: [
                            {
                                value: "3431",
                                label: "库尔勒市"
                            },
                            {
                                value: "3432",
                                label: "和静县"
                            }
                        ]
                    }
                ]
            }
        ];
        const handleFixed = (item) => {
            let defaultValue;
            if (item.options) {
              // 有选项的设置默认值
                let defaultOptions = item.options.filter((opt) => {
                    return opt.isDefault
                });
                if (defaultOptions.length > 0) {
                    defaultValue = defaultOptions[0].value;
                }
            }

            let inputType = <Input size="large" placeholder="请输入" />
            switch (item.type) {
                case 'STRING':
                    inputType = <Input size="large" placeholder="请输入" />
                    break;
                case 'TEXT':
                    inputType = <Input size="large" placeholder="请输入" />
                    break;
                case 'INT':
                    inputType = <Input size="large" placeholder="请输入" />
                    break;
                case 'DECIMAL':
                    inputType = <Input size="large" placeholder="请输入" />
                    break;
                case 'DATE':
                    inputType = <DatePicker size="large" onChange={(val, str) => console.log(val, str)} onStartChange={(val, str) => console.log(val, str)} />
                    break;
                case 'SELECT':
                    inputType = <Select size="large" placeholder="请选择" dataSource={item.options} defaultValue={defaultValue} />
                    break;
                case 'CHECKBOX':
                    inputType = <span className="addNewCheckbox"><CheckboxGroup size="large" dataSource={item.options} defaultValue={[defaultValue]} /></span>
                    break;
                case 'RADIO':
                    inputType = <span className="addNewRadio"><RadioGroup size="large" dataSource={item.options} defaultValue={defaultValue} /></span>
                    break;
                case 'ADDRESS':
                    inputType = <CascaderSelect size="large" dataSource={dataSource} />
                    break;
                default:
                    break;
            }
            return inputType
        }

        const {resData = {}} = this.state;
        let {id, visible} = this.props;

        return (
            <IceContainer className="pch-container setFont" style={{
                                                           display: visible ? '' : 'none'
                                                       }}>
                <Title title="进件模块-预览" />
                <div className="pch-form">
                    <div className="container">
                        {/*渲染左边  */}
                        <div className="container-left">
                            <SetFontMenus resData={resData} />
                        </div>
                        {/* 渲染右边 */}
                        <div className="container-right">
                          <div>
                            <div className="dynamic-demo">
                              {resData.fieldset && resData.fieldset.map((item, index) => {
                                return (
                                  <div key={index}>
                                    {/*添加字段按钮和小标题  */}
                                    <div className='base-detail clearfix'>
                                      <div className='base-detail-name active' id={item.name}>
                                        <Input
                                          placeholder="区域名称"
                                          maxLength={35}
                                          value={item.name}
                                          className='moduleStr'
                                          readOnly />
                                      </div>
                                    </div>
                                    <div className='ui-sortable'>
                                      {item.fields.map((item, inj) => {
                                        return (
                                          <div key={inj} className={cx('dynamic-item', 'firstModle', "ui-sortable-item")} data-row={item.line == 1 ? true : ''}>
                                            <div className="clearfix">
                                              <label className='label'>
                                                <Balloon type="primary" trigger={<span className='ellips' title={item.label}><span className='required'>{item.isRequired ? <span>*</span> : ''}</span>
                                                  {item.label}
                                                                                                       </span>} closable={false} triggerType="hover">
                                                  {item.label}
                                                </Balloon>
                                              </label>
                                              {handleFixed(item)}
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                            <div className="submit pch-form-buttons">
                              <Button type="normal" size="large" onClick={this.handleCancel}>
                                返回
                              </Button>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </IceContainer>
            );
    }
}
