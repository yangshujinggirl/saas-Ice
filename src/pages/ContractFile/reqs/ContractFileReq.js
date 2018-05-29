import { CurdReq } from 'base';

class ContractFileReq extends CurdReq{
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

	//合同详情
	contractDetailApi(id){
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/${id}/detail`,
			method: 'GET',
			contentType: 'application/json'
		}
		return super.fetchData(options);
	}
	//作废
	handleContractApi(data) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/status`,
			method: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			data
		}
		return super.fetchData(options);
	}
	//改电子
	toggleContractApi(contractId) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/type`,
			method: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			data:{
				to:'electronic',//合同类型 electronic：改电子 paper：改纸质
				contractId
			}
		}
		return super.fetchData(options);
	}
	//提交文件
	signContractApi(params) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/signed-paper-file`,
			method: 'PUT',
			contentType:'application/json',
			data:params//files,contract_id
		}
		return super.fetchData(options);
	}
	//保存文件
	saveFilesApi(params) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/signed-paper-file`,
			method: 'POST',
			contentType:'application/json',
			data:params//files,contract_id
		}
		return super.fetchData(options);
	}
	//已保存文件列表
	searchFilesApi(id) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/signed-file/${id}`,
			method: 'GET',
		}
		return super.fetchData(options);
	}
	//下载文件
	downloadFilesApi(id) {
		let options = {
			url: this._config.CONTRACT_HOST + `/contract/${id}/pdf`,
			method: 'GET',
		}
		return super.fetchData(options);
	}
}

export default new ContractFileReq();
