import React, { Component, createRef } from 'react';
import { connect } from 'dva';
import { Button, Divider, Form, Input, message, Popconfirm, Table } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { formatTime, getDetailsPath } from '@/utils/utils';
import { AuditingConfig, PAGE_SIZE } from '@/utils/constants';
import styles from './index.less';
import router from 'umi/router';

import MyModal from '@/components/MyModal';
import AddButton from '@/components/MyButton/AddButton';
import MyStatus from '@/components/MyStatus/MyStatus';

const tags = [
  { appchannel: '12', channelid: '12', value: '农业农村部' },
  { appchannel: '20', channelid: '20', value: '畜牧兽医' },
  { appchannel: '21', channelid: '21', value: '农业机械' },
  { appchannel: '22', channelid: '22', value: '农业技术' },
  { appchannel: '46', channelid: '46', value: '全国联播' },
  { appchannel: '76', channelid: '76', value: '农业科技' },
  { appchannel: '77', channelid: '77', value: '农业气象' },
  { appchannel: '78', channelid: '78', value: '行业资讯' },
  { appchannel: '79', channelid: '79', value: '全国要闻' },
  { appchannel: '81', channelid: '81', value: '农业新闻' },
];

@connect(({ info, loading }) => ({
  info,
  loading: loading.effects['info/fetch'], // pro 框架特有的加载loading方式
}))
@Form.create()
class NewsInfo extends Component {

  state = {
    title: '',
    selectedRowKeys: [],
  };

  detailsPath = getDetailsPath();

  componentDidMount() {
    this.props.onRef && this.props.onRef(this); // 暴露ref 实例, 使得父组件可以直接调用方法
    this.requestList();
  }

  componentWillUnmount() {
    this.props.dispatch({ // 重置model 状态
      type: 'info/destory',
      payload: {
        tableData:[],
        pageNow:1,
        total:0
      }
    });
  }

  cleanSelectedRowKeys = () => {
    this.setState({
      selectedRowKeys: [],
    });
  };

  requestList = ({ pageNow = this.props.info.pageNow, searchValues = {} } = {}) => {
    const { tag } = this.props;
    this.props.dispatch({
      type: 'info/fetch',
      payload: { pageNow: pageNow, pageSize: PAGE_SIZE, tag: tag, ...searchValues },
    });
    this.cleanSelectedRowKeys();
  };

  handleSearch = () => {
    this.props.form.validateFields((err, searchValues) => {
      if (!err) {
        this.requestList({ searchValues,pageNow:1 });
      }
    });
  };

  handleRemove = (id) => {
    let { info: { tableData, pageNow } } = this.props; // 计算页面删除的时候删到最后一个的时候, 当前PageNow-1
    const tableLen = tableData.length;
    pageNow = tableLen % PAGE_SIZE === 1 ? pageNow - 1 : pageNow;

    this.props.dispatch({
      type: 'info/remove',
      values: { 'ArticleId': id },
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
    this.props.dispatch({
      type: 'info/changeStatus',
      values: {
        ArticleIds: this.state.selectedRowKeys.join(','),
        IsPublish: type === AuditingConfig.confirm ? 1 : 0,
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
    const { title, content } = record; // 内容

    this.setState({
      title,
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
    const { info: { tableData, total, pageNow }, form: { getFieldDecorator }, loading, hasOption = {}, tabComponent } = this.props;
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
        render: (text, record) => (text.length>10?text.substring(0,10)+'...':text || '/'),
      },
      {
        title: '作者',
        dataIndex: 'author',
        render: (text, record) => (text.length>10?text.substring(0,10)+'...':text || '/'),
      },
      {
        title: '创建时间',
        dataIndex: 'createtime',
        render: text => formatTime(text),
        // render: (text) => (
        //   <span>
        //       {text ? text.substring(0, 10) : '/'}
        //   </span>
        // ),
      },
      {
        title: '发布时间',
        dataIndex: 'updatetime',
        render: text => formatTime(text),
      },
      {
        title: '审核',
        dataIndex: 'ispublish',
        render: status => (<MyStatus status={status}/>),
      },

      {
        title: '操作',
        render: (text, record) => {
          return (
            <span>
               {hasOption.edit && <span>
                <a onClick={() => this.goToEditPage(record)}>编辑</a>
                <Divider type="vertical"/>
              </span>}
              <Popconfirm
                title="确定要删除这条信息吗？"
                okText="删除"
                cancelText="取消"
                onConfirm={() => this.handleRemove(record.articleid)}
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
              {getFieldDecorator('likeField', {})(<Input placeholder="请输入标题" allowClear/>)}
            </Form.Item>
            <Form.Item>
              <Button type="primary" onClick={this.handleSearch}>
                查询
              </Button>

              {
                hasOption.edit && <AddButton pathname={this.detailsPath}>
                  新增
                </AddButton>
              }

            </Form.Item>
          </Form>

          <Button type="primary" disabled={isDisabled} onClick={this.handleAuditing.bind(this, AuditingConfig.confirm)}>
            审核通过
          </Button>
          {/* eslint-disable-next-line react/jsx-no-bind */}
          <Button type="primary" disabled={isDisabled} onClick={this.handleAuditing.bind(this, AuditingConfig.cancel)}>
            审核撤销
          </Button>

          {!isDisabled && <div className={styles.nums}>已选{length}条</div>}
        </div>

        {
          tabComponent && <div className={styles.header}>
            {tabComponent}
          </div>
        }

        <div className={styles.container}>
          <div className={styles.nums}>为您找到相关结果约{total}个</div>

          <Table
            style={{ backgroundColor: '#fff' }}
            loading={loading}
            dataSource={tableData}
            columns={columns}
            rowKey="articleid"
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
          />
        </div>
      </PageHeaderWrapper>
    );
  }
}

export default NewsInfo;
