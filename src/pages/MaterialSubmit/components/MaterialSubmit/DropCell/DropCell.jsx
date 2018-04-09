/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import cx from 'classnames';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { Icon } from "@icedesign/base";
import IceImg from '@icedesign/img';

class DropCell extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
            index,
            data,
            type,
            isOver,
            connectDropTarget,
            onRemoveClick
        } = this.props

        return connectDropTarget(
            <div className={cx('listCode')}>
                <Icon type="close" onClick={onRemoveClick.bind(this,index, data.sourceId, type, data[type])} />
                {data[type] ?
                <IceImg
                    height={20}
                    width={20}
                    src={data[type]}
                  />
                  : '请拖动图片'
                }
            </div>
        )
    }
}

const cardTarget = {
    canDrop(){
        return false;
    },
    hover(props, monitor, component) {
        // console.log('DropCell hover', props,monitor.getItem())
        const { lastTargetIndex, id: sourceId } = monitor.getItem()
        const { index: targetIndex, type} = props

        // Don't replace items with themselves
        if (lastTargetIndex === targetIndex) {
            return
        }

        // Time to actually perform the action
        props.moveCard(targetIndex, sourceId, false, lastTargetIndex, type)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().lastId = sourceId
        monitor.getItem().lastTargetIndex = targetIndex
    }
}

DropCell = DropTarget('CARD', cardTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
}))(DropCell)


export default DropCell;