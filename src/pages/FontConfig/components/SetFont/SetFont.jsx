/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import "./SetFont.scss"
import cx from 'classnames';
import FontConfigReq from './../../reqs/FontConfigReq.js'
import SetFont_ from './SetFont_';

export default class SetFont1 extends Component {

    constructor(props) {
        super(props);

        // 请求参数缓存
        this.state = {};
    }


    componentDidMount() {
        let id = this.props.params.id
        let pageName = this.props.router.location.query.pageName

        FontConfigReq.getCode(id).then((data) => {
            if (data.code == 200) {
                let res = data.data
                this.setState({
                    resData: res,
                    pageValue: pageName || res && res.name
                })
                for (const key in this.state.resData.fieldset) {
                    if (this.state.resData.fieldset[key].name == '基本信息') {
                        let allDate = this.state.resData
                        let first = allDate.fieldset.splice(key, 1)
                        allDate.fieldset.unshift(...first)
                        this.setState({
                            resData: allDate
                        })
                    }
                }
            }
        })
    }

    render() {

        const {resData = {}} = this.state;
        let id = this.props.params.id

        return (
            <SetFont_ id={id} resData={resData} visible={true} />
            );
    }
}
