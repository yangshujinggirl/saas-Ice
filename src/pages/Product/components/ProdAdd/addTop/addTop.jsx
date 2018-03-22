import React, { Component } from 'react';
import IceContainer from '@icedesign/container';

export default class AddTop extends Component {
  render() {
    return (
      // <IceContainer style={styles.container}>
        <div className="pch-breadcrumb">
          <span className="layui-breadcrumb">
            <a>平常金服</a>
            <span className="lay-separator">/</span>
            <a>产品管理</a>
            <span className="lay-separator">/</span>            
            <a>
              <cite>产品新增</cite>
            </a>
          </span>
        </div>
      // </IceContainer>
    );
  }
}

const styles = {
  container: {},
  category: {
    padding: '0 10px 15px',
    borderBottom: '1px solid #eee',
  },
  others: {
    padding: '15px 10px 0',
  },
  label: {
    color: '#333',
    fontSize: '14px',
    marginRight: '10px',
  },
  item: {
    marginRight: '10px',
  },
};
