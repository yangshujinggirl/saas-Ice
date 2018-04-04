/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import cx from 'classnames';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { Icon } from "@icedesign/base";
import IceImg from '@icedesign/img';

class DropCell extends Component {
    static displayName = 'Fields';

    constructor(props) {
        super(props);
    }
    render() {
        const {
            index,
            data,
            text,
            isDragging,
            connectDropTarget,
            onRemoveClick
        } = this.props
        const opacity = isDragging ? 0.1 : 1

        return connectDropTarget(
            <div className={cx('listCode')}>
                <Icon type="close" onClick={onRemoveClick.bind(this,index, data.sourceId)} />
                {data.value ?
                <IceImg
                    height={20}
                    width={20}
                    src={data.value}
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
        const { index: targetIndex} = props

        // Don't replace items with themselves
        if (lastTargetIndex === targetIndex) {
            return
        }

        // Time to actually perform the action
        props.moveCard(targetIndex, sourceId, false, lastTargetIndex)

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().lastId = sourceId
        monitor.getItem().lastTargetIndex = targetIndex
    }
}

DropCell = DropTarget('CARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(DropCell)


export default DropCell;