import React, { Component } from 'react';
import { Grid } from "@icedesign/base";
import { hashHistory } from 'react-router';
import { Title, PchTable, PchPagination, PchDialog } from 'components';
import './index.scss';

const { Row, Col } = Grid;

class DownLoad extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    this.props.actions.getDownLoadList(this.props.params.id)
  }

  render() {
    const { files=[] } = this.props.pageData;
    const contractType = this.props.location.query.type;
    const mod = (el) => {
      if(contractType == 2) {
        return  <div className="pic-wrap">
                  <img src={el.location} style={{'width':'100%'}}/>
                </div>
      } else {
        return <div className="text-wrap">
                  <p className="contract-name">{el.fileName}</p>
               </div>
      }
    }
    return (
      <div className="contractfile-down-load-page">
        <div className="contractfile-down-load-wrap">
          <Title title="下载列表" />
          <Row wrap className="down-load-list">
            {
              files.length>0 && files.map((el,index) => (
                <Col span={4} key={index}>
                  <div className="item">
                    {
                      mod(el)
                    }
                    <a href={el.location} download={el.fileName} target="_blank" className="down-btn">下载</a>
                  </div>
                </Col>
              ))
            }
          </Row>
        </div>
      </div>
    );
  }
}


export default DownLoad;
