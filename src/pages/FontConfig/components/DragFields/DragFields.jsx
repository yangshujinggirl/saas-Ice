/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import cx from 'classnames';
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Field from './Field';

class DragFields extends Component {
    static displayName = 'AddFont';

    constructor(props) {
        super(props);
        this.moveCard = this.moveCard.bind(this)

        // 请求参数缓存
        this.state = {
            pageName: '',
            resDate: [],
            isFixed: [],
        };
    }

    selected(){}

    moveCard(dragParent, hoverParent, dragIndex, hoverIndex) {
        const { data } = this.props
        const dragCard = data[dragIndex]

        console.log(dragParent, hoverParent, dragIndex, hoverIndex);

        this.props.onChange(dragParent, hoverParent, dragIndex, hoverIndex);

        // this.setState(
        //   update(this.state, {
        //     cards: {
        //       $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
        //     },
        //   }),
        // )
    }
    handleClick(index, subindex){
        this.props.onFieldClick && this.props.onFieldClick(index, subindex);
    }
    handleOperateClick(index, isAllChecked){
        this.props.onOperateClick && this.props.onOperateClick(index, isAllChecked)
    }
    render() {
        let {data = [], isFixed} = this.props;
        
        return (
            <div className="DragFields">
            {data.map((item, index) => {
                return <div className='subDif' key={index}>
                        <div>{item.name}</div>
                        <div className="select">
                            <span onClick={this.handleOperateClick.bind(this,index,true)}> 全选</span>
                            <span onClick={this.handleOperateClick.bind(this,index,false)}>反选</span>
                        </div>
                        {item.fields.map((item, i) => {
                            return (
                                <Field
                                    data={item}
                                    key={item.id}
                                    parent={index}
                                    index={i}
                                    id={item.id}
                                    text={item.text}
                                    moveCard={this.moveCard}
                                    isFixed={isFixed}
                                    onClick={this.handleClick.bind(this,index, i)}
                                  />
                            )
                        })}
                    </div>
            })}
            </div>
        );
    }
}

export default DragDropContext(HTML5Backend)(DragFields);