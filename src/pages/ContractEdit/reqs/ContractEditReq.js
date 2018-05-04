import { CurdReq } from 'base';

class ContractEditReq extends CurdReq{
	constructor(){
		super();

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
	//合同取消
	cancelContractApi(id,reason,memo) {
		let options = {
			url: this._host + `/contract/${id}/status`,
			method: 'PUT',
			contentType: 'application/json',
			data:{
				action:'cancel',
				contract_id:id,
				reason,
				memo
			}
		}
		return super.fetchData(options);
	}
	//改纸质/改电子
	toggleContractApi(id,to) {
		let options = {
			url: this._host + `/contract/${id}/type`,
			method: 'PUT',
			contentType: 'application/json',
			data:{
				to,//electronic,paper
				contract_id:id
			}
		}
		return super.fetchData(options);
	}
}

export default new ContractEditReq();
