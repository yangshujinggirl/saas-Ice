import React, { Component } from 'react';

export default class ProcessFormModule extends Component {
    constructor() {
        super();
    }

    handleAddClick(item){
        if(item.limitedAddTimes <= 0){
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
                             return (
                                 <li key={index}>
                                     <span className="texts">{item.limitedAddTimes}-{item.taskTypeName}</span>
                                     <span className={'icons' + (item.limitedAddTimes > 0 ? '' : ' disabled')}>{(index != 0 || item.limitedAddTimes > 0) && <i onClick={this.handleAddClick.bind(this, item)} className="icon"></i>}</span>
                                 </li>
                                 );
                         })}
                    </ul>
                </div>
            </div>
            );
    }
}
