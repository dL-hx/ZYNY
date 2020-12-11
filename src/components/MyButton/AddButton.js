import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import router from 'umi/router';

import { connect } from 'dva';

@connect(({ login }) => ({
  isAdmin: login.isAdmin,
}))
class AddButton extends Component {
  addClick = () => {
    const { pathname, parentConfig } = this.props;
    router.push({ pathname, state: { parentConfig} });
  };

  render() {// 不是管理员展示新增按钮
    const { children, type, isShow, isAdmin } = this.props;
    if (isShow) {
      return <Button
        type={type}
        onClick={this.addClick}
        style={{ marginLeft: 20 }}
      >
        {children}
      </Button>;
    }
    return (
      isAdmin || <Button
        type={type}
        onClick={this.addClick}
        style={{ marginLeft: 20 }}
      >
        {children}
      </Button>
    );
  }
}

AddButton.defaultProps = {
  children: '新增',
  type: 'primary',
  isShow: false,
};

AddButton.propTypes = {
  children: PropTypes.string,
  type: PropTypes.string,
  isShow: PropTypes.bool,
  pathname: PropTypes.string.isRequired,
};

export default AddButton;

