import React, { Component } from 'react';
import NewsInfo from '@/pages/common';

class Forecast extends Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        {/*--预警预报--*/}
        <NewsInfo tag='38'/>
      </div>
    );
  }
}

export default Forecast;
