import React, { PureComponent } from 'react';
import { Pagination,
} from '@icedesign/base';

/**
 * 分页器组件
 * 1. 数据没有的时候不显示分页
 * 2. 依赖属性dataSource
 * {
 * 	list: [],
 * 	page: 0,
 * 	limit: 0,
 * 	total: 0
 * }
 */
export default class PchPagination extends PureComponent {
    render() {
        let {dataSource = {}, onChange} = this.props;

        if (!dataSource.list || dataSource.list.length == 0) {
            return null;
        }

        return (
            <div className="pch-pagination">
                <Pagination
                    shape="arrow-only"
                    current={dataSource.page}
                    pageSize={dataSource.limit}
                    total={dataSource.total}
                    onChange={onChange} />
            </div>
            );
    }
}
