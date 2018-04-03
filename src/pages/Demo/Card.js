import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			originalIndex: props.findCard(props.id).index,
		}
	},
	endDrag(props, monitor) {
		const { id: droppedId, originalIndex } = monitor.getItem()
		const didDrop = monitor.didDrop()

		if (!didDrop) {
			console.log('endDrag', droppedId, originalIndex)
			props.moveCard(droppedId, originalIndex)
		}
	}
}

const cardTarget = {
	canDrop() {
		return false
	},

	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem()
		const { id: overId } = props

		if (draggedId !== overId) {
			const { index: overIndex } = props.findCard(overId)
			console.log('hover', draggedId, overIndex)
			props.moveCard(draggedId, overIndex)
		}
	}
	// hover(props, monitor, component) {
	// 	const dragIndex = monitor.getItem().index
	// 	const hoverIndex = props.index

	// 	// Don't replace items with themselves
	// 	if (dragIndex === hoverIndex) {
	// 		return
	// 	}

	// 	// Determine rectangle on screen
	// 	const hoverBoundingRect = findDOMNode(component).getBoundingClientRect()

	// 	// Get vertical middle
	// 	const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

	// 	// Determine mouse position
	// 	const clientOffset = monitor.getClientOffset()

	// 	// Get pixels to the top
	// 	const hoverClientY = clientOffset.y - hoverBoundingRect.top

	// 	// Only perform the move when the mouse has crossed half of the items height
	// 	// When dragging downwards, only move when the cursor is below 50%
	// 	// When dragging upwards, only move when the cursor is above 50%

	// 	// Dragging downwards
	// 	if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
	// 		return
	// 	}

	// 	// Dragging upwards
	// 	if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
	// 		return
	// 	}

	// 	// Time to actually perform the action
	// 	props.moveCard(dragIndex, hoverIndex)

	// 	// Note: we're mutating the monitor item here!
	// 	// Generally it's better to avoid mutations,
	// 	// but it's good here for the sake of performance
	// 	// to avoid expensive index searches.
	// 	monitor.getItem().index = hoverIndex
	// },
}


class Card extends Component {
	static propTypes = {
		connectDragSource: PropTypes.func.isRequired,
		connectDropTarget: PropTypes.func.isRequired,
		isDragging: PropTypes.bool.isRequired,
		id: PropTypes.any.isRequired,
		text: PropTypes.string.isRequired,
		moveCard: PropTypes.func.isRequired,
	}

	render() {
		const {
			text,
			isDragging,
			connectDragSource,
			connectDropTarget,
		} = this.props
		const opacity = isDragging ? 0.1 : 1

		return connectDragSource(
			connectDropTarget(<div style={{ ...style, opacity }}>{text}</div>),
		)
	}
}

Card = DropTarget('CARD', cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))(Card)

Card = DragSource('CARD', cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))(Card)

export default Card;
