import React, { Component } from 'react';
import { hashHistory } from 'react-router';
import { Title, PchTable, PchPagination } from 'components';
import {
   Form, Input, Button, Checkbox, Select, DatePicker, Switch, Radio, Grid, Field, Dialog,
   Table, Transfer, Feedback
} from '@icedesign/base';

import IceContainer from '@icedesign/container';
// import CellEditor from './CellEditor';
import ProductReq from '../../../reqs/ProductReq';
// form binder 详细用法请参见官方文档
import {
   FormBinderWrapper as IceFormBinderWrapper,
   FormBinder as IceFormBinder,
   FormError as IceFormError,
} from '@icedesign/form-binder';


import './addTwo.scss';
import CarType from './CarType';
import OrgType from './OrgType'
const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;



const list = [
   [{
      value: "1",
      label: "品牌",
   },
   {
      value: "2",
      label: "车系"
   },
   {
      value: "3",
      label: "车型"
   }], [{
      value: "10",
      label: "集团",
   },
   {
      value: "30",
      label: "渠道"
   },
   {
      value: "40",
      label: "厅店"
   }]
];

export default class addTwo extends Component {
   static displayName = 'addTwo';

   constructor(props) {
      super(props);
      this.state = {
         value: {
            productScopes: [],
            productScopes2: []
         },
         val:{},
         type: '1',
        //  name: undefined,
         type2: '10',
        //  name2: undefined,
      };
   }

   componentDidMount() {
   }
   onsubmit = () => {
      let { actions, params } = this.props;
      let { productScopes,productScopes2 } = this.state.value;
      let id = params.id;
      if (productScopes.length == 0) {
         return ProductReq.tipError('请选择品牌／车系／车型')
      }if(productScopes2.length == 0){
        return ProductReq.tipError('请选择集团／渠道／厅店')
      } else {
        productScopes=productScopes.concat(productScopes2)
        actions.productsave({productScopes:productScopes}, id);
      }
   }

   onFormChange = () => {
      this.setState({
         val
      })
   }
   /* 品牌、车系、车型*/
   onTypeChange = (value) => {
      this.setState({
         type: value
      });
      this.getCarList(value, this.state.val.name)
   }

   getCarList(type, name) {
      let { actions } = this.props;
      actions.addTwoList(type, name);
   }

   changeCarName(name) {
      let value = this.state.val;
      value.name = name;
      this.setState({ val: value });
   }

   /*
   集团、渠道、展厅
   */
   //选择集团、渠道、展厅
   onNestChange = (value) => {
      this.setState({
         type2: value
      });
      this.getGroupList(value, this.state.val.name2)
   }
   //集团、渠道、展厅数据展示
   getGroupList(type, name) {
      let { actions } = this.props;
      actions.getGroupList(type, name);
   }
   //查询内容
   changeGroupName(name) {
      let value = this.state.val;
      value.name2 = name;
      this.setState({ val: value });
   }

   render() {
      return (
         <IceFormBinderWrapper
            ref={(formRef) => {
               this.formRef = formRef;
            }}
            value={this.state.val}
            onChange={this.onFormChange}
         >
            <div>
               <IceContainer>
                  <Title title='按品牌/车系/车型' />
                  <div className="pch-form">
                     <Row wrap>
                        <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                           <RadioGroup
                              dataSource={list[0]}
                              defaultValue={'1'}
                              value={this.state.type}
                              onChange={this.onTypeChange}
                           />
                        </Col>
                     </Row>
                     <Row wrap className='marginBottom' >
                        <IceFormBinder
                           name="CarTypeBrand"
                        >
                           <CarType {...this.props} data={this.state.type} CarData={this.state.value} getCarList={this.getCarList.bind(this)} changeCarName={this.changeCarName.bind(this)} />
                        </IceFormBinder>
                        <IceFormError name="CarTypeBrand" />
                     </Row>
                  </div>

                  <Title title='按集团/渠道/厅店' />
                  <div className="pch-form">
                     <Row wrap>
                        <Col xxs={24} xs={12} l={8} style={styles.filterCol}>
                           <RadioGroup
                              dataSource={list[1]}
                              defaultValue={'10'}
                              value={this.state.type2}
                              onChange={this.onNestChange} 
                           />
                        </Col>
                     </Row>

                     <Row wrap className='marginBottom' >
                        <IceFormBinder
                           name="GroupChannel"
                        >
                           <OrgType {...this.props} type={this.state.type2} GroupData={this.state.value} getGroupList={this.getGroupList.bind(this)} changeGroupName={this.changeGroupName.bind(this)}/>
                        </IceFormBinder>
                        <IceFormError name="GroupChannel" />
                     </Row>
                     <div className="next-btn-box pch-form-buttons">
                        <Button type="secondary" size="large" onClick={this.onsubmit}>下一步</Button>
                     </div>
                  </div>

               </IceContainer>
            </div>
         </IceFormBinderWrapper>
      );
   }
}

const styles = {
   filterCol: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: '20px',
   },
   formItem: {
      height: '28px',
      lineHeight: '28px',
      marginBottom: '25px',
   },
   btns: {
      width: '90px',
      height: '30px',
      lineHeight: '30px',
      border: 'none',
      fontSize: '16px',
      borderRadius: 'none !important',
      background: '#ec9d00',
      color: '#fff',
      marginLeft: '20px'

   },
};
