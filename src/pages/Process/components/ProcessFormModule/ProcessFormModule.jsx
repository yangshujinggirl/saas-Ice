import React, { Component } from 'react';

export default class ProcessFormModule extends Component {
    constructor() {
        super();
    }

    /**
     * 点击增加一个模块，约定只有0次的不能增加，负数可以多次添加
     * @param  {[type]} item [description]
     * @return {[type]}      [description]
     */
    handleAddClick(item) {
        if (item.limitedAddTimes == 0) {
            return;
        }
        this.props.setModule(item, 'add')
    }

    render() {
        let {customMenuList, setModule} = this.props;

        return (
            <div className="container-left">
                <div className="con">
                    <ul className='container-left-uls'>
                        {customMenuList && customMenuList.map((item, index) => {
                             if (item.enable != 1) {
                                 // 不启用不展示，enable是否可用,0不可用;1可用
                                 return null;
                             }
                             return (
                                 <li key={index}>
                                     <span className="texts" data-limit="{item.limitedAddTimes}">{item.taskTypeName}</span>
                                     <span className={'icons' + (item.limitedAddTimes != 0 ? '' : ' disabled')}><i onClick={this.handleAddClick.bind(this, item)} className="icon"></i></span>
                                 </li>
                                 );
                         })}
                    </ul>
                </div>
            </div>
            );
    }
}
