export default {
  options: [],
  makeOptions(parent, htmlStr){
    let options = document.createElement('div');
    options.className = 'options';
    options.setAttribute('data-parent', 'product-name-select');
    options.innerHTML = htmlStr;
    let that = this;
    options.onclick = function(e){
      let target = e.target;
      let input = this.parentNode.getElementsByTagName('input')[0];

      if(target.tagName.toLowerCase() == 'li' && target.className.indexOf('selected') < 0){
        //用于显示的中文name
        input.value = target.innerHTML;
        //实际选中的name
        input.setAttribute('data-value', target.getAttribute('data-name'));
        //将上一个选中项去调
        if(this.activeOption)this.activeOption.className = '';
        //存本次选中项option
        this.activeOption = target;
        //设置选中class
        target.className = 'selected';
      }
      //选择后要隐藏本次列表项
      this.parentNode.className = 'product-name-select';
      //阻止冒泡和默认事件
      return false;
    }
    this.options.push(options);
    parent.appendChild(options);
    return options;
  },
  destory(){
    this.options.forEach(opts=>{
      opts.parentNode.getElementsByTagName('input')[0].oninput = null;
      opts.onclick = null;
    })
  }
}