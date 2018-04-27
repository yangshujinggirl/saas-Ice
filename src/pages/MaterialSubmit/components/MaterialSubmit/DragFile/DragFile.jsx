/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import cx from 'classnames';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'

class DragFile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {
        	className,
            data,
            text,
            isDragging,
            connectDragSource,
            isFixed,
            onClick
        } = this.props
        const opacity = isDragging ? 0.1 : 1

        return connectDragSource(
          <div className="material-files-item" style={{opacity,display: data.isUsed ? 'none' : ''}}>
            <div className="material-files-item-thumbnail">
                <div style={{backgroundImage: `url(${data.imgURL})`}} a={data.imgURL}></div>
            </div>
            <span className="material-files-item-name">
              {data.fileName}
            </span>
          </div>
        	)
    }
}

const cardSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
            type: props.type
        }
    },

    endDrag(props, monitor) {
        // console.log('endDrag',props, monitor.getItem())
        const { index: sourceIndex, id: sourceId } = props
        const { lastId, lastTargetIndex, type } = monitor.getItem()
        const didDrop = monitor.didDrop()

        if (!didDrop) {
            //props.moveCard(lastTargetIndex, sourceId, true, undefined, type)
        }
    },
}

DragFile = DragSource('CARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(DragFile)

export default DragFile;