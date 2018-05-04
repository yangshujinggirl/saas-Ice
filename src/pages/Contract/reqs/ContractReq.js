import { CurdReq } from 'base';

class ContractReq extends CurdReq{
	constructor(){
		super();
		this._host = 'contractApi';
		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/filter-table-list.json',
            retrieve: this._host + '/contract/contract/template',//模板列表
            delete: this._host + '/detail.json',
            detail: this._host + '/detail.json'
        }

	}
	//新增模板
	addTemplatesApi(params){
		let options = {
			url: this._host + '/contract/templates',
			method: 'POST',
			ccontentType: 'application/json',
			data:params
		}
		return super.fetchData(options);
	}
	//模板详情
	templateDetailApi(id) {
		let options = {
			url: this._host + `/contract/templates/${id}`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//绑定产品
	goBindProductApi(template_id,product_category,product_name,template_content) {
		let options = {
			url: this._host + `/contract`,
			method: 'GET',
			contentType: 'application/json',
			params:{
				template_id,
				product_category,
				product_name,
				template_content
			}
		}
		return super.fetchData(options);
	}
	//查询绑定产品
	seachBindTemplateApi(id) {
		let options = {
			url: this._host + `/contract/templates/${id}/products`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//模板启用，停用，删除
	handleTemplateApi(id) {
		let options = {
			url: this._host + `/contract/templates/${id}/status`,
			method: 'PUT',
			contentType: 'application/json',
			data:{status:id}
		}
		return super.fetchData(options);
	}
}

export default new ContractReq();
