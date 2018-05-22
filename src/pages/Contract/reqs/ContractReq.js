import { CurdReq } from 'base';

class ContractReq extends CurdReq{
	constructor(){
		super();
		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._config.CONTRACT_HOST + '/filter-table-list.json',
            update: this._config.CONTRACT_HOST + '/filter-table-list.json',
            retrieve: this._config.CONTRACT_HOST + '/contract/template/',//模板列表
            delete: this._config.CONTRACT_HOST + '/detail.json',
            detail: this._config.CONTRACT_HOST + '/detail.json'
        }

	}
	//新增模板
	addTemplatesApi(params){
		let options = {
			url: this._config.CONTRACT_HOST + '/contract/template/save',
			method: 'POST',
			ccontentType: 'application/json',
			data:params
		}
		return super.fetchData(options);
	}
	//编辑模板
	editTemplatesApi(params){
		let options = {
			url: this._config.CONTRACT_HOST + '/contract/template/edit',
			method: 'POST',
			ccontentType: 'application/json',
			data:params
		}
		return super.fetchData(options);
	}
	//模板详情
	templateDetailApi(id) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/template/${id}`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//复制模板
	copyTemplateApi(id) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/template/copy/${id}`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//查询是否绑定产品
	isBindProductApi(id) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/template/${id}/product`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//查询已绑定产品列表
	seachBindTemplateApi(id) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/template/bondProduct/${id}`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//查询产品列表
	seachProductListApi(condition) {
		let options = {
			url: this._config.LOAN_HOST + `/product`,
			method: 'GET',
			contentType: 'application/json',
			params:condition
		}
		this._host = 'contractApi';
		return super.fetchData(options);
	}
	//获取产品类型select
	getSelectSourceApi() {
		let options = {
			url: this._config.LOAN_HOST + `/product/data`,
			method: 'GET',
			contentType: 'application/json'
		}
		this._host = 'contractApi';
		return super.fetchData(options);
	}
	//获取产品列表字段
	getProductNameAPi(data, query) {
		let url = this._config.LOAN_HOST + '/screen-schemes/common-fields/';
		if(query){
			url += "?fieldName=" + query;
		}
		let options = {
			url,
			method: 'post',
			contentType: 'application/json',
			data: [...data]
		}
		return super.fetchData(options);
	}
	//绑定产品字段到合同模版
	saveProductNamesToContractTemplate(data){
		let options = {
			url: this._config.CONTRACT_HOST + '/contract/template/editBond',
			method: 'POST',
			contentType: 'application/json',
			data
		}
		return super.fetchData(options);
	}
	//模板启用，停用，删除
	handleTemplateApi(data) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/template/oper`,
			method: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			data:data
		}
		return super.fetchData(options);
	}
}

export default new ContractReq();
