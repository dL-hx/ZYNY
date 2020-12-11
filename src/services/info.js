import ajax from '@/utils/request';
import config from '@/utils/config';

const { reqNews } = config;
const AppId = { AppId: 138 };

export async function getNews(values) {
  return ajax(values.likeField?'/zxapi/SearchNewsList1':'/zxapi/getNewsByType1', {...AppId, ...values }, 'GET', reqNews);
}

export async function changeNewsStatus(values) {
  return ajax('/zxapi/NewsIsPublish', { ...AppId, ...values }, 'GET', reqNews);
}

export async function addOrUpdateNews(values) {
  return ajax(`/zjapi${values.articleid ? '/ZmtUpdate' : '/ZmtAddNews'}`, { ...AppId, ...values }, 'POST', reqNews);
}

export async function removeNewsById(values) {
  return ajax('/zxapi/del', values, 'GET',reqNews);
}
