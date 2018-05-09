import { CurdReq } from 'base';

class ContractEditReq extends CurdReq{
	constructor(){
		super();
		this._host = 'contractApi';
		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/filter-table-list.json',
            retrieve: this._host + '/contract/contract/list',
            delete: this._host + '/detail.json',
            detail: this._host + '/detail.json'
        }
	}
	//详情
	getDetailApi(id){
		let options = {
			url: this._host + `/contract/${id}/edit_status`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//编辑
	goEditContractApi(id){
		let options = {
			url: this._host + `/contract/${id}/edit_status`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//提交编辑
	submitEditContractApi(id,contract_content){
		let options = {
			url: this._host + `/contract/${id}`,
			method: 'PUT',
			contentType: 'application/json',
			params:{
				contract_content,
				contract_id:id
			}
		}
		return super.fetchData(options);
	}
	//取消，退回
	handleContractApi(params) {
		let options = {
			url: this._host + `/contract/contract/status`,
			method: 'GET',
			contentType: 'application/json',
			params
		}
		return super.fetchData(options);
	}
	//改纸质，电子
	toggleContractApi(id,to,contractId) {
		let options = {
			url: this._host + `/${id}/type`,
			method: 'GET',
			contentType: 'application/json',
			params:{
				to,//合同类型 electronic：改电子 paper：改纸质
				contractId
			}
		}
		return super.fetchData(options);
	}
}

export default new ContractEditReq();
