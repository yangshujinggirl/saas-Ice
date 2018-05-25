import { CurdReq } from 'base';

class ContractReq extends CurdReq{
	constructor(){
		super();
		//基本的curd接口
		//若有特殊定义的接口直接覆盖
		this.curd = {
      create: this._config.CONTRACT_HOST + '/filter-table-list.json',
      update: this._config.CONTRACT_HOST + '/filter-table-list.json',
      retrieve: this._config.CONTRACT_HOST + '/contract/template/',//模板列表
      delete: this._config.CONTRACT_HOST + '/detail.json',
      detail: this._config.CONTRACT_HOST + '/detail.json'
    }
	}
	static URL = {
		addTemplatesApi: {
			// 新增合同模版
			url: '/contract/template/save'
			,method: 'post'
			,contentType: 'application/json'
			,data: {
				templateName: '' //合同模版名称
				,templateContent: '' //合同模版内容
			}
		}
		,editTemplatesApi: {
			// 修改合同模版
			url: '/contract/template/edit'
			,method: 'post'
			,contentType: 'application/json'
			,data: {
				id: ''
				,templateName: ''
				,templateContent: ''
			}
		}
		,_templateDetailApi: {
			// 查看合同模版详情
			url: '/contract/template/{id}'
			,method: 'get'
			,contentType: 'application/json'
		}
		,_copyTemplateApi: {
			// 复制模板
			url: '/contract/template/copy/{id}'
			,method: 'GET'
			,contentType: 'application/json'
		}
		,_isBindProductApi: {
			// 查询是否绑定产品
			url: '/contract/template/{id}/product'
			,method: 'GET'
			,contentType: 'application/json'
		}
		,_seachBindTemplateApi: {
			// 查询已绑定产品列表
			url: '/contract/template/bondProduct/{id}'
			,method: 'GET'
			,contentType: 'application/json'
		}
		
		,seachProductListApi: {
			// 查询产品列表
			host: 'LOAN_HOST'
			,url: '/product'
			,method: 'GET'
			,contentType: 'application/json'
			,params: {

			}
		}
		
		,getSelectSourceApi: {
			host: 'LOAN_HOST'
			// 获取产品类型select
			,url: '/product/data'
			,method: 'GET'
			,contentType: 'application/json'
		}
		
		,getProductNameAPi: {
			//获取产品列表字段
			/*if(query){
				url += "?fieldName=" + query;
			}*/
			  host: 'LOAN_HOST'
				,url: '/screen-schemes/common-fields/'
				//仅供
				,_url: '/screen-schemes/common-fields/?fieldName={query}'
				,method: 'post'
				,contentType: 'application/json'
				,data: []
		}
		
		,saveProductNamesToContractTemplate: {
			// 绑定产品字段到合同模版
				url: '/contract/template/editBond',
				method: 'POST',
				contentType: 'application/json',
				data: {
					templateId: ''
					,templateProducts: []
					,templateExtends: []
				}
		}
		
		,handleTemplateApi: {
			// 模板启用，停用，删除
				url: '/contract/template/oper',
				method: 'POST',
				contentType: 'application/x-www-form-urlencoded',
				data: {

				}
		}
	}

	fetchData(options, host){
		if(host && options.url[0] == '/'){
			options.url = host + url;
		}
		console.log('原始入参：', this.constructor.URL[options.name]||this.constructor.URL['_'+options.name]);
		console.log('实际入参：', options);
		delete options.name;
		return super.fetchData(options)
	}
}

Object.keys(ContractReq.URL).forEach(methodName=>{
	let _options = ContractReq.URL[methodName];
	let genParam = (s, t)=>{
		let n;
		if(s instanceof Array){
			n = Object.assign([],s, t)
		}else{
			n = {...s, ...t}
		}
		return n;
	}
	let clone = (a, s, t)=>{
		let b;
		if(a instanceof Array){
			// 防止循环引用
			if(a === s)return t;
			b = [];
			for(let i = 0, len = a.length; i < len; i++){
				b.push(clone(a[i]), a, b)
			}
		}else if('object' == typeof a){
			// 防止循环引用
			if(a === s)return t;
			b = {}
			for(let k in a){
				if(a.hasOwnProperty(k))b[k] = clone(a[k], a, b)
			}
		}else{
			b = a;
		}
		return b;
	}
	let method = function(args, query){
		if(methodName[0] == '_' && /string|number/.test(typeof args)){
			// 为了向后兼容之前只传了一个id参数的api
			args = {
				id: args
			}
		}
		let _data = _options.data;
		let _params = _options.params;
		let options;
		try{
			options = JOSN.parse(JOSN.stringify(_options));
		}catch(e){
			options = clone(_options)
		}
		options.url = options.url.replace(/{([^}]+)}/,(s, a)=>args[a]);
		if('string' == typeof query && options._url){
			options.url = options._url.replace(/{[^}]+}/,(s, a)=>query);
			delete options._url;
		}
		if(_data){
			options.data = genParam(_data, args);
		}
		if(_params){
			options.params = genParam(_params, args)
		}
		if(options.host){
			options.url = this._config[options.host] + options.url;
			delete options.host;
		}else{
			options.url = this._config.CONTRACT_HOST + options.url;
		}
		options.name = methodName;
		return this.fetchData(options);
	}
	let name = methodName[0] == '_' && methodName.slice(1) || methodName;
	Object.assign(ContractReq.prototype, {[name]: method})
})

export default new ContractReq();
