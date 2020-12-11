import React, { Component } from 'react';
import ArticleInfo from '@/pages/articleInfo';

class MarketGraph extends Component {
  render() {
    return (
      <div>
        <ArticleInfo parentConfig={{atid: '66',types:'5' ,headerTitle:'行情监测'}}/>
      </div>
    );
  }
}

export default MarketGraph;
