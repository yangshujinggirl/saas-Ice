import CurdReq from '../../../base/reqs/CurdReq'

class ProductReq extends CurdReq {
  constructor() {
    super();

    //基本的curd接口
    //若有特殊定义的接口直接覆盖
    this.curd = {
      create: this._host + '/product',
      update: this._host + '/product/:id',
      retrieve: this._host + '/product/',
      delete: this._host + '/product/:id', //删除
      detail: this._host + '/product/:id', //详情
      filedeletedes: this._host + '/product/collect/detail/:id',
      fileupdate: this._host + '/product/collect/:id'
    }
  }

  /**
   * 自定义请求
   * @return {[type]} [description]
   */
  postDemo() {
    let options = {
      url: this._host + '/member/loginMobile',
      method: 'POST',
      contentType: 'application/x-www-form-urlencoded',
      params: 'mobile=13917538027&card=211224198612285536'
    }
    return super.fetchData(options);
  }
  //产品初始数据
  prodActions(condition) {
    let options = {
      url: this._host + '/product/data',
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      params: condition
    }
    return super.fetchData(options);
  }

  save(data) {
    var url = this.formatUrl(this.curd.create);
    if (data && data.id) {
      url = this.formatUrl(this.curd.update, data.id);
    }
    let options = {
      url: url,
      method: 'POST',
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  //产品提交第二步保存
  productsave(data,id) {
    var url =this._host + `/product/${id}/scope`;
    let options = {
      url: url,
      method: 'POST',
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }
 //产品提交第三步保存
 prodHtmlSave(data,productId) {
  var url =this._host + `/product/${productId}/screen`;
  let options = {
    url: url,
    method: 'POST',
    data: data,
    contentType: 'application/json'
  }
  return super.fetchData(options);
}
//页面名称
htmlName(data) {
  var url =this._host + `/screen-schemes`;
  let options = {
    url: url,
    method: 'get',
    params: data,
    contentType: 'application/json'
  }
  return super.fetchData(options);
}
  //产品修改
  prodedit(id) {
    let options = {
      url: this._host + `/product/${id}/history`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
    }
    return super.fetchData(options);
  }

  //产品修改后保存
  prodrevise(data) {
    var url = this.formatUrl(this._host + `/product/${data.id}`);
    let options = {
      url: url,
      method: 'put',
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }

  

  //材料清单查询
  filesearch(value) {
    let options = {
      url: this._host + '/product/collect',
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      params: value
    }
    return super.fetchData(options);
  }


  //资料清单明细
  fileDetail(id) {
    let options = {
      url: this._host + `/product/collect/${id}`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
    }
    return super.fetchData(options);
  }


//删除资料清单一条数据
fileremove(id, callback, callbackError) {
	let options = {
    // url: this.formatUrl(this.curd.filedelete, id),
    url:this._host + `/product/collect/${id}`,
		method: 'DELETE',
		contentType: this.contentType || 'application/json'
	}
	return super.fetchData(options);
}

//删除资料清单明细
fileRemoveDes(id, callback, callbackError) {
	let options = {
    // url: this.formatUrl(this.curd.filedeletedes, id),
    url:this._host + `/product/collect/detail/${id}`,
		method: 'DELETE',
		contentType: this.contentType || 'application/json'
	}
	return super.fetchData(options);
}


//材料编辑修改后确定
  fileEditSave(data, id) {
    var url = this._host + '/product/collect/' + id
    if (data) {

      let options = {
        url: url,
        method: 'put',
        data: data,
        contentType: 'application/json'
      }
      return super.fetchData(options);
    }
  }
//资料保存
  fileSave(data) {
    var url = this._host + '/product/collect'
    if (data) {
      let options = {
        url: url,
        method: 'post',
        data: data,
        contentType: 'application/json'
      }
      return super.fetchData(options);
    }
  }

  //addTwoList
  addTwoList(type,name,page) {
    let condition = {
      name:name,
      type:type,
      page:page,
    }
    let options = {
      // url: this._host + '/product/data
      url: this._host + `/cars`,
      method: 'get',
      contentType: 'application/x-www-form-urlencoded',
      params: condition
    }
    return super.fetchData(options);
  }
}


// put :data delete :data params




export default new ProductReq();
