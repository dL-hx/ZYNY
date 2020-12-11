import React, { Component } from 'react';
import NewsInfo from '@/pages/common';
import TagTabs from '@/components/TagTabs';

class DataLib extends Component {

  activeKey = 'appchannel';

  constructor(props) {
    super(props);

    this.state = {
      activeKeyValue: '144',
    };
  }

  getActiveKeyValue = (activeKeyValue) => {
    this.setState({
      activeKeyValue,
    }, () => {
      this.child.requestList({ pageNow: 1 });
    });
  };

  render() {
    const { activeKeyValue } = this.state;

    const tags = [
      { appchannel: '144', channelid: '144', value: '综合技术' },
      { appchannel: '145', channelid: '145', value: '蔬菜品种' },
      { appchannel: '146', channelid: '146', value: '栽培技术' },
      { appchannel: '147', channelid: '147', value: '品种简介' },
      { appchannel: '152', channelid: '152', value: '农业机械' },
      { appchannel: '153', channelid: '153', value: '沼气技术' },
      { appchannel: '155', channelid: '155', value: '农药知识' },
      { appchannel: '156', channelid: '156', value: '政策法规' },
      { appchannel: '157', channelid: '157', value: '有机农业' },
      { appchannel: '158', channelid: '158', value: '先进技术' },

      { appchannel: '148', channelid: '148', value: '马铃薯技术' },
      { appchannel: '149', channelid: '149', value: '食用菌技术' },
      { appchannel: '150', channelid: '150', value: '养殖业技术' },
      { appchannel: '151', channelid: '151', value: '林果业技术' },
      { appchannel: '154', channelid: '154', value: '病虫害防治' },
    ];

    const TagTabsComponent = () => (
      <TagTabs
        tags={tags}
        activeKeyValue={activeKeyValue}
        activeKey={this.activeKey}
        getActiveKeyValue={this.getActiveKeyValue}
      />
    );
    return (
      <div>
        {/*--技术数据库--*/}
        <NewsInfo
          onRef={(ref) => {
            this.child = ref;
          }}
          tabComponent={<TagTabsComponent/>}
          tag={activeKeyValue}
        />
      </div>
    );
  }
}

export default DataLib;
