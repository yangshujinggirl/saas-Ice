import React, { Component } from 'react';
import { Button } from '@icedesign/base';

export default class SetFontBaseDialog extends Component {
    constructor(props) {
        super(props);

        // 字段的属性设置列表
        this.PROP_LIST = [
            {
                value: "required",
                label: "必须填"
            },
            {
                value: "unique",
                label: "值唯一"
            },
            {
                value: "readonly",
                label: "只读"
            },
            {
                value: "nowrap",
                label: "独占一行"
            }
        ];

        // 日期的格式化
        this.DATE_FORMATS = [
            {
                value: "yyyy-MM-dd",
                label: "年-月-日"
            },
            // {
            //     value: "MM",
            //     label: "月"
            // },
            // {
            //     value: "dd",
            //     label: "日"
            // },
            {
                value: "HH:mm:ss",
                label: "时:分:秒"
            },
            // {
            //     value: "mm",
            //     label: "分"
            // },
            // {
            //     value: "ss",
            //     label: "秒"
            // }
        ];

        // 弹框的底部按钮
        this.footerDom = (
            <div key='1'>
                <Button type="secondary" style={{
                                                  marginRight: '10px'
                                              }} onClick={this.handleSubmitCode}>
                    提交
                </Button>
                <Button type="normal" onClick={this.handleClose.bind(this)}>
                    取消
                </Button>
            </div>
        );
    }

    // handleSubmitCode(){}

    /**
     * 关闭弹框
     * @return {[type]} [description]
     */
    handleClose() {
        this.props.onClose();
    }

    /**
     * 更改字段的某个值
     * @param  {[type]} key   [description]
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    changeFormData = (key, value) => {
        this.props.changeFormData({
            [key]: value
        })
    }

    /**
     * 字段必输值唯一选择执行的函数
     * @param  {[type]} value [description]
     * @return {[type]}       [description]
     */
    codeRequire = (value) => {
        let data = {};
        data.isRequired = 0;
        data.isUnique = 0;
        data.isReadonly = 0;
        data.line = 0;

        if (value.join().indexOf('required') != -1) {
            data.isRequired = 1
        }
        if (value.join().indexOf('unique') != -1) {
            data.isUnique = 1
        }
        if (value.join().indexOf('readonly') != -1) {
            data.isReadonly = 1
        }
        if (value.join().indexOf('nowrap') != -1) {
            data.line = 1
        }
        // if (data.type == 'TEXT') {
        //     data.line = 1
        // }

        this.props.changeFormData(data)
    }

    /**
     * 获取设置必填、唯一、只读、独占一行的复选框值
     * @return {[type]} [description]
     */
    getValueForCheckbox() {
        let {data} = this.props;

        let res = [];
        if (data.isRequired) {
            res.push('required');
        }
        if (data.isUnique) {
            res.push('unique');
        }
        if (data.isReadonly) {
            res.push('readonly');
        }
        if (data.line == '1') {
            res.push('nowrap');
        }

        return res;
    }

    /**
     * 获取设置必填、唯一、只读、独占一行的复选框的禁用状态
     * @return {[type]} [description]
     */
    getDisabledForCheckbox() {
        let {data} = this.props;

        let res = [];
        if (data.isRequired) {
            res.push('readonly');
        }
        if (data.isReadonly) {
            res.push('required');
        }

        return res;
    }

    render() {}
}
