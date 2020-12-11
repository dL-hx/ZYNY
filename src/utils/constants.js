/*
包含一些常量值的模块
 */
const PAGE_SIZE = 10; // 每页显示的记录数
const BASE_IMG_URL = 'http://v02.upload.wiimedia.top/api/upload'; // 上传图片的基础路径
const BASE_IMG_App_Name = 'ZYHT'; // 上传图片的AppName , 可以任意指定

const ENABLE_COLOR = 'green';
const DISABLE_COLOR = 'red';

const plainConfig = [ // 字段的配置
  { key: 0, value: 0, type: 'INPUT', text: '文本框', weight: 1 },
  { key: 1, value: 1, type: 'IMAGE_UPLOAD', text: '图片框', weight: 2 },
  { key: 2, value: 2, type: 'DATE', text: '日期框', weight: 1 },
];

const TABLEFORM_WIDTH = 1000;

const OPTION_WEIGHT = 1;

const plainConfigSum = plainConfig.reduce((accumulator, currentValue) => {
  return accumulator + currentValue.weight;
}, OPTION_WEIGHT);

const matterConfig = [ // 事项的配置 ----> 分项管理(项目类别)
  { key: 0, value: 0, type: 'make', text: '生产档案' },
  { key: 1, value: 1, type: 'farm', text: '农事作业' },
];

const AuditingConfig = { // 审核的配置
  confirm: '已审核',
  cancel: '未审核',
};

const formItemLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

const offsetLayout = {
  wrapperCol: {
    xs: 24,
    sm: {
      span: 12,
      offset: 7,
    },
  },
};

const wangEditorLayout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 16,
  },
};

export {
  PAGE_SIZE,
  BASE_IMG_URL,
  BASE_IMG_App_Name,

  ENABLE_COLOR,
  DISABLE_COLOR,

  formItemLayout,
  offsetLayout,
  wangEditorLayout,

  plainConfig,
  plainConfigSum,

  matterConfig,
  OPTION_WEIGHT,
  TABLEFORM_WIDTH,

  /*--审核--*/
  AuditingConfig,
};
