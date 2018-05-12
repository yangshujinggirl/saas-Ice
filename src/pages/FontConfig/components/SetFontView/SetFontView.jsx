/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import cx from 'classnames';
import FontConfigReq from './../../reqs/FontConfigReq.js'
import SetFontView_ from './SetFontView_';

export default class SetFontView extends Component {

    constructor(props) {
        super(props);

        // 请求参数缓存
        this.state = {};
    }


    componentDidMount() {
        let id = this.props.params.id

        FontConfigReq.getCode(id).then((data) => {
            let res = data.data
            this.setState({
                resData: res,
                pageValue: res && res.name
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
        })
    }

    render() {

        const {resData = {}} = this.state;
        let id = this.props.params.id

        return (
            <SetFontView_ id={id} resData={resData} visible={true} />
            );
    }
}
