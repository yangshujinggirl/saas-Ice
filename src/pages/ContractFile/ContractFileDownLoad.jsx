import React, { Component } from 'react';
import { Grid } from "@icedesign/base";
import DownLoad from './components/DownLoad';
import { Title, PchTable, PchPagination, PchDialog } from 'components';

const { Row, Col } = Grid;

class ContractFileDownLoad extends Component {

  constructor(props) {
    super(props);
  }
  render() {

    return (
      <div className="contractfile-down-load-page">
        <DownLoad {...this.props}/>
      </div>
    );
  }
}
export default ContractFileDownLoad;
