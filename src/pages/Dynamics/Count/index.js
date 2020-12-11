import React, { Component } from 'react';
import NewsInfo from '@/pages/common';

class Count extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/*--市县动态--*/}
        <NewsInfo tag='137'/>
      </div>
    );
  }
}

export default Count;
