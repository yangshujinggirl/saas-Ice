import BaseReq from './BaseReq'

class CommonReq extends BaseReq{
	constructor(){
		super();

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

export default new CommonReq();