import CurdReq from '../../../base/reqs/CurdReq'

class ExamineApproveReq extends CurdReq{
	constructor(){
		super();
		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/filter-table-list.json',
            retrieve: this._host + '/filter-table-list.json',
            delete: this._host + '/detail.json',
            detail: this._host + '/detail.json'
        }
	}

	//获取进件详情
	getLoanDetailApi(id) {
		this._host = '/loan-ft1';
		let options = {
			url: this._host + `/loans/${id}/screen`,
			method: 'Get',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//审查审批流程
	getAuditListApi(condition) {
		this._host = '/processApi';
		let options = {
			url: this._host + `/tasks/3`,
			method: 'Get',
			params:condition,
			contentType: 'application/x-www-form-urlencoded'
		}
		return super.fetchData(options);
	}
}

export default new ExamineApproveReq();
