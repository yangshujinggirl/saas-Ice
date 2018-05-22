import { CurdReq } from 'base';

class ContractEditReq extends CurdReq{
	constructor(){
		super();
		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._config.CONTRACT_HOST + '/filter-table-list.json',
            update: this._config.CONTRACT_HOST + '/filter-table-list.json',
            retrieve: this._config.CONTRACT_HOST + '/contract/',
            delete: this._config.CONTRACT_HOST + '/detail.json',
            detail: this._config.CONTRACT_HOST + '/detail.json'
        }
	}

	//编辑详情
	goEditContractApi(id){
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/${id}/detail`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//提交编辑
	submitEditContractApi(data){
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/`,
			method: 'PUT',
			contentType: 'application/json',
			data
		}
		return super.fetchData(options);
	}
	//取消，退回
	handleContractApi(data) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/status`,
			method: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			data
		}
		return super.fetchData(options);
	}
	//改纸质
	toggleContractApi(contractId) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/type`,
			method: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			data:{
				to:'paper',//合同类型 electronic：改电子 paper：改纸质
				contractId
			}
		}
		return super.fetchData(options);
	}
}

export default new ContractEditReq();
