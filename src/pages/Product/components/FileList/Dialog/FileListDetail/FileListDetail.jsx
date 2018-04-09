import React, { Component } from 'react';
import { Router, Route, Link } from 'react-router'

import IceContainer from '@icedesign/container';
import DataBinder from '@icedesign/data-binder';

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

import {
  Form,
  Field,
  Input,
  NumberPicker,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Table
 } from '@icedesign/base';

const { Group: CheckboxGroup } = Checkbox;


export default class DiaLog extends Component {

  constructor(props) {
    super(props);
  }

  renderFileName = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
    		required
	        name={`collectionDetails[${index}].fileName`}
	        >
	        	<Input placeholder="资料名称" />
	        </IceFormBinder>
	    </div>
	);
  }

  renderFileType = (value, index, record, context) => {
    return(
    	record.fileTypeArr && record.fileTypeArr.map((typeItem, j) => {
          return (
          	<div style={{paddingBottom: 7}} key={j}>
	            <span style={{paddingRight: 12}}>{typeItem.name}</span>
          		<IceFormBinder name={`collectionDetails[${index}].fileTypeArr[${j}].value`}>
	          	<CheckboxGroup
	          	  value={typeItem.value}
		          dataSource={typeItem.exts}
		          onChange={this.props.onChangeType.bind(this, index, j)}
		        />
		        </IceFormBinder>
            </div>
          )
        })
   	);
  }
  renderFileSize = (value, index, record, context) => {
    return(
    	<div>
    		<IceFormBinder
	        name={`collectionDetails[${index}].fileSize`}
	        required
	        type="number"
	        >
            <NumberPicker placeholder="文件大小" type="inline" max={100} min={0}/>
	        </IceFormBinder>
	    </div>
	);
  }
  renderOperate = (value, index, record, context) => {
    return (
      <div
        className="filter-table-operation"
      >
        <a href="#" onClick={this.handleRemoveClick.bind(this, record.id, index)}>
          删除
        </a>
      </div>
    );
  }

  handleRemoveClick(id, index, e){
  	e.preventDefault();
  	this.props.onRemove && this.props.onRemove(id, index)
  }

  render() {
  	let {data} = this.props;
    return (
    	<Table
            dataSource={data}
            className="basic-table"
            >
            <Table.Column title="资料名称" cell={this.renderFileName} width={230}/>
            <Table.Column title="文件类型" cell={this.renderFileType}/>
            <Table.Column title="限制大小" cell={this.renderFileSize} width={200}/>
            <Table.Column title="操作" cell={this.renderOperate} width={120}/>
        </Table>
    )
  }
}
