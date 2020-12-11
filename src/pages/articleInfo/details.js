import React, { Component, createRef } from 'react';
import { connect } from 'dva';
import { Button, Form, Input, message } from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { getAddOrUpdateText ,getIndexPath} from '@/utils/utils';
import { formItemLayout, offsetLayout, wangEditorLayout } from '@/utils/constants';
import CardWrapper from '@/components/CardWrapper';
import router from 'umi/router';
import WangEditor from '@/components/MyWangeditor';
import PicturesWall from '@/components/PicturesWall';

@connect(({ articleInfo, loading }) => ({
  articleInfo,
  loading: loading.effects['articleInfo/addOrUpdate'], // pro 框架特有的加载loading方式
}))
@Form.create()
class Details extends Component {

  details = {};

  constructor(props) {
    super(props);
    this.contentRef = createRef(); // 描述
  }

  componentDidMount() {
    const { details } = this.props.location.state; // 如果是添加空值, 否则有值
    this.isUpdate = !!details; // 保存是否是更新的标识

    // 保存(如果没有, 保存是{})
    if (this.isUpdate) {
      const { aId, title, content, author, source, tag, link, imgUrl, description } = details;
      this.details = {
        aId,
      };
      this.props.form.setFieldsValue({
        title, // 标题
        author, // 作者
        source, // 来源
        description,// 描述
        content, // 内容
        tag,
        link,
        imgUrl,
      });

      this.contentRef.current.editor.txt.html(content);// 因为是Dom的操作, 使用 .txt.html 提供的方法设置值
    }
  }

  getImgStr = (values) => { // 计算ImgUrlStr
    const imgUrlElement = values.imgUrl[0];
    if (this.isUpdate) {
      return imgUrlElement.url;
    }
    return (imgUrlElement.response.url.indexOf('http://') === -1 ? 'http://' : '') + imgUrlElement.response.url;
  };

  handleSubmit = e => {
    e.preventDefault();
    const that = this;
    that.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { dispatch } = this.props;
        values.articleresource = [];
        values.imgUrl = that.getImgStr(values);
        values.images = values.imgUrl;
        values.seoKeyword = values.tag;

        // 如果是更新, 需要添加userid
        if (that.isUpdate) {
          values.aId = that.details.aId;
        }
        const { parentConfig:{headerTitle, ...rest} } = that.props.location.state;
        // 2. 调用接口请求函数去添加/更新
        dispatch({
          type: 'articleInfo/addOrUpdate',
          values:{
            ...rest,
            ...values
          },
          successCall: (msg) => {
            message.success(msg);
            router.push(getIndexPath()) // 返回上一级页面
          },
          failedCall: (msg) => {
            message.warn(msg);
          },
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator, setFieldsValue },
      loading,
    } = this.props;
    const { isUpdate } = this;
    const { parentConfig } = this.props.location.state;
    return (
      <PageHeaderWrapper title={`${parentConfig.headerTitle}-${getAddOrUpdateText(isUpdate)}`}>
        <CardWrapper>
          <Form {...formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label='标题'>
              {getFieldDecorator('title', {
                rules: [
                  { required: true, message: '请输入标题' },
                ],
              })(<Input placeholder="请输入标题" allowClear/>)}
            </Form.Item>
            <Form.Item label='作者'>
              {getFieldDecorator('author', {})(<Input placeholder="请输入作者" allowClear/>)}
            </Form.Item>

            <Form.Item label="来源">
              {getFieldDecorator('source', {
                rules: [{ required: true, message: '请输入来源' }],
              })
              (
                <Input placeholder="请输入来源" allowClear/>,
              )}
            </Form.Item>

            <Form.Item label="描述">
              {getFieldDecorator('description')
              (
                <Input placeholder="请输入描述" allowClear/>,
              )}
            </Form.Item>

            <Form.Item label="标签">
              {getFieldDecorator('tag', {
                rules: [{ required: true, message: '请输入标签' }],
              })
              (
                <Input placeholder="请输入来源" allowClear/>,
              )}
            </Form.Item>

            <Form.Item label="链接">
              {getFieldDecorator('link', {
                rules: [{ required: true, message: '请输入来源链接' }],
              })
              (
                <Input placeholder="请输入链接" allowClear/>,
              )}
            </Form.Item>

            <Form.Item label="图片">
              {getFieldDecorator('imgUrl', {
                rules: [{ required: true, message: '请上传图片' }],
              })(
                <PicturesWall
                  numberOfLimit={1}
                  handleFileChange={(fileList) => {
                    setFieldsValue({ // 通过 this.props.form.setFieldsValue 为第三方组件设置值
                      imgUrl: fileList,
                    });
                  }}
                />)}
            </Form.Item>

            <Form.Item label="内容" {...wangEditorLayout}>
              {getFieldDecorator('content', {
                rules: [{ required: true, message: '请输入内容' }],
              })(
                <WangEditor
                  ref={this.contentRef}
                  onChange={(name, html) => {
                    setFieldsValue({ // 通过 this.props.form.setFieldsValue 为第三方组件设置值
                      'content': html,
                    });
                  }}
                />,
              )}
            </Form.Item>

            <Form.Item {...offsetLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>保存</Button>
            </Form.Item>

          </Form>
        </CardWrapper>
      </PageHeaderWrapper>
    );
  }
}

export default Details;
