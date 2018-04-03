import React, { Component } from 'react';
// import DemoDetail from './components/DemoDetail';
import update from 'immutability-helper'
import { DragDropContext,DropTarget } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Card from './Card'

class Demo extends Component {

  constructor(props) {
    super(props);
    
  }

  handleStart(){}

  handleDrag(e, data){
    this.eventLogger(e,data)
  }

  handleStop(){}


  eventLogger = (e: MouseEvent, data: Object) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };

  /**
   * <DemoDetail {...this.props} />
   * @return {[type]} [description]
   */
  render() {
    return (
      <div>
      
      </div>
    );
  }
}



const style = {
  width: 400,
}

const cardTarget = {
  drop() {},
}

class Container extends Component {
  constructor(props) {
    super(props)
    this.moveCard = this.moveCard.bind(this)
    this.state = {
      cards: [
        {
          id: 1,
          text: 'Write a cool JS library',
        },
        {
          id: 2,
          text: 'Make it generic enough',
        },
        {
          id: 3,
          text: 'Write README',
        },
        {
          id: 4,
          text: 'Create some examples',
        },
        {
          id: 5,
          text:
            'Spam in Twitter and IRC to promote it (note that this element is taller than the others)',
        },
        {
          id: 6,
          text: '???',
        },
        {
          id: 7,
          text: 'PROFIT',
        },
      ],
    }
  }

  moveCard(id, atIndex) {
    const { card, index } = this.findCard(id)
    this.setState(
      update(this.state, {
        cards: {
          $splice: [[index, 1], [atIndex, 0, card]],
        },
      }),
    )

    // const { cards } = this.state
    // const dragCard = cards[dragIndex]

    // this.setState(
    //   update(this.state, {
    //     cards: {
    //       $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]],
    //     },
    //   }),
    // )
  }

  findCard(id) {
    const { cards } = this.state
    const card = cards.filter(c => c.id === id)[0]

    return {
      card,
      index: cards.indexOf(card),
    }
  }

  render() {
    const { connectDropTarget } = this.props
    const { cards } = this.state

    return connectDropTarget(
      <div style={style}>
        {cards.map((card, i) => (
          <Card
            key={card.id}
            id={card.id}
            text={card.text}
            moveCard={this.moveCard}
            findCard={this.findCard.bind(this)}
          />
        ))}
      </div>
    )
  }
}

Container = DropTarget('CARD', cardTarget, connect => ({
  connectDropTarget: connect.dropTarget(),
}))(Container)

export default DragDropContext(HTML5Backend)(Container);
