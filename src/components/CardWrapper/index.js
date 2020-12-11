import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'antd';

class CardWrapper extends Component {
  render() {
    const { children, title } = this.props;
    return (
      <Card>
        {title && <div style={{ fontSize: 17, fontWeight: 600, marginLeft: '2%', marginBottom: '2%' }}>{title}</div>}
        {children}
      </Card>
    );
  }
}

CardWrapper.propTypes = {
  title: PropTypes.string,
};


CardWrapper.defaultProps = {
  title: '',
};

export default CardWrapper;
