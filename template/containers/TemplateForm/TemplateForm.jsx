import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';

import { Form, Icon, Input, Button, Checkbox, Select, Switch, Radio, Grid, Field, Dialog } from '@icedesign/base';

const {Row, Col} = Grid;

import { FormBinderWrapper as IceFormBinderWrapper, FormBinder as IceFormBinder, FormError as IceFormError,
} from '@icedesign/form-binder';
import { Title } from 'components';

export default class [MODULE]Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    /**
     * 初始化
     */
    componentDidMount() {
        let {actions, params} = this.props;

        if (params.id) {
            //actions.getDetail(params.id);
        }
    }

    //表单校验change
    formChange = value => {
        this.props.formData = value;
    }

    //保存
    handleSave = () => {

    }

    //提交
    handleSubmit = () => {
        this.refs.form.validateAll((errors, values) => {
            console.log('errors', errors, 'values', values);
            return false;
        });
    }

    // 取消
    handleCancel() {}

    /**
     * 渲染
     */
    render() {
        let {formData = {}} = this.props;

        return (
            <IceContainer className="pch-container">
                <Title title="表单编辑" />
                <div className="pch-form">
                    <IceFormBinderWrapper value={formData} onBlur={this.formChange} ref="form">
                        <Form size="large" labelAlign="left">
                            <div className="next-btn-box pch-form-buttons">
                                <Button type="normal" size="large" onClick={this.handleCancel}>
                                    返回
                                </Button>
                                <Button type="primary" size="large" onClick={this.handleSave}>
                                    保存
                                </Button>
                                <Button type="secondary" size="large" onClick={this.handleSubmit}>
                                    提交
                                </Button>
                            </div>
                        </Form>
                    </IceFormBinderWrapper>
                </div>
            </IceContainer>
            );
    }
}
