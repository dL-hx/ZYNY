import ajax from '@/utils/request';

export async function getArticleInfoList(values) {
  return ajax('/api/CMArticle/GetCMArticleInfoList', {
      IsAdmin: 1,
      ...values,
    },
    'GET');
}

export async function addOrUpdateArticleInfo(values) {
  return ajax(`/api/CMArticle${values.aId ? '/Update' : '/Add'}`, values, 'POST');
}

export async function changeArticleInfoStatus(values) {
  return ajax(`/api/CMArticle/Audit?aid=${values.aId}&status=${values.status}`, values, 'POST');
}

export async function removeArticleInfoById(values) {
  return ajax(`/api/CMArticle/Delete?aid=${values.aId}`, {}, 'POST');
}




