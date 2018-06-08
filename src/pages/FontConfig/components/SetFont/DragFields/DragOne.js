/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import cx from 'classnames';
import update from 'immutability-helper'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import FieldsOne from './Fields/FieldsOne';

class DragFields extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data||[]
    }
    this.moveCard = this.moveCard.bind(this)
  }
  moveCard(dragIndex: number, hoverIndex: number) {
      const { data } = this.state
      const dragCard = data[dragIndex];
      this.setState(
  			update(this.state, {
  				data:{$splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]},
  			}),
  		)
  }

  render() {
    console.log(this.state.data)
    const { item, inx } = this.props;
    return (
      <div key={inx} className="setfont-field">
          {/*添加字段按钮和小标题  */}
          <div className='base-detail clearfix'>
              <div className='base-detail-name active' onClick={this.props.titleState} id={item.name}>
                  <Input
                      placeholder="区域名称"
                      maxLength={35}
                      value={item.name}
                      onChange={this.handleGroupTitle.bind(this, index)}
                      onBlur={this.handleGroupTitleSubmint.bind(this, index)}
                      className='moduleStr'
                      readOnly={this.state.subTitle != index + 1} />
              </div>
              <div className="base-detail-opt">
                  {
                    index != 0 &&
                     <span>
                       <span
                         className='icon delete'
                         onClick={this.handleRemoveModule.bind(this, index)}>
                         
                       </span>
                       <span
                         className={cx('icon up', {'disabled': index == 1})}
                         onClick={this.moveUp.bind(this, index)}>
                        
                       </span>
                       <span
                         className={cx('icon down', {'disabled': index == resData.fieldset.length - 1})}
                         onClick={this.moveDown.bind(this, index)}>
                         
                       </span>
                     </span>
                   }
                    <span className="addStr" onClick={handleAddCode.bind(this, index)}>添加字段</span>
              </div>
          </div>
          <div className='ui-sortable'>
              {item.fields.map((item, inj) => {
                   if (item.isFixed) {
                       // 固定字段
                       return (
                           <div className={cx('dynamic-item', 'firstModle', 'ui-sortable-item',
                                   'false')} key={inj} data-row={item.line == 1 ? true : ''}>
                               <div className="clearfix">
                                   <label htmlFor="" className='label'>
                                       <Balloon type="primary" trigger={<span className='ellips'><span className='required'>*</span>
                                                                        {item.label}:</span>} closable={false} triggerType="hover">
                                           {item.label}
                                       </Balloon>
                                   </label>
                                   {handleFixed(item)}
                                   <span className='edite icon'></span>
                               </div>
                               <span className="delete" onClick={this.handleRemoveElement.bind(this, index)}>×</span>
                           </div>
                       )
                   } else {
                       return (
                           <div
                               onMouseLeave={hover.bind(this, 0)}
                               onMouseEnter={hover.bind(this, 1, item.label)}
                               className={cx('dynamic-item', 'firstModle', 'ui-sortable-item',
                                              'false', {
                                                  active: this.state.rightActive == item.label
                                              })}
                               key={inj}
                               data-row={item.line == 1 ? true : ''}>
                               <div className="clearfix">
                                   <label htmlFor="" className='label'>
                                       <Balloon type="primary" trigger={<span className='ellips' onDoubleClick={handleEditeCoce.bind(this, item, index, inj)} title={item.label}><span className='required' onClick={this.validaRequire.bind(this, index, inj)}>{item.isRequired ? '*' : ''}</span>
                                                                        {item.label}
                                                                        </span>} closable={false} triggerType="hover">
                                           {item.label}
                                       </Balloon>
                                   </label>
                                   {handleFixed(item)}
                                   <span className='edite icon' onClick={handleEditeCoce.bind(this, item, index, inj)}></span>
                               </div>
                               <span className="delete" onClick={this.handleRemoveElement.bind(this, index, inj)}>×</span>
                           </div>
                       )
                   }
               })}
              {item.fields.length == 0 && <div className="ui-sortable-empty">
                                              还没有字段哦
                                          </div>}
          </div>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(DragFields);
