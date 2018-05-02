import React, { PureComponent } from 'react';

export default class ProcessFormModule extends PureComponent {
    constructor() {
        super();
    }

    render() {
    	let { customMenuList, setModule } = this.props;
        return (
            <div className="container-left">
                <div className="con">
                    <ul className='container-left-uls'>
                        {customMenuList && customMenuList.map((item, index) => {
                             return (
                                 <li key={index}>
                                     <span className="texts">{item.number}-{item.name}</span>
                                     <span className="icons">{item.number > 0 && <i onClick={() => setModule(item, 'add')} className="icon"></i>}</span>
                                 </li>
                                 );
                         })}
                    </ul>
                </div>
            </div>
            );
    }
}
