import BaseReq from './BaseReq'

/**
 * 基础的增删改查接口
 */
class CurdReq extends BaseReq {

  constructor(name) {
    super();

    this.curd = { //基本的curd接口
      create: '/:name/create',
      update: '/:name/update/:id',
      retrieve: '/:name/list',
      delete: '/:name/delete',
      detail: '/:name/get/:id'
    };
    this.name = name;
    this.key = 'id'; //列表中的主键，用于生成table中的key和查找详情、删除的参数名
    this.timeout = 0;
  }

  /**
   * 格式化接口地址
   * @param url 路由
   * @param id  编号
   */
  formatUrl(url, id) {
    if (!url) {
      return url;
    }
    if (this.name) {
      url = url.replace(':name', this.name);
    }
    if (id) {
      url = url.replace(':id', id);
    }
    return url;
    return this._host + url;
  }

  /**
   * 查询列表
   */
  search(condition) {
    let options = {
      url: this.formatUrl(this.curd.retrieve),
      params: condition
    }
    return super.fetchData(options);
  }

  /**
   * 更新
   */
  save(data) {
    let url = this.formatUrl(this.curd.create),
      method = 'POST';
    if (data && data.id) {
      url = this.formatUrl(this.curd.update, data.id);
      method = 'PUT';
    }

    let options = {
      url: url,
      method: method,
      data: data,
      contentType: 'application/json'
    }
    return super.fetchData(options);
  }



  /**
   * 获取详情
   */
  getDetail(id, callback, callbackError) {
    let data = {};
    data[this.key] = id;

    let options = {
      url: this.formatUrl(this.curd.detail, id),
      params: data
    }
    return super.fetchData(options);
  }

  /**
   * 删除
   */
  remove(id, callback, callbackError) {
    let data = {};
    data[this.key] = id;

    let options = {
      url: this.formatUrl(this.curd.delete, id),
      method: 'POST',
      data: data,
      contentType: this.contentType || 'application/json'
    }
    return super.fetchData(options);
  }
}

export default CurdReq;
