import CurdReq from '../../../base/reqs/CurdReq'

class AccountReq extends CurdReq{
	constructor(){
		super();

		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
            create: this._host + '/filter-table-list.json',
            update: this._host + '/filter-table-list.json',
            retrieve: this._host + '/filter-table-list.json',
            delete: this._host + '/detail.json',
            detail: this._host + '/detail.json'
        }
	}

	/**
	 * 自定义请求
	 * @return {[type]} [description]
	 */
	postDemo(){
		let options = {
			url: this._host + '/member/loginMobile',
			method: 'POST',
			contentType: 'application/x-www-form-urlencoded',
			params: 'mobile=13917538027&card=211224198612285536'
		}
		return super.fetchData(options);
	}

	/**
	 * 登录
	 * @return {[type]} [description]
	 */
	login(data){
		let options = {
			url: '/crm/login',
			method: 'POST',
			contentType: 'application/json',
			data: data
		}
		return super.fetchData(options);
	}

	/**
	 * 退出
	 * @return {[type]} [description]
	 */
	logout(){
		let options = {
			url: '/crm/logout',
			method: 'GET',
			contentType: 'application/json',
		}
		return super.fetchData(options);
	}

	/**
	 * 获取用户信息
	 * @return {[type]} [description]
	 * {"id":66582,"userName":"18811110001","realName":"","ownerId":66579}
	 */
	getUserInfo(){
		
		let options = {
			url: '/crm/ext/user/getUserInfo',
			method: 'GET'
		}
		return super.fetchData(options);
	}

	/**
	 * 获取菜单信息
	 * @return {[type]} [description]
	 * type = 类型，CRM=CRM系统，SAAS=SAAS系统
	 */
	getSaasMenu(){
		
		let options = {
			url: '/crm/resource/SAAS',
			method: 'GET'
		}
		return super.fetchData(options);
	}
}

export default new AccountReq();