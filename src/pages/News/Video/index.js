import React, { Component } from 'react';
import ArticleInfo from '@/pages/articleInfo';

class VideoInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <ArticleInfo parentConfig={{atid: '14',types:'5' ,headerTitle:'技术视频'}} hasVideo />
      </div>
    );
  }
}

export default VideoInfo;
/*
import React, { Component } from 'react';
import { connect } from 'dva';
import { Button, Divider, Form, Input, message, Popconfirm, Table, Tag } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatTime, getDetailsPath } from '@/utils/utils';
import { AuditingConfig, DISABLE_COLOR, ENABLE_COLOR, PAGE_SIZE } from '@/utils/constants';
import styles from './index.less';
import router from 'umi/router';

import MyModal from '@/components/MyModal';
import AddButton from '@/components/MyButton/AddButton';
import MyStatus from '@/components/MyStatus/MyStatus';
import { Video } from '@/components/MyMedia';
import CommonMethod from '@/utils/method';

@connect(({ video, loading }) => ({
  video,
  loading: loading.effects['video/fetch'], // pro 框架特有的加载loading方式
}))
@Form.create()
class VideoInfo extends Component {

  state = {
    title: '',
    link: '',
    selectedRowKeys: [],
  };

  detailsPath = getDetailsPath();

  componentDidMount() {
    this.requestList();
  }

  componentWillUnmount() {
    this.props.dispatch({ // 重置model 状态
      type: 'video/destory',
    });
  }

  cleanSelectedRowKeys = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  requestList = ({ pageNow = this.props.video.pageNow, searchValues = {} } = {}) => {
    this.props.dispatch({
      type: 'video/fetch',
      payload: { current: pageNow, pageSize: PAGE_SIZE, ...searchValues },
    });

    this.cleanSelectedRowKeys();
  };

  handleSearch = () => {
    this.props.form.validateFields((err, searchValues) => {
      if (!err) {
        this.requestList({ searchValues ,pageNow:1});
      }
    });
  };

  handleRemove = (id) => {
    let { video: { tableData, pageNow } } = this.props; // 计算页面删除的时候删到最后一个的时候, 当前PageNow-1
    const tableLen = tableData.length;
    pageNow = tableLen % PAGE_SIZE === 1 ? pageNow - 1 : pageNow;

    this.props.dispatch({
      type: 'video/remove',
      values: { 'aid': id },
      successCall: (msg) => {
        message.success(msg);
        this.requestList({ pageNow });
      },
      failedCall: (msg) => {
        message.warn(msg);
      },
    });
  };

  handlePageChange = pageNow => {
    this.requestList({ pageNow });
  };

  handleAuditing = (type) => {
    const { selectedRowKeys } = this.state;
    this.props.dispatch({
      type: 'video/changeStatus',
      values: {
        aid: selectedRowKeys.join(','),
        status: type === AuditingConfig.confirm ? 1 : 0,
      },
      successCall: (msg) => {
        message.success(msg);
        this.requestList();
      },
      failedCall: (msg) => {
        // console.log(error);
        message.warn(msg);
      },
    });
  };

  showModal = (record) => {
    const { title, content, link } = record; // 内容
    this.setState({
      title,
      link,
    });

    this.myModal.setContentText(content); // 设置子组件内容
    this.myModal.handleOk(); // 触发Ok 方法
  };

  onSelectChange = selectedRowKeys => {
    this.setState({ selectedRowKeys });
  };

  goToEditPage = details => {
    router.push({ pathname: this.detailsPath, state: { details } });
  };

  render() {
    const { video: { tableData, total, pageNow }, form: { getFieldDecorator }, loading } = this.props;
    const { title, selectedRowKeys } = this.state;

    const { length } = selectedRowKeys;
    const isDisabled = length === 0;

    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
    };

    const columns = [
      {
        title: '标题',
        dataIndex: 'title',
        width: 300,
        render: (text, record) => (<a onClick={() => this.showModal(record)}>{text}</a>),
      },
      {
        title: '来源',
        dataIndex: 'source',
        render: (text, record) => (text.length > 10 ? text.substring(0, 10) + '...' : text || '/'),
      },
      {
        title: '作者',
        dataIndex: 'author',
        render: (text, record) => (text.length > 10 ? text.substring(0, 10) + '...' : text || '/'),
      },
      {
        title: '创建时间',
        dataIndex: 'addTime',
        render: text => formatTime(text),
      },
      {
        title: '审核时间',
        dataIndex: 'checkTime',
        render: text => text && formatTime(text),
      },
      {
        title: '审核',
        dataIndex: 'strStatus',
        render: status => {
          const color = status === AuditingConfig.confirm ? ENABLE_COLOR : DISABLE_COLOR;
          return (
            <Tag color={color} key={status}>
              {status}
            </Tag>
          );
        },
      },

      {
        title: '操作',
        render: (text, record) => {
          return (
            <span>
                <a onClick={() => this.goToEditPage(record)}>编辑</a>
                <Divider type="vertical"/>
              <Popconfirm
                title="确定要删除这条信息吗？"
                okText="删除"
                cancelText="取消"
                onConfirm={() => this.handleRemove(record.aId)}
              >
                <a>删除</a>
              </Popconfirm>
            </span>);
        },
      },
    ];

    return (
      <PageHeaderWrapper>
        <div className={styles['btn-option-section']}>
          <Form layout="inline">
            <Form.Item>
              {getFieldDecorator('title', {})(<Input placeholder="请输入标题" allowClear/>)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.handleSearch}>
                查询
              </Button>

              <AddButton pathname={this.detailsPath}>
                新增
              </AddButton>

            </Form.Item>
          </Form>

          <Button type="primary" disabled={isDisabled} onClick={this.handleAuditing.bind(this, AuditingConfig.confirm)}>
            审核通过
          </Button>
          {/!* eslint-disable-next-line react/jsx-no-bind *!/}
          <Button type="primary" disabled={isDisabled} onClick={this.handleAuditing.bind(this, AuditingConfig.cancel)}>
            审核撤销
          </Button>

          {!isDisabled && <div className={styles.nums}>已选{length}条</div>}
        </div>

        <div className={styles.container}>
          <div className={styles.nums}>为您找到相关结果约{total}个</div>

          <Table
            style={{ backgroundColor: '#fff' }}
            loading={loading}
            dataSource={tableData}
            columns={columns}
            rowKey="aId"
            rowSelection={rowSelection}
            pagination={{
              total,
              current: pageNow,
              defaultPageSize: PAGE_SIZE,
              showQuickJumper: true,
              onChange: this.handlePageChange,
            }}
          />

          <MyModal
            title={title}
            ref={(child) => {
              this.myModal = child;
            }}
          >
            <Video src={this.state.link}/>
          </MyModal>
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default VideoInfo;
*/
