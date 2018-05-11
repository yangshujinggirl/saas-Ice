/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import { Table, Pagination } from '@icedesign/base';
import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';
import IceLabel from '@icedesign/label';
import FilterForm from './Filter';
import {browserHistory, hashHistory} from 'react-router';
import { Title, PchTable, PchPagination } from 'components';

@DataBinder({
  tableData: {
    // 详细请求配置请参见 https://github.com/axios/axios
    url: 'http://172.16.0.242:7300/mock/5a52d55884e9091a31919308/example/loans/lists',
    params: {
      page: 1,
    },
    defaultBindingData: {
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
    },
  },
})
export default class EnhanceTable extends Component {
  static displayName = 'EnhanceTable';

  static defaultProps = {};

  constructor(props) {
    super(props);

    // 请求参数缓存
    this.queryCache = {};
    this.state = {
      filterFormValue: {},
      list: [],
      total: 100,
      pageSize: 10,
      currentPage: 1,
      statusList:[
        {key:'DRAFT',value:'待提交'},
        {key:'RETURN',value:'退回'},
        {key:'SUBMIT',value:'已提交'},
        {key:'CREDIT',value:'征信'},
        {key:'AUDIT',value:'审查审批'},
        {key:'MAKEUP',value:'补录'},
        {key:'REJECT',value:'审批拒绝'},
        {key:'INTERVIEW',value:'面签'},
        {key:'LENDING_APPLY',value:'出账申请'},
        {key:'LENDING_AUDIT',value:'出账审核'},
        {key:'LENDING',value:'已放款'}
      ]
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  // fetchData = () => {
  //   let {actions} = this.props;
  //   actions.search(this.queryCache);
  // };

  fetchData = (condition) => {
    console.log(condition)
    this.props.actions.search(condition);
  }
  renderTitle = (value, index, record) => {
    return (
      <div style={styles.titleWrapper}>
        <span style={styles.title}>{record.title}</span>
      </div>
    );
  };

  editItem = (record, e) => {
    e.preventDefault();
    // TODO: record 为该行所对应的数据，可自定义操作行为
    console.log(record);
    console.log(this.props)
    // this.props.code(record);
    hashHistory.push('/loanapplication/fixed/'+record.id);
  };
  detal = (record, e)=>{
    e.preventDefault();
    hashHistory.push('/entryQuery/detail/'+record.id);
  }
  //修改和详情按钮
  renderOperations = (value, index, record) => {
    return (
      <div
        className="filter-table-operation"
        style={styles.filterTableOperation}
      >
        {
          record.status  && (record.status == 'DRAFT' || record.status == 'RETURN')  ? (
            <a
            href="#"
            target="_blank"
            onClick={this.editItem.bind(this, record)}
            className='operate-btn operate-btn-two'
          >
            修改
          </a>) : (<span></span>)
        }

            <a
              href="#"
              target="_blank"
              className='operate-btn'
              onClick={this.detal.bind(this, record)}
            >
              详情
            </a>

      </div>
    );
  };

  renderStatus = (value) => {
    return (
      <IceLabel inverse={false} status="default">
        {value}
      </IceLabel>
    );
  };
  //点击分页
  changePage = (currentPage) => {
    this.props.actions.search({
      page: currentPage
    });
  }

  filterFormChange = (value) => {
    this.setState({
      filterFormValue: value,
    });
  };

  filterTables = () => {
    // 合并参数，请求数据
    this.queryCache = {
      ...this.queryCache,
      ...this.state.filterFormValue,
    };
    console.log(this.queryCache)
    this.fetchData(this.queryCache);

  };

  resetFilter = () => {
    this.setState({
      filterFormValue: {},
    });
  };
  renderStatus = (value, index, record) => {
    var  statusText = ''
    this.state.statusList.map((item,index)=>{
      if(item.key == record.status){
        statusText = item.value;
      }
    })
    return statusText;
  };

  render() {
    // const tableData = this.props.bindingData.tableData;
    const tableData = this.props.pageData || {};
    const {pageData ={}, columns} = this.props;
    const { filterFormValue } = this.state;

    return (
      <IceContainer className="pch-container">
        <legend className="pch-legend" >
          <span className="pch-legend-legline"></span>车贷查询
        </legend>
        <FilterForm onSubmit={this.fetchData} />
          <Table
            dataSource={tableData.list}
            isLoading={this.props.isFetching}
            className="basic-table"
            hasBorder={false}
          >
            <Table.Column
              title="贷款编号"
              width={150}
              align={'left'}
              dataIndex="code"
            />
            <Table.Column
              title="贷款状态"
              // dataIndex="status"
              width={150}
              align={'left'}
              cell={this.renderStatus}
            />
            <Table.Column title="主贷人姓名" dataIndex="borrowerName" width={150}  align={'left'}/>
            <Table.Column
              title="证件号码"
              dataIndex="borrowerIdNo"
              width={150}
              align={'left'}
            />

            <Table.Column
              title="手机号"
              dataIndex="borrowerMobile"
              width={150}
              align={'left'}
            />
            <Table.Column
              title="申请金额"
              dataIndex="principalAmount"
              width={150}
              align={'left'}
            />
            <Table.Column
              title="贷款产品"
              dataIndex="productName"
              width={150}
              align={'left'}
            />
            <Table.Column
              title="展厅名称"
              dataIndex=""
              width={150}
              align={'left'}
            />
            <Table.Column
              title="申请时间"
              dataIndex="createdAt"
              width={150}
              align={'left'}
            />
            <Table.Column
              lock="right"
              title="操作"
              dataIndex="operation"
              width={150}
              cell={this.renderOperations}
              align={'center'}
            />
          </Table>
          <div style={styles.paginationWrapper}>
            <PchPagination dataSource={pageData} onChange={this.changePage} />
          </div>
        </IceContainer>
    );
  }
}

const styles = {
  filterTableOperation: {
    lineHeight: '28px',
  },
  operationItem: {
    marginRight: '12px',
    textDecoration: 'none',
    color: '#5485F7',
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  title: {
    marginLeft: '10px',
    lineHeight: '20px',
  },
  paginationWrapper: {
    textAlign: 'right',
    paddingTop: '26px',
  },
};
