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

	//编辑详情
	goEditContractApi(id){
		let options = {
			url: this._host + `/contract/contract/edit_status`,
			method: 'GET',
			contentType: 'application/json',
			params:{id}
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
	handleContractApi(data) {
		let options = {
			url: this._host + `/contract/contract/status`,
			method: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			data
		}
		return super.fetchData(options);
	}
	//改纸质，电子
	toggleContractApi(to,contractId) {
		let options = {
			url: this._host + `/contract/contract/type`,
			method: 'POST',
			contentType: 'application/json',
			data:{
				to,//合同类型 electronic：改电子 paper：改纸质
				contractId
			}
		}
		return super.fetchData(options);
	}
}

export default new ContractEditReq();
