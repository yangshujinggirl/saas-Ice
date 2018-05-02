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

	//获取审查进件详情
	getApproveDetailApi() {
		this._host = 'loan-ft1';
		let options = {
			url: this._host + `/loans/303/screen`,
			method: 'Get',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	// getApproveDetailApi(proInstId,loanId) {
	// 	this._host = '/processApi';
	// 	let options = {
	// 		url: this._host + `/loans/${proInstId}/tasks/${loanId}`,
	// 		method: 'Get'
	// 	}
	// 	return super.fetchData(options);
	// }
	//审查审批流程List
	getAuditListApi(condition) {
		this._host = '/processApi';
		let options = {
			url: this._host + `/tasks`,
			method: 'Get',
			params:Object.assign({taskTypeKey:3},condition)
		}
		return super.fetchData(options);
	}
	//签收
	assigneeApi(taskIds) {
		this._host = '/processApi';
		let options = {
			url: this._host + `/assignee/${taskIds}`,
			method: 'PUT'
		}
		return super.fetchData(options);
	}
	//查看必要
	checkEssentialApi(taskTypeId) {
		this._host = '/processApi';
		let options = {
			url: this._host + `/tasks/fields/${taskTypeId}`,
			method: 'Get'
		}
		return super.fetchData(options);
	}

}

export default new ExamineApproveReq();
