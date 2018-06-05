/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import cx from 'classnames';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { Button, Input, Dialog, Checkbox, Radio, Balloon, DatePicker, Select, CascaderSelect, Feedback } from '@icedesign/base';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      parent:props.parent
    }
  }
}
const cardTarget = {
	hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index
		const hoverIndex = props.index;
    const dragParent = monitor.getItem().parent
    const hoverParent = props.parent


		// Don't replace items with themselves
		if (dragParent == hoverParent && dragIndex === hoverIndex) {
      // console.log(dragParent == hoverParent && dragIndex === hoverIndex)
			return
		}

		// Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

		// Get vertical middle
		const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

		// Determine mouse position
		const clientOffset = monitor.getClientOffset()

		// Get pixels to the top
		const hoverClientY = clientOffset.y - hoverBoundingRect.top
		// Only perform the move when the mouse has crossed half of the items height
		// When dragging downwards, only move when the cursor is below 50%
		// When dragging upwards, only move when the cursor is above 50%
		// Dragging downwards
		if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
			return
		}
		// Dragging upwards
		if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
			return
		}
		props.moveCard(dragParent, hoverParent, dragIndex, hoverIndex)

		monitor.getItem().index = hoverIndex
    monitor.getItem().parent = hoverParent
	},
}

class Fields extends Component {

  render() {
    const {
            connectDragSource,
            connectDropTarget,
            item,
            key,
            index
          } = this.props;

    return (
      connectDragSource &&
			connectDropTarget &&
			  connectDragSource(
  				connectDropTarget(
            <div style={{'padding':'20px'}}>还没有字段哦</div>
          ),
			)
    )
  }
}

Fields = DropTarget('CARD', cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))(Fields)

Fields = DragSource('CARD', cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))(Fields)

export default Fields;
