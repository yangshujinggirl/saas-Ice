import React, { Component } from 'react';
import IceContainer from '@icedesign/container';
import './ProcessForm.scss';
import {hashHistory} from 'react-router';
import DataBinder from '@icedesign/data-binder';

import {
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Table,
  Pagination,
} from '@icedesign/base';

const { Row, Col } = Grid;

import {
  FormBinderWrapper as  IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';

@DataBinder({
  customMenuList: {
    url: 'https://easy-mock.com/mock/5ac86d8921ab0d533cccabff/lianxin/process/add',
  },
})

export default class ProcessForm extends Component {
	constructor(props) {
    	super(props);
    }
    // 
    /**
     * 初始化
     */
    componentDidMount() {
    	var data = this.props.location.state;
    	this.fetchData()
  	}
  	fetchData = () => {
    	let {actions} = this.props;
    	this.props.actions.getCustomMenuList()

    	// setTimeout(() => {
    	// 	console.log(this.props.customMenuList)	
    	// },10000)
    	// console.log(this.props.customMenuList)	
    	// this.props.actions.search();
  	}

    /**
  	 * 渲染
  	 */
    render() {
    	let { customMenuList } = this.props
    	// console.log(this.props.bindingData.customMenuList)
    	// let { customMenuList } = this.props.bindingData
    	// console.log(customMenuList)
    	return (
    		<div className="create-activity-form">
	    		 <IceContainer title="" >
	    			 	<IceFormBinderWrapper>
	    			 		<div>
				               <legend style={styles.legend}  className="legend" >
				                 <span style={styles.legLine}></span>流程新增/修改
				               </legend>
				               <div style={styles.fieldBox}>
				               		<Row style={styles.formItem}>
			               			<Col xxs="6" s="2" l="2" style={styles.formLabel}>
						                    业务类型：
						            </Col>
						            <Col s="4" l="4">
						            	{this.props.location.state.type}
						            </Col>
									<Col xxs="6" s="2" l="2" style={styles.formLabel}>
										资方：
									</Col>
									<Col s="4" l="4">
										{this.props.location.state.lenderType}
									</Col>
									<Col xxs="6" s="2" l="2" style={styles.formLabel}>
										流程名称：
									</Col>
									<Col s="4" l="4">
										<IceFormBinder name="name">
											<Input style={{ width: '175px' }} placeholder="流程名称"  className="custom-input"/>
										</IceFormBinder>
										<IceFormError name="name" />
									</Col>						        
			               		</Row>
				               </div>
				            </div>
				        </IceFormBinderWrapper>
				        <div className="container">
                    	{/*渲染左边  */}
                    		<div className="container-left">
                        		<ul className='scrollFix'>
                        			{
                        				customMenuList && customMenuList.map((item, index) => {
                        					return (
                        						<li key={index}>
                        							<span>{item.name}</span>
                        						</li>	
                        					)
                        				})
                        			}
                        		</ul>
                    		</div>
                    		{/*右边*/}
                    		<div className="container-right">

                    		</div>
                  		</div>  
				 </IceContainer>     

    		</div>
    	)	
    }	
}


const styles = {
  container: {
    paddingBottom: 0,
  },
  legend: {
    marginLeft: 0,
    paddingLeft: '15px',
    paddingTop: '12px',
    paddingBottom: '12px',
    backgroundColor: '#fff',
    fontSize: '18px',
    fontWeight: '500',
    lineHeight: '25px',
  },
  legLine: {
    display: 'inline-block',
    zoom: 1,
    verticalAlign: 'top',
    marginRight: '12px',
    width: '4px',
    height: '25px',
    backgroundColor: '#ec9d00',
  },
  fieldBox: {
    margin: '0 15px',
    padding: '25px 0 0 0',
    borderTop: '1px solid #d8d8d8',
  },
  formItem: {
    height: '28px',
    lineHeight: '28px',
    marginBottom: '25px',
  },
  formLabel: {
    marginLeft: '85px',
    textAlign: 'right',
  },
  btns: {
    width: '90px',
    height: '32px',
    lineHeight: '32px',
    border: 'none',
    fontSize: '16px',
    borderRadius: 'none !important',
    color: '#fff',
    backgroundColor:'#ec9d00'
  },
  searchTable: {
    width: '1400px',
    margin: '25px',
  },
  pagination: {
    textAlign: 'left',
    paddingTop: '26px',
  },
};