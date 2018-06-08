export default {
  options: [],
  data: {
    list: [],
    selectClass: 'selected',
    selectBoxClass: 'product-name-select',
    activeSelectBoxClass: 'focused',
    selectListBox: 'options',
    selectBox: null
  },
  init(e, list){
    this.data.list = list || this.data.list;
    let activeSelect = e.target;
    let productNameSelectClass = this.data.selectBoxClass;
    let isProductNameSelectDom = activeSelect.className.indexOf(productNameSelectClass) > -1;
    let isProductNameSelectChildDom = activeSelect.getAttribute('data-parent') == productNameSelectClass;
    if(isProductNameSelectChildDom){
      if(!isProductNameSelectDom && activeSelect.className.indexOf('selected') > -1)return;
      // 点击区域为select子节点，需要筛选出本次激活的select节点
      while(activeSelect.className.indexOf(productNameSelectClass) < 0){
        activeSelect = activeSelect.parentNode;
      }
    }else if(!isProductNameSelectDom){
      // 点击区域不是select节点，需要隐藏激活的下拉列表项
      return this.hide();
    }
    // 绑定过输入框输入事件
    this.bindInputEvent(activeSelect);
    // 生成下拉列表项
    this.makeOptionsBox(activeSelect)
    // 显示当前激活的下拉列表项
    this.show(activeSelect);
  },
  makeOptionsBox(activeSelect){
    let options = [...activeSelect.getElementsByTagName('div')];

    if(options.length > 0){
      options = options[0];
      //已经渲染过下拉列表项时需要更新下拉列表
      options.innerHTML = this.makeOptions(activeSelect);
      return this
    }
    options = document.createElement('div');
    options.className = this.data.selectListBox;
    options.setAttribute('data-parent', this.data.selectBoxClass);
    options.innerHTML = this.makeOptions(activeSelect);
    let selectBoxClass = this.data.selectBoxClass;
    let selectClass = this.data.selectClass;
    options.onclick = function(e){
      if(!this.selectClass)this.selectClass = selectClass;
      if(!this.selectBoxClass)this.selectBoxClass = selectBoxClass;
      selectClass = null;
      selectBoxClass = null;
      let target = e.target;
      let input = this.parentNode.getElementsByTagName('input')[0];
      if(target.tagName.toLowerCase() == 'li'){
        if(target.className.indexOf(this.selectBoxClass) < 0){
          //用于显示的中文name
          input.value = target.innerHTML;
          //实际选中的name
          input.setAttribute('data-value', target.getAttribute('data-name'));
          //将上一个选中项去调
          if(this.activeOption)this.activeOption.className = '';
          //存取本次选中项option
          this.activeOption = target;
          //设置选中class
          target.className = this.selectClass;
        }
        //选择后要隐藏本次列表项
        this.parentNode.className = this.selectBoxClass;
      }else{

      }
      //阻止冒泡和默认事件
      return false;
    }
    this.options.push(options);
    activeSelect.appendChild(options);
    return this;
  },
  makeOptions(activeSelect){
    let selectBoxClass = this.data.selectBoxClass;
    let selectClass = this.data.selectClass;
    let html = '';
    let dataName = activeSelect.getElementsByTagName('input')[0].getAttribute('data-value');
    html += this.data.list.map(p=>{
      let c = p.name == dataName ? selectClass : ''
      return `<li data-parent='${selectBoxClass}' class='${c}' data-name=${p.name}>${p.label}</li>`
    }).join('');
    return `<ul data-parent='${selectBoxClass}'>${html}</ul>`;
  },
  bindInputEvent(activeSelect){
    if(activeSelect.bindInputEvent)return;
    activeSelect.bindInputEvent = true;
    let focusMenu = this.focusMenu;
    let input = activeSelect.getElementsByTagName('input')[0];
    input.oninput = function(){
      let menu = [...this.parentNode.getElementsByTagName('div')];
      let list = [...this.parentNode.getElementsByTagName('li')];
      list.forEach(li=>{
        if(li.innerHTML.indexOf(this.value) > -1){
          li.style.display = 'block'
        }else{
          li.style.display = 'none'
        }
      })
      focusMenu(menu, list, this)
      return false
    }
    // input.onblur = function(){
    //   let list = [...this.parentNode.getElementsByTagName('li')];
    //   list.forEach(li=>{
    //     li.style.display = 'block'
    //   })
    // }
  },
  focusMenu(menu, menus, input, noInput){
      menu = menu instanceof Array && menu || [menu];
      let list = [...menus];
      let dataName = '';
      let dataValue = input.getAttribute('data-value');
      let value = input.value;
      if((menu.length < 1 || list.length < 1) && !noInput){
        //如果不存在menu时return
        dataName = input.name;
      }else{
        //将上一个选中项去调
        if(menu.length > 0 && menu[0].activeOption)menu[0].activeOption.className = '';
        let selected = list.find(li=>li.innerHTML==value);
        if(selected){
          menu[0].activeOption = selected;
          selected.className = 'selected';
          dataName = selected.getAttribute('data-name');
        }else{
          dataName = input.name;
        }
      }
      //设置input的data-value，即实际name值
      input.setAttribute('data-value', dataName);
  },
  show(select){
    if(this.data.selectBox != select && this.data.selectBox){
      this.hide();
    }
    //存取本次激活的下拉列表项
    this.data.selectBox = select;
    //显示的时候要匹配当前是否有选中的菜单
    this.focusMenu(select, select.getElementsByTagName('li'), select.parentNode.getElementsByTagName('input')[0])
    //显示下拉框
    this.data.selectBox.className += ' ' + this.data.activeSelectBoxClass;
    return this;
  },
  hide(){
    if(this.data.selectBox){
      this.data.selectBox.className = this.data.selectBoxClass;
      let list = [...this.data.selectBox.getElementsByTagName('li')];
      list.forEach(li=>{
        li.style.display = 'block'
      })
    }
    return this;
  },
  destory(){
    this.options.forEach(opts=>{
      opts.parentNode.getElementsByTagName('input')[0].oninput = null;
      opts.parentNode.getElementsByTagName('input')[0].onblur = null;
      opts.onclick = null;
    })
    return this;
  }
}
