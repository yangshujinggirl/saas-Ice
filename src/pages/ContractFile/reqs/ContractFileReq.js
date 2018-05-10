import { CurdReq } from 'base';

class ContractFileReq extends CurdReq{
	constructor(){
		super();

		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this._host = 'contractApi';
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/filter-table-list.json',
            retrieve: this._host + '/contract/contract/list/',
            delete: this._host + '/detail.json',
            detail: this._host + '/detail.json'
        }
	}

	//合同详情
	contractDetailApi(id){
		let options = {
			url: this._host + `/contract/contract/${id}`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//作废
	handleContractApi(data) {
		let options = {
			url: this._host + `/contract/contract/status`,
			method: 'POST',
			contentType: 'application/json',
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

export default new ContractFileReq();
