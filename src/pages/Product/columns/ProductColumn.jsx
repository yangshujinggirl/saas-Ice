
import { BaseColumn } from 'base';

/**
 * 定义列表的表头
 */
class ProductColumn extends BaseColumn {

   constructor() {
      super();

      this._columns = [{
         title: '产品编号',
         dataIndex: 'productCode',
         width: 160
      }, {
         title: '产品名称',
         dataIndex: 'name',
         width: 200
       }, 
      //{
      //    title: '合同显示名称',
      //    dataIndex: 'contractDisplayName',
      //    width: 160
      // },
       {
         title: '状态',
         dataIndex: 'status',
         width: 100,
         cell: (value, index, record) => {
            let enable = record.enable
            return `${enable == '1' ? (record.status == '1' ? '生效' : '关闭') : '草稿'}`
            // 0=未生效；1=生效；2=失效
            // return `${record.status == '0' ? '关闭' : (record.status == '1' ? '生效' : '失效')}`
         }
      }, {
         title: '产品类型',
         dataIndex: 'productType',
         width: 160
      }, {
         title: '生效期限',
         width: 250,
         cell: (value, index, record) => {
            return `${record.effectiveDate}~${record.expirationDate}`
         }
      }, {
         title: '尾款产品',
         width: 120,
         cell: (value, index, record) => {
            return record.isRetainage ? '是' : '否'
         }
      }, {
         title: '资方',
         dataIndex: 'tenantName',
         width: 120
      }, {
         title: '金额范围(元)',
         width: 200,
         cell: (value, index, record) => {
            return `${record.principalAmountMin}~${record.principalAmountMax}`
         }
      }, {
         title: '期限范围(月)',
         width: 120,
         cell: (value, index, record) => {
            return `${record.loanTermRangeMin}~${record.loanTermRangeMax}`
         }
      }, {
         title: '贷款比率(%)',
         width: 120,
         cell: (value, index, record) => {
            return `${record.loanPercentageMin}~${record.loanPercentageMax}`
         }
      }, {
         title: '执行年利率范围(%)',
         dataIndex: 'productType',
         width: 160,
         cell: (value, index, record) => {
            return `${record.interestRatesRangeMin}~${record.interestRatesRangeMax}`
         }
      }, {
         title: '操作',
         lock: 'right',
         width: 180,
         cell: (value, index, record) => {
            let enable = record.enable
            return (
               <div className="pch-table-operation">
                  <a href="javascript:;" onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.VIEW)}>查看</a>
                  <a href="javascript:;"
                     onClick={record.onOperateClick.bind(this, this.OPERATE_TYPE.EDIT)}
                     style={{ display: enable == 0 ? 'none' : '' }}
                  >编辑</a>
               </div>
            );
         }
      }]
   }
}

export default new ProductColumn().getColumns();
