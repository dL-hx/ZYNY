import React, { Component } from 'react';
import NewsInfo from '@/pages/common';

class Department extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/*--省厅资讯--*/}
        <NewsInfo tag='136'/>
      </div>
    );
  }
}

export default Department;
