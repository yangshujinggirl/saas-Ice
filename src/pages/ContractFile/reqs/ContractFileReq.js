import { CurdReq } from 'base';

class ContractFileReq extends CurdReq{
	constructor(){
		super();

		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/filter-table-list.json',
            retrieve: this._host + '/contract/file',
            delete: this._host + '/detail.json',
            detail: this._host + '/detail.json'
        }
	}

	//合同详情
	contractDetailApi(id){
		let options = {
			url: this._host + `/contract/${id}`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//合同作废
	cancelContractApi(contract_id,reason,memo){
		let options = {
			url: this._host + `/contract/file`,
			method: 'GET',
			contentType: 'application/json',
			params:{
				contract_id,
				reason,
				memo
			}
		}
		return super.fetchData(options);
	}
}

export default new ContractFileReq();
