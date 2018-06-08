  /* eslint no-underscore-dangle: 0 */
  import React, { Component } from 'react';
  import IceContainer from '@icedesign/container';
  import { Button, Input, Select, Field, DatePicker, Upload, Dialog, Feedback, Checkbox, Radio, CascaderSelect, Balloon } from '@icedesign/base';
  import "./SetFont.scss"
  import cx from 'classnames';
  import FontConfigReq from './../../reqs/FontConfigReq.js'
  import { Tools } from 'utils'
  import { Title, BtnAddRow } from 'components';
  import SetFontCustomDialog from './SetFontCustomDialog';
  import SetFontOptionalDialog from './SetFontOptionalDialog';
  import SetFontFieldsets from './SetFontFieldsets';
  import SetFontMenus from './SetFontMenus';

  const {Group: CheckboxGroup} = Checkbox;
  const {Group: RadioGroup} = Radio;
  const {MonthPicker, YearPicker, RangePicker} = DatePicker;
  const Toast = Feedback.toast;

  export default class setFont extends Component {
      static displayName = 'SetFont';

      constructor(props) {
          super(props);

          // 请求参数缓存
          this.state = {
              resData: [],
              pageValue: '',
              subTitle: '',
              fields: {
                  fieldsetOrder: 1,
                  hasAttachedFields: false,
                  isCustom: true,
                  isRepeatable: false,
                  isRequired: false,
                  label: "",
                  name: "",
                  orderId: 43,
                  screenSchemeId: '',
                  type: "",
                  options: [{
                      value: '',
                      label: ""
                  }],
                  length: 30,
              },
              arraList: [5, 6, 7, 8, 9],
              dialogOne: false,
              dialogTwo: false,
              editeCodeIndex: {
                  index: 0,
                  inj: 0
              },
              isSubmiting: false
          };
      }


      componentDidMount() {
          // 固定左侧菜单
          window.onscroll = function() {
              let scrollFix = document.querySelector('.scrollFix');
              if (!scrollFix) {
                  return
              }
              if (window.scrollY > 130) {
                  scrollFix.style.cssText += 'position:fixed;top:50px;'
              } else {
                  scrollFix.style.cssText += 'position:static;top:auto;'
              }
          }
      }

      componentWillReceiveProps(nextProps){
          if(nextProps.resData){
              console.log(nextProps.resData)
              this.setState({resData: nextProps.resData})
          }
      }

      /**
       * 更改编辑字段的值
       * @param  {[type]} data [description]
       * @return {[type]}      [description]
       */
      changeFormData(data) {
          let fields = this.state.fields;
          fields = Object.assign(fields, data);
          this.setState({
              fields
          })
      }

      /**
       * 更新字段集合
       * @param  {[type]} resData [description]
       * @return {[type]}         [description]
       */
      changeData(resData) {
          this.setState({
              resData
          });
      }

      // 上一页
      upPage = () => {
          let id = this.props.id
          this.props.router.push(`font/add?id=${id}`)
      }
      /**
       * 取消，如果是组件中使用依据传入的回调否则跳转到默认页面配置页
       * @return {[type]} [description]
       */
      cancelPage = () => {
          if(this.props.changeView){
              this.props.changeView();
              return;
          }
          this.props.router.push('font/list')
      }

      /**
       * 保存页面字段
       * @return {[type]} [description]
       */
      submit = () => {

          let id = this.props.id;
          let id2 = this.props.id2;
          let resData = this.state.resData;
          debugger
          let reqData = {
              "name": '',
              "businessType": "货款业务",
              "functionType": "进件",
              "fields": []
          }

          // 校验是否有已命名空区域，有则弹出提示框“xxxx区域未添加字段，请添加后提交或删除该区域后提交”
          // 空区块删除
          let tts = resData.fieldset.every((item) => {
              if (!item.fields.length) {
                  Feedback.toast.show({
                      type: 'error',
                      content: `${item.name}区域未添加字段，请添加后提交或删除该区域后提交！`
                  })
                  return false
              } else {
                  return true
              }
          })
          if (!tts) {
              return
          }

          //校验区域名称是否有重复的
          let namesObj = {};
          resData.fieldset.map((item) => {
            if(!namesObj[item.name]){
              namesObj[item.name] = 0;
            }
            namesObj[item.name]++;
          })
          let namesArr = [];
          for(var i in namesObj){
            if(namesObj[i] > 1){
              namesArr.push(i);
            }
          }
          if(namesArr.length > 0){
            Feedback.toast.show({
                type: 'error',
                content: `有区域名称重复，${namesArr.join(',')}`
            })
            return;
          }

          // 给每个field字段添加fieldset，指定字段该区域的
          // 给每个字段添加fieldsetorder排序，指明该字段所属区域的排序
          // 给每个字段添加排序字段orderId，指明当前字段在该区域内的排序
          // 这里的排序都是正序排列
          // 转换fieldset到fields
          resData.fieldset.map((item, i) => {
              item.fields.map((field, j) => {
                  if(field.fieldset != item.name) {
                    field.fieldset = item.name;
                  }
                  field.orderId = j;
                  field.fieldsetOrder = i;
                  reqData.fields.push(field)
              })
          })

          //保存页面的时候新增时需要把字段的Id=>fieldId
          reqData.fields.map((item) => {
              if(!item.fieldId){
                  let fieldId = item.id;
                  delete item.id;
                  item.fieldId = fieldId;
              }
          })

          this.setState({isSubmiting: true});

           // 如果id(页面ID)存在就更新字段
          if (id) {
              FontConfigReq.changPageName(reqData,id).then((res) => {
                  this.setState({isSubmiting: false});
                  if(this.props.onSave){
                      this.props.onSave(id);
                      return
                  }
                  this.props.router.push(`/font/set/${id}`)
              }).catch((res) => {
                  this.setState({isSubmiting: false});
                  Dialog.alert({
                      content: res.msg,
                      closable: false,
                      title: "提示",
                  });
              })
          } else if(id2){
              // 编辑第二个进件的时候
              FontConfigReq.changPageName(reqData,id2).then((res) => {
                  this.setState({isSubmiting: false});
                  if(this.props.onSave){
                      this.props.onSave(id2);
                      return
                  }
                  this.props.router.push(`/font/set/${id2}`)
              }).catch((res) => {
                  this.setState({isSubmiting: false});
                  Dialog.alert({
                      content: res.msg,
                      closable: false,
                      title: "提示",
                  });
              })
          }else{
              // 提交字段
              FontConfigReq.save(reqData).then((res) => {
                  this.setState({isSubmiting: false});
                  let data = res.data;
                  if(this.props.onSave){
                      this.props.onSave(data.id);
                      return
                  }
                  this.props.router.push(`/font/set/${data.id}?pageName=${pageName}`)
              }).catch((res) => {
                  this.setState({isSubmiting: false});
                  Dialog.alert({
                      content: res.msg,
                      closable: false,
                      title: "提示",
                  });
              })
          }
      }

      /**
       * 保存字段
       * @return {[type]} [description]
       */
      saveFields(selectedFields) {
          let fields = this.state.fields;
          let id = this.props.id
          let resData = this.state.resData;
          let index = this.state.editeCodeIndex.index;
          let inj = this.state.editeCodeIndex.inj;
          let step = this.props.step;

          console.log('saveFields', fields);

          this.addSelectedFieldsToPage(selectedFields, index, step);

          if (fields.id) {
              if(id){
                  FontConfigReq.submitModifyCode(fields, id, fields.id).then((data) => {
                      // if (data.code == 200) {
                          this.removeField(resData, index, inj, fields);
                      // }
                  }).catch((error)=>{
                    Toast.show({
                      type: 'error',
                      content: error.msg,
                    });
                  })
              }else{
                  this.removeField(resData, index, inj, fields);
              }
          } else {
              // 自定义字段的时候只有在输入字段名称选择字段类型才当作有新增字段，否则只是选择了字段
              if(!fields.name || !fields.type){
                  this.closeDialog();
                  return;
              }

              // 设置当前新增字段所属的进件步骤
              if(!fields.step){
                  fields.step = step;
              }

              if(id){
                  FontConfigReq.submitCustomeCode(fields, id).then((data) => {

                          fields.id = data.data.id
                          this.addField(resData, index, fields);

                  }).catch((error)=>{
                      console.log("添加字段", error.msg);
                      Toast.show({
                        type: 'error',
                        content: error.msg,
                      });
                  })
              }else if(fields.tempId){
                  this.removeField(resData, index, inj, fields);
              }else{
                  fields.tempId = 1;
                  this.addField(resData, index, fields);
              }
          }
      }

      removeField(resData, i, j, fields){
          resData.fieldset[i].fields.splice(j, 1, fields);
          this.closeDialog(resData);
      }

      addField(resData, i, fields){
          resData.fieldset[i].fields.push(fields);
          this.closeDialog(resData);
      }

      closeDialog(resData){
          let obj = {
              dialogOne: false,
              dialogTwo: false
          };

          if(resData){
              obj.resData = resData;
          }

          this.setState(obj);
      }

      /**
       * 添加选中的字段到页面中，从自定义字段中选中的字段，添加到当前的区域中，追加step参数
       * @param {[type]} selectedFields [description]
       */
      addSelectedFieldsToPage(selectedFields, index, step){
          if(!selectedFields || selectedFields.length == 0){
              return;
          }

          let resData = this.state.resData;
          let checkedFields = [];

          // 所有选择字段都插入到当前区域
          selectedFields.map(item => {
              item.fields.map((sitem) => {
                  if(sitem.checked){
                      sitem.fieldset = resData.fieldset[index].name;
                      sitem.step = step;
                      checkedFields.push(sitem);
                  }
              });
          });
          resData.fieldset[index].fields = resData.fieldset[index].fields.concat(checkedFields);
          return;

          //旧的写法，分别插入到对应区域

          selectedFields.map(item => {
              let fieldsArr = [];
              item.fields.map((sitem) => {
                  if(sitem.checked){
                      fieldsArr.push(sitem);
                  }
              });

              if(fieldsArr.length > 0){
                  checkedFields.push({
                      name: item.name,
                      fields: fieldsArr
                  });
              }
          });

          if(checkedFields.length == 0){
              return;
          }

          let existFieldset = false;
          checkedFields.map((item, i) => {

              let fieldset = item.fields[0].fieldset;

              resData.fieldset.map((oitem, j) => {
                  if(oitem.fields.length > 0 && oitem.fields[0].fieldset == fieldset){
                      oitem.fields = oitem.fields.concat(item.fields);
                      existFieldset = true;
                  }
              })

              if(!existFieldset){
                  resData.fieldset.push(item);
              }
          })
      }

      /**
       * 编辑字段
       * 1.固定字段不能编辑，isFixed=true
       * 2.可选字段只编辑名称，isOptional=true
       * 3.自定义字段可编辑所有信息，isCustom=true
       * @param  {[type]} item  [description]
       * @param  {[type]} index [description]
       * @param  {[type]} inj   [description]
       * @return {[type]}       [description]
       */
      handleEditeCoce = (item, index, inj) => {
          let editeCodeIndex = {
              index,
              inj
          }
          if (item.isCustom) {
              this.setState({
                  editeCodeIndex,
                  fields: item,
                  dialogOne: true
              })
          } else {
              this.setState({
                  editeCodeIndex,
                  fields: item,
                  dialogTwo: true,
              })
          }
      }

      /**
       * 关闭修改字段弹窗
       * @return {[type]} [description]
       */
      onClose = () => {
          this.setState({
              dialogOne: false,
              dialogTwo: false
          })
      }

      /**
       * 点击添加自定义字段执行的函数，
       * 1. 设置自定义字段的默认值
       * 2. 自定义字段设置isCustom=true
       * 3. 默认添加排在当前组的最后
       * 4. 设置一个默认options
       * @param  {[type]} index 区域的索引值
       * @return {[type]}       [description]
       */
      handleAddCode = (index) => {
          let currentFieldSet = this.state.resData.fieldset[index];
          let data = {
              isCustom: true,
              filedsetOrder: index,
              type: null,
              options: [{
                  label: '',
                  value: '',
                  checked: true
              }],
              orderId: currentFieldSet.fields.length + 1
          };

          // 字段必填选项等设置为空
          data.fieldset = currentFieldSet.name;
          data.name = currentFieldSet.name;

          // 设置编辑区域的序号
          let editeCodeIndex = this.state.editeCodeIndex;
          editeCodeIndex.index = index;

          this.setState({
              dialogOne: true,
              fields: data,
              editeCodeIndex
          })
      }

      /**
       * 添加一个区域
       * @return {[type]} [description]
       */
      handleAddModule = () => {
          const newArr = this.state.resData;
          let add = {
              new: 1,
              name: '新区域',
              fields: []
          }
          newArr.fieldset.push(add)
          this.setState({
              resData: newArr
          });
      }

      /**
       * 获取页面剩余的未配置字段，从所有字段中过滤当前页面中的字段
       * @return {[type]} [description]
       */
      getOtherFields(){
          let {allPageFields = {}, resData1 = {}} = this.props;
          let {resData = {}} = this.props;

          if(!allPageFields.fieldset || !resData.fieldset){
              return [];
          }

          let result = [];

          allPageFields.fieldset.map((fieldset, i) => {
              let re = fieldset.fields.filter((field, j) => {
                  return this._existsInFields(resData.fieldset, field)
              });

              if(re.length > 0){
                  result.push({
                      name: fieldset.name,
                      fields: re
                  })
              }
          })

          return result;
      }

      _existsInFields(fields, field){
          let flag = true;

          fields.map((item, i) => {
              item.fields.map(sitem => {
                  if(sitem.id == field.id){
                      flag = false;
                      return;
                  }
              })

              if(!flag){
                  return;
              }
          })

          return flag;
      }

      render() {
          const validEmpty = (e) => {
              if (!e.target.value.length) {
                  Dialog.alert({
                      content: "区块名称不能为空",
                  })
              }
              this.setState({
                  subTitle: ''
              })
          }

          const {resData = {}} = this.state;
          let { id, id2, visible } = this.props;

          return (
              <IceContainer className="pch-container setFont" style={{display: visible ? '' : 'none'}}>
                  <Title title="进件模块页面字段编辑" />
                  <div className="pch-form">
                      <div className="container">
                          {/*渲染左边  */}
                          <div className="container-left">
                              <SetFontMenus resData={resData} />
                          </div>
                          {/* 渲染右边 */}
                          <div className="container-right">
                              <SetFontFieldsets
                                  id={id}
                                  id2={id2}
                                  resData={resData}
                                  changeData={this.changeData.bind(this)}
                                  handleEditeCoce={this.handleEditeCoce}
                                  handleAddCode={this.handleAddCode} />
                              <div className="addModule">
                                  <BtnAddRow text="添加新区域" onClick={this.handleAddModule} />
                              </div>
                              <div className="submit pch-form-buttons">
                                  <Button type="normal" size="large" onClick={this.cancelPage}>
                                      返回
                                  </Button>
                                  <Button type="secondary" size="large" onClick={this.submit} disabled={this.state.isSubmiting}>
                                      提交
                                  </Button>
                              </div>
                          </div>
                      </div>
                  </div>
                  <SetFontCustomDialog
                      visible={this.state.dialogOne}
                      onClose={this.onClose}
                      data={this.state.fields}
                      allPageFields={this.getOtherFields()}
                      changeFormData={this.changeFormData.bind(this)}
                      submitFormData={this.saveFields.bind(this)} />
                  <SetFontOptionalDialog
                      visible={this.state.dialogTwo}
                      onClose={this.onClose}
                      data={this.state.fields}
                      changeFormData={this.changeFormData.bind(this)}
                      submitFormData={this.saveFields.bind(this)} />
              </IceContainer>

              );
      }
  }
