import React, { Component } from 'react';
import NewsInfo from '@/pages/common';

class Policy extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/*--农业政策--*/}
        <NewsInfo tag='156'/>
      </div>
    );
  }
}

export default Policy;
