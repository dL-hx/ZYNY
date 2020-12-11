import React, { Component } from 'react';
import NewsInfo from '@/pages/common';

class Column extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/*--普法专栏--*/}
        <NewsInfo tag='156'/>
      </div>
    );
  }
}

export default Column;
