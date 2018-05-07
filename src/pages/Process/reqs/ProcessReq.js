import { CurdReq } from 'base';

class ProcessReq extends CurdReq{
	constructor(){
		super();

		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/filter-table-list.json',
            // retrieve: this._host + '/processes',
            retrieve: 'http://172.16.0.242:7300/mock/5a52d52384e9091a319192fb/api/processes',
            delete: this._host + '/detail.json',
            detail: 'http://172.16.0.242:7300/mock/5a52d52384e9091a319192fb/api/processes/detail'
        }
	}

	/**
	 * 获取流程新增/修改左侧
	 * @return {[type]} [description]
	 */
	getCustomMenuList(){
		let options = {
			// url: 'http://172.16.0.242:7300/mock/5a52d59e84e9091a31919312/example/process/search',
			url: 'http://172.16.0.242:7300/mock/5a52d52384e9091a319192fb/api/task/types',
			// url: this._host + '/task_types',
			method: 'GET',
			contentType: 'application/x-www-form-urlencoded',
			// params: 'mobile=13917538027&card=211224198612285536'
		}
		return super.fetchData(options);
	}

	/**
	 * 复制流程
	 * @param  {[type]} id [description]
	 * @return {[type]}    [description]
	 */
	copyProcess(id){
		let options = {
			url: 'http://172.16.0.242:7300/mock/5a52d52384e9091a319192fb/api/task/types',
			// url: this._host + '/task_types',
			method: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			data: {
				id: id
			}
		}
		return super.fetchData(options);
	}

	//
	getProcessPowerDetails(id){
		let options = {
			url: 'https://www.easy-mock.com/mock/5a1629ea8eb5f73bfafa4f4f/lxapi/processPowerdetails',
			// url: this._host + '/task_types',
			method: 'get',
			contentType: 'application/x-www-form-urlencoded',
			params:id
		}
		return super.fetchData(options);
	}
}

export default new ProcessReq();
