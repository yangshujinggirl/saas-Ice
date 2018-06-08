import React, {Component} from 'react';
import { Table } from '@icedesign/base';

/**
 * 列表组件
 */
export default class PchTable extends Component{
    constructor(props){
        super(props);

        this.state = {
            selectedRowKeys: [], // 这里配置默认勾选列
            loading: false,
        };
    }

    /**
     * 处理列表的头，
     */
    processColumn(columns) {
        // var hasOpt = false;
        // columns.forEach(function(d) {
        //     if (d.key == 'operation') {
        //         hasOpt = true;
        //     }
        // });

        // // 过滤只有选中的
        // columns = columns.filter(item => item.checked);

        return columns;
    }

    /**
     * 处理数据源，添加一些绑定事件
     */
    processData(data) {
        data && data.map((item, i) => {
            item.onOperateClick = (type) => { this.props.onOperateClick(item, type) };

            // if(item.children && item.children.length > 0){
            //     this.processData(item.children);
            // }
        })
        return data;
    }

    onSelectChange(selectedRowKeys) {
        this.setState({ selectedRowKeys });
    }

    render() {
        const dataSource = this.processData(this.props.dataSource);
        const columns = this.processColumn(this.props.columns);
        const isLoading = this.props.isLoading;
        const { loading, selectedRowKeys } = this.state;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const hasSelected = this.props.selection ? true : false;

        return (
            <div className="pch-table">
                <Table dataSource={dataSource} isLoading={isLoading}>
                	{columns && columns.map((item, i) => {
                    	return <Table.Column key={i} {...item} />
                	})}
                </Table>
            </div>
        );
    }
};
