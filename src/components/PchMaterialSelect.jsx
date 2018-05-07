import React, {Component} from 'react';
import { Select } from "@icedesign/base";

export default class PchMaterialSelect extends Component {
  state = {
    dataSource: []
  };

  render() {
    return (
      <div className="demo-ctl">
        <Select
          showSearch
          dataSource={this.state.dataSource}
          onSearch={this.onSearch}
          filterLocal={false}
          className="temp"
        />
      </div>
    );
  }

  onSearch = value => {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      // jsonp(
      //   `https://suggest.taobao.com/sug?code=utf-8&q=${value}`,
      //   (err, data) => {
      //     const dataSource = data.result.map(item => {
      //       return {
      //         label: item[0],
      //         value: item[1]
      //       };
      //     });
      //     this.setState({
      //       dataSource
      //     });
      //   }
      // );
    }, 100);
  };
}
