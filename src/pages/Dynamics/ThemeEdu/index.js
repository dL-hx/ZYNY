import React, { Component } from 'react';
import ArticleInfo from '@/pages/articleInfo';

class ThemeEdu extends Component {

  render() {
    return (
      <div>
        <ArticleInfo parentConfig={{atid: '65',types:'5' ,headerTitle:'主题教育'}}/>
      </div>
    );
  }
}

export default ThemeEdu;
