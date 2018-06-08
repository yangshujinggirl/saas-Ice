import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import { hashHistory } from 'react-router';
import { BaseApp } from 'base';

import { Title, PchTable, PchPagination } from 'components';
import FilterItem from './Filter'
import { Button, Grid, Table, Pagination} from "@icedesign/base";

const {Row, Col} = Grid;

import './ProcessFormProduct.scss';

let arrayRightData = [];
const testarray = []; //右侧即将要渲染的数据
export default class ProcessFormProduct extends BaseApp {
    constructor(props) {
        super(props);

        this.rowSelection = {
            onChange: (selectedRowKeys, records) => {
                arrayRightData=[...records];
                arrayRightData.push(...this.state.dataSourceRight)
                console.log(arrayRightData)

                // let selectedRowOne = [];
                // selectedRowOne.push(...records);
                // this.setState({
                //    selectedRowOne
                // });
                this.setState({
                    selectedRowKeys: selectedRowKeys,
                });
            },
            // 全选表格时触发的回调
            onSelectAll: (selected, records) => {
            },
        }
        let {formLeftData={}} = this.props
        let {list} = formLeftData
        this.state = {
            visible: this.props.visible,
            dataSourceRight: list,
            selectedRowKeys: [],
            selectedRowOne: [],
            productType: [],

        }
    }


    componentWillMount() {}
    componentDidMount() {
        this.fetchData();
        // this.fetchOldData();
        let {params} = this.props
        if (params.id) {
            this.props.actions.getProcessProdOldList(params.id)

        }
    }

    fetchData = (condition) => {
        this._condition = Object.assign(this._condition, condition);
        this.props.actions.getProcessProdList(this._condition);

    }
    //点击分页
    changePage = (currentPage) => {
        this._condition.page = currentPage;
        this.props.actions.getProcessProdList(this._condition);
    }
    componentWillReceiveProps(props) {
        console.log('componentWillReceiveProps', props)
        let {formLeftData={}} = props
        let {list} = formLeftData
        this.setState({
            visible: props.visible,
            dataSourceRight: list,

        })
    }
    //右侧增加数据
    addItem() {
        let {params} = this.props;
        let { dataSourceRight } = this.state;
        let tempArr = [];//新增到右侧表格中的数据

        for(var i=0;i<arrayRightData.length-1;i++){
            for (var j=i+1;j<arrayRightData.length;j++){
                if(arrayRightData[i].productCode==arrayRightData[j].productCode){
                    arrayRightData.splice(j,1)
                }
            }
        }
                
        //去重后渲染
        arrayRightData.map((item, i) => {
            tempArr.push({
                productCode: item.productCode,
                productId: item.productId || item.id,
                productName: item.name|| item.productName,
                productType: this.productTypeKey(item.productType),
                processDefId: params.id,
                status: item.status,
                businessTypeId: 1,
                businessTypeName: "贷款业务",
                tenantId: item.tenantId,
            })
        })
        this.setState({
            dataSourceRight:tempArr
        })
    }
    //产品类型的Key值
    productTypeKey(type) {
        switch (type) {
            case '新车贷款':
            case 'NEW_CAR_LOAN':
                return 'NEW_CAR_LOAN';
                break;
            case '新车租赁':
            case 'NEW_CAR_RENTAL':
                return 'NEW_CAR_RENTAL';
                break;
            case '二手车贷款':
            case 'SECONDHAND_CAR_LOAN':
                return 'SECONDHAND_CAR_LOAN';
                break;
            case '二手车租赁':
            case 'SECONDHAND_CAR_RENTAL':
                return 'SECONDHAND_CAR_RENTAL';
                break;
            case '汽车抵押贷款':
            case 'CAR_MORTGAGE_LOAN':
                return 'CAR_MORTGAGE_LOAN';
                break;
            case '消费贷款':
            case 'CONSUMER_LOAN':
                return 'CONSUMER_LOAN';
                break;
        }
    }
    //删除
    deleteEvent(index) {
        const {dataSourceRight} = this.state;
        dataSourceRight.splice(index, 1)
        this.setState({
            dataSourceRight
        })
    }
    renderOperation(value, index, record) {
        return (
            <Button type='normal' shape="text" onClick={() => this.deleteEvent(index)}>
                删除
            </Button>
            );
    }
    //产品类型
    renderType(value, index, record) {
        return record.productType
    }
    //左侧 名称
    renderName(value, index, record) {
        return record.name
    }
    handleCancel = () => {
        hashHistory.push('/process')
    }
    //保存
    handleSave = () => {
        let data = this.state.dataSourceRight;
        let {params} =this.props;
        console.log(data)
        this.props.actions.saveProcessConfigProduct(data,params.id)
    }
    /**
     * 渲染
     */
    render() {
        let {dataSourceRight=[], visible, productType} = this.state;

        let {formData, params} = this.props;
        // let {list=[]} = formData
        return (
            <IceContainer className="pch-container">
                <FilterItem onSubmit={this.fetchData} typedata={productType} params={params} />
                <div className="pch-form edit-permission-dialog-contents">
                    <div className="table-list">
                        <div className="part-l">
                            <p>
                                查询结果
                            </p>
                            <Table dataSource={formData.list} style={{
                                                                         width: '100%'
                                                                     }} isTree rowSelection={{
                                                                                                                                                                                                                                                               ...this.rowSelection,
                                                                                                                                                                                                                                                               selectedRowKeys: this.state.selectedRowKeys
                                                                                                                                                                                                                                                           }}>
                                <Table.Column title="产品类型" cell={this.renderType} />
                                <Table.Column title="名称" cell={this.renderName} />
                            </Table>
                            <PchPagination dataSource={formData} onChange={this.changePage} />
                        </div>
                        <div className="btn-wrap">
                            <Button className="add-btn" onClick={() => this.addItem()}>
                                >>
                            </Button>
                        </div>
                        <div className="part-r">
                            <p>
                                已选产品
                            </p>
                            <Table dataSource={dataSourceRight} fixedHeader style={{
                                                                                       width: '100%'
                                                                                   }} maxBodyHeight={370}>
                                <Table.Column title="编码" dataIndex="productCode" />
                                <Table.Column title="名称" dataIndex="productName" />
                                <Table.Column title="操作" cell={this.renderOperation.bind(this)} />
                            </Table>
                        </div>
                    </div>
                    <div className="next-btn-box pch-form-buttons">
                        <Button type="normal" size="large" onClick={this.handleCancel}>
                            返回
                        </Button>
                        <Button type="secondary" className="return-btn buttonsBack" onClick={this.handleSave}>
                            保存
                        </Button>
                    </div>
                </div>
            </IceContainer>
        )
    }
}
