import React, { Component } from 'react';
import {
  Form,
  Input,
  Button,
  Checkbox,
  Select,
  DatePicker,
  Switch,
  Radio,
  Grid,
  Field,
  Table,
} from '@icedesign/base';

import IceContainer from '@icedesign/container';
// import AddTop from './addTop/addTop'
import AddOne from './addOne/addOne';
import AddTwo from './addTwo/addTwo';
import AddThree from './addThree/addThree'
import SearchEditer from '../ProdSearch/searchEditer/searchEditer'
//测试测试
import Detail from '../ProdAddDetail/ProdAddDetail'

import {
  FormBinderWrapper as IceFormBinderWrapper,
  FormBinder as IceFormBinder,
  FormError as IceFormError,
} from '@icedesign/form-binder';


import './ProdAdd.scss';
const { Row, Col } = Grid;
const { Option } = Select;
const { Group: RadioGroup } = Radio;

const { MonthPicker, YearPicker, RangePicker } = DatePicker;
export default class ProdAdd extends Component {
  static displayName = 'Filter';

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
 
  render() {
    console.log(this.props.data);
    return (
      <IceFormBinderWrapper
        value={this.props.value}
        onChange={this.props.onChange}
      >
        <div>
          <IceContainer>
            <AddOne />
            {/* <AddTwo /> */}
            {/* <AddThree/> */}
          </IceContainer>
        </div>
      </IceFormBinderWrapper>
    );
  }
}

const styles = {
 
};
