const config = {
  // reqhost: 'http://192.168.2.107:8018',
  reqhost: 'http://zhangyuan.wiimedia.top',

  // reqNews: 'http://192.168.2.69:9010', // 资讯信息
  reqNews: 'http://zyapp.wiimedia.top', // 资讯信息

};
const processEnv = { // 环境配置
  NODE_ENV: 'product',
  BASE_URL: config.reqhost,
};

export {
  processEnv,
};

export default config;


