import {
  getArticleInfoList,
  addOrUpdateArticleInfo,
  removeArticleInfoById,
  changeArticleInfoStatus,
} from '@/services/articleInfo';

export default {
  namespace: 'articleInfo',
  state: {
    tableData: [],
    total: 0, // 页面数量
    pageNow: 1, // 当前的页码
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    * fetch({ payload }, { call, put, select }) {
      const { current, searchValues } = payload;
      const response = yield call(getArticleInfoList, payload);
      const tableData = response.data.map((item, index) => {
        const { cmarticle } = item;
        const tempObj = {
          imgUrl: [
            {
              uid: 0,
              url: cmarticle.imgUrl,
            }
          ],
        };

        return { ...cmarticle, ...tempObj };
      });

      const { total } = response;
      yield put({ type: 'save', payload: { tableData, total, pageNow: current} });
    },

    * addOrUpdate({ values, successCall, failedCall }, { call, put }) {
      const response = yield call(addOrUpdateArticleInfo, values);
      if (!response.result) {// 失败, 调用失败的回调函数
        failedCall(response.msg);
        return;
      }
      successCall(response.msg);
    },

    * remove({ values, successCall, failedCall }, { call, put }) {
      const response = yield call(removeArticleInfoById, values);
      if (!response.result) {// 失败, 调用失败的回调函数
        failedCall(response.msg);
        return;
      }
      successCall(response.msg);
    },

    * changeStatus({ values, successCall, failedCall }, { call, put }) {
      const response = yield call(changeArticleInfoStatus, values);
      if (!response.result) {// 失败, 调用失败的回调函数
        failedCall(response.msg);
        return;
      }
      successCall(response.msg);
    },
  },
};
