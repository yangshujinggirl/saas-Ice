import React, { PureComponent } from 'react';
import { Icon } from "@icedesign/base";
import cx from 'classnames';

export default class Title extends PureComponent {
  render() {
    let { text = "新增一行", disabled, hide, onClick = () => {}, style} = this.props;

    return (
      <div className={cx('pch-btnaddrow', {'disabled': disabled, 'hide': hide})} onClick={onClick} style={style}>
          <Icon type="add" size="small" />{text}
      </div>
    );
  }
}
