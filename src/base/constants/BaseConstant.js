
/**
 * 常量定义，约定action到reducer的处理关系
 */
export default class BaseConstant {
	constructor(){
		this.key = '';
	}

	get FETCH_START(){
		return this.key + 'FETCH_START';
	}

	get FETCH_SUCCESS(){
		return this.key + 'FETCH_SUCCESS';
	}

	get FETCH_FAILED(){
		return this.key + 'FETCH_FAILED';
	}

	get CHANGE(){
		return this.key + 'CHANGE';
	}
}
