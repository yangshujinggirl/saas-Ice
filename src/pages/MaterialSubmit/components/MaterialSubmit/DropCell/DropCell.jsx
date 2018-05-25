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
        const {index, data, type, isOver, canDrop, connectDropTarget, onRemoveClick} = this.props

        return connectDropTarget(
            <div className={cx('material-file-cell', {'can-drop': canDrop})}>
                {data[type] ? 
                    <div className="material-file-content">
                        <Icon
                            className="material-file-cell-close"
                            type="close"
                            size="small"
                            onClick={onRemoveClick.bind(this, index, type, data)} />
                        
                         <IceImg
                             height={44}
                             width={44}
                             src={data[type]} />
                    </div> : <div className="material-file-text">请拖动图片</div>}
            </div>
        )
    }
}

const cardTarget = {
    canDrop(props, monitor) {
        // console.log('dropcell candrop', props);
        if(props.data[props.type]){
            // 已经拖动过则不在拖放
            return false;
        }
        return true;
    },
    hover(props, monitor, component) {
        console.log('DropCell hover', props, monitor.getItem())
        const {lastTargetIndex, id: sourceId} = monitor.getItem()
        const {index: targetIndex, type} = props

        // Don't replace items with themselves
        if (lastTargetIndex === targetIndex) {
            return
        }
        if(props.data[props.type]){
            // 已经拖动过则不在拖放
            return false;
        }

        // Time to actually perform the action
        props.moveCard(targetIndex, sourceId, lastTargetIndex, type)

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