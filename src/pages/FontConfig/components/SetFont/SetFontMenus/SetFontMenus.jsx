import React, { Component } from 'react';
import cx from 'classnames';

export default class SetFontMenus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftActive: 0
        };
    }


    menuNav = (archer, index) => {
        this.scrollToAnchor(archer)
        this.setState({
            leftActive: index,
        })
    }

    scrollToAnchor = (anchorName) => {
        if (anchorName) {
            // 找到锚点
            let anchorElement = document.getElementById(anchorName);
            // 如果对应id的锚点存在，就跳转到锚点
            if (anchorElement) {
                anchorElement.scrollIntoView();
            }
        }
    }


    render() {

        let {resData} = this.props;

        return (
            <ul className='scrollFix'>
                {resData.fieldset && resData.fieldset.map((item, index) => {
                     return (
                         <li className={cx({
                                    'active': this.state.leftActive === index
                                })} key={index}>
                             <a onClick={this.menuNav.bind(this, item.name, index)}>
                                 {item.name}
                             </a>
                         </li>
                     )
                 })}
            </ul>
        )
    }
}
