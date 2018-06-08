/* eslint no-underscore-dangle: 0 */
import React, { Component } from 'react';
import cx from 'classnames';
import { findDOMNode } from 'react-dom'
import { DragSource, DropTarget } from 'react-dnd'
import { Icon } from "@icedesign/base";
import IceImg from '@icedesign/img';
import { Feedback } from '@icedesign/base';

const Toast = Feedback.toast;
class DropCell extends Component {
    constructor(props) {
        super(props);
        this.imgMatching = true;
        this.imgSizeMatching = true;
    }
    isImg(url) {
        return /(\.gif|\.png|\.jpg|\.jpeg)+$/i.test(url);
    }
    componentDidUpdate(state) {
        const { index, data, type, isOver, canDrop, connectDropTarget, onRemoveClick } = this.props;
        if(!this.imgSizeMatching) {
            Toast.show({
                type: 'help',
                content: '材料文件太大，超过' + data.fileSize + 'M',
            });
            onRemoveClick.bind(this, index, type, data)();
            return;
        }
        if(!this.imgMatching) {
            Toast.show({
                type: 'help',
                content: '材料文件类型不正确，应使用格式' + data.fileType,
            });
            onRemoveClick.bind(this, index, type, data)();
            return;
        }
    }
    render() {
        const { index, data, type, isOver, canDrop, connectDropTarget, onRemoveClick } = this.props;
        this.imgMatching = data.fileType.split(',').some(element => {
            if (data[type]) {
                return data[type].includes(element);
            } else {
                return true;
            }
        });
        if(data.realSize){
            //realSize 单位B
            //fileSize 单位M
            this.imgSizeMatching = data.fileSize * 1000 * 1000 > data.realSize;
        }else{
            this.imgSizeMatching = true;
        }

        return connectDropTarget(
            <div className={cx('material-file-cell', {'can-drop': canDrop})}>
                {data[type]!=undefined?
                    <div className="material-file-content">
                        <Icon
                            className="material-file-cell-close"
                            type="close"
                            size="small"
                            onClick={onRemoveClick.bind(this, index, type, data)} />

                         <IceImg
                             height={44}
                             width={44}
                             src={this.isImg(data[type])? data[type]:'/public/images/creditInformation/filed.png'}/>
                    </div> : <div className="material-file-text">请拖动材料</div>}
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
        // console.log('DropCell hover', props, monitor.getItem())
        const {lastTargetIndex, id: sourceId} = monitor.getItem()
        const {index: targetIndex, type, data} = props

        // Don't replace items with themselves
        if (lastTargetIndex === targetIndex) {
            return
        }
        if(props.data[props.type]){
            // 已经拖动过则不在拖放
            return false;
        }

        // Time to actually perform the action
        props.moveCard(targetIndex, sourceId, lastTargetIndex, type, data.fileType)

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
