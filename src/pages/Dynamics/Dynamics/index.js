import React, { Component } from 'react';
import ArticleInfo from '@/pages/articleInfo';

class Dynamics extends Component {
  render() {
    return (
      <div>
        <ArticleInfo parentConfig={{atid: '64',types:'5' ,headerTitle:'农业动态'}}/>
      </div>
    );
  }
}

export default Dynamics;
