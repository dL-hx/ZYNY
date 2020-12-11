import React, { Component } from 'react';
import NewsInfo from '@/pages/common';

class Contract extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/*--合同模板--*/}
        {/*<NewsInfo tag='36' hasOption={{ edit: true, add: true }}/>*/}
        <NewsInfo tag='36'/>
      </div>
    );
  }
}

export default Contract;
