import React, { Component } from 'react';
import { Table } from '@icedesign/base';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import DragFile from '../DragFile';
import DropCell from '../DropCell';
import { BaseComponent } from 'base';

class DragContext extends BaseComponent {

    static propTypes = {};

    static defaultProps = {};

    constructor(props) {
        super(props);

        this.currentId = 1;
    }

    renderCell(key, value, index, record) {
      const {fileList} = this.props;
        return (
            <DropCell
                key={record.id}
                index={index}
                data={record}
                type={key}
                fileList={fileList}
                moveCard={this.moveCard.bind(this)}
                onRemoveClick={this.handleRemoveClick.bind(this)} />
            );
    }

    findFileById(id) {
        const {fileList} = this.props;
        const file = fileList.filter(c => c.id === id)[0];
        return {
            file,
            index: fileList.indexOf(file),
        };
    }

    moveCard(targetIndex, sourceId, lastTargetIndex, type, fileType) {
        console.log('moveCard', arguments);
        let {dataSource, fileList} = this.props;
        let dragFile = this.findFileById(sourceId);
        let d = dataSource[targetIndex];

        if (typeof lastTargetIndex != 'undefined') {
            dataSource[lastTargetIndex][type] = undefined;
        }
        if (typeof d.sourceId != 'undefined') {
            // let lastdragFile = this.findFileById(d.sourceId);
            // lastdragFile.file.isUsed = false;
        }
        dragFile.file.isUsed = true;
        // console.log('dragFile.file', dragFile.file)
        d[type] = dragFile.file.imgURL;
        d.sourceIndex = dragFile.index;
        d.sourceId = sourceId;
        d.realSize = dragFile.file.size;

        this.props.onChangeData({
            dataSource,
            fileList,
        });
    }

    handleRemoveClick(index, type, data) {
        console.log(index, type, data)
        let {dataSource, fileList} = this.props;
        let dragFile = this.findFileById(data.sourceId);
        let d = dataSource[index];

        if (!data.sourceId) {
            // sourceId标明当前数据是从哪个源拖动过来的
            fileList.push({
                id: this.currentId,
                imgURL: data[type],
                status: 'done',
                type
            });
            this.currentId++;
        } else {
            dragFile.file.isUsed = false;
        }
        d[type] = undefined;
        d.realSize = undefined;
        
        this.props.onChangeData({
            dataSource,
            fileList,
        });
    }

    render() {
        let {fileList, tableList, dataSource} = this.props;
        return (
            <div className="material-context">
                <div className="material-files">
                    {fileList.map((item, idx) => {
                         return (
                             <DragFile
                                 key={idx}
                                 id={item.id}
                                 index={idx}
                                 data={item}
                                 moveCard={this.moveCard.bind(this)} />
                             );
                     })}
                </div>
                <Table dataSource={dataSource}>
                    {tableList.map((item, index) => {
                         let myCell;
                         if (item.draggable) {
                             myCell = this.renderCell.bind(this, item.id);
                         }
                         return (
                             <Table.Column title={item.title} cell={myCell} dataIndex={item.id} key={index} />
                             );
                     })}
                </Table>
            </div>
            );
    }
}

export default (DragContext);
