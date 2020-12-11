import moment from 'moment';
import React from 'react';
import { Select } from 'antd';

import nzh from 'nzh/cn';
import { parse, stringify } from 'qs';
import { plainConfig, plainConfigSum, TABLEFORM_WIDTH } from '@/utils/constants';


export function jsonString(values) {
  if (values == '') {
    return '[]';
  }
  return JSON.stringify(values);
}

export function stringJson(values) {
  if (values == '') {
    return [];
  }
  return JSON.parse(values);
}

export function getImgUrlList(fileList) { // 将json 格式的的图片JSON 转换为 url 数组列表
  const imgUrlList = [];
  if (fileList.length != 0) {
    fileList.map(function(item, key) {
      if (item.response) {
        imgUrlList.push(`http://${item.response.url}`);
      } else {
        imgUrlList.push(item.url);
      }
    });
    return JSON.stringify(imgUrlList);
  }
  return '[]';
}

export function getImgUrlList1(fileList) { // 将json 格式的的图片JSON 转换为 url 数组列表
  const imgUrlList = [];
  if (fileList.length != 0) {
    fileList.map(function(item, key) {
      if (item.response) {
        imgUrlList.push(`http://${item.response.url}`);
      } else {
        imgUrlList.push(item.url);
      }
    });
    return imgUrlList;
  }
  return '';
}

export function setImgUrlList(str) { // 接口返回的url 数组, 转换为 json 格式, 放入图片框
  const arr = [];
  if (str && str.length != 0) {
    const sArr = JSON.parse(str);
    sArr.forEach((item, index) => {
      const tempObj = {};
      tempObj.uid = index;
      tempObj.url = item;
      arr.push(tempObj);
    });
  }
  return arr;
}

export function fixedSelectList(data, text, value) {
  return data.map((item, index) => {
    const obj = {};
    obj.key = index;
    obj.text = item[text];
    obj.value = item[value];
    return obj;
  });
}

// sourceArr: 利用循环将数据拼接为树结构
// config: 字段的配置[{}]
/*
*
*         item.forEach((v, k) => {// forEach 没有返回值, map 的返回值是一个数组
          const { inputItemList ,type,...rest } = v;
          const newObj = {
            key: k,
            title: inputItemSetName,
            controlType: config[controlType].type,
            type: matterConfig[type].type,
            ...rest,
          };
          tempArr.push(newObj);
        });
* */
export function getProcessData(sourceArr) {// 深拷贝
  return sourceArr.map((values, index) => {
    let tempObj = {};
    for (const k in values) {
      const item = values[k];
      if (item instanceof Array) {
        tempObj[k] = [...item];
      } else if (item instanceof Object) {
        tempObj = Object.assign({}, item);
        tempObj.key = index;
      }
    }
    return tempObj;
  });
}

// sortTypes?: 'ascend'|'descend'|'default'
export function getListSortedList(arr, sortTypes = 'ascend', params = 'orders') {
  if (sortTypes === 'descend') { // 下降
    return arr.sort((a, b) => b[params] - a[params]);
  }
  if (sortTypes === 'ascend') {// 上升
    return arr.sort((a, b) => a[params] - b[params]);
  }

  return arr.sort((a, b) => a[params]);
}

export function getConfigWidth(optionWeight) {
  return (optionWeight / plainConfigSum) * TABLEFORM_WIDTH;// 权重 :按权分配
}

export function getAllColumns(data) { // 得到管理的columns项
  let newArr = [];
  if (data && data.length > 0) {
    newArr = data.map((item, index) => {
      const { name, id, fieldKey, orders, controlType } = item;
      const configElement = plainConfig[controlType]; // 配置的控件元素
      return {
        title: name,
        // dataIndex: id,
        id,
        dataIndex: fieldKey,
        orders,
        controlType: configElement.type,
        width: getConfigWidth(configElement.weight),
        editable: true,
      };
    });
  }
  return newArr;
}

// sourceArr: 接口返回的级联框数据
// idx?: number|0 sourceArr的起始位置
// getCascaderOptions(request.options, 0)

export function getCascaderOptions(sourceArr, idx = 0) {
  const arr = [];
  const getOption = (sourceArr, newArr, idx) => {    // 遍历子树, 将结果存入newArr中
    const tempObj = {};
    if (idx >= sourceArr.length) {
      return;
    }
    const parentItems = sourceArr[idx];
    for (const k in parentItems) {
      if (parentItems.hasOwnProperty(k)) {
        const childItems = parentItems[k];
        if (childItems instanceof Array) {
          const tempArr = [];
          for (let i = 0; i < childItems.length; i++) {
            const childItem = childItems[i];
            const newObj = {
              value: childItem.id,
              label: childItem.name,
            };
            tempArr.push(newObj);
          }

          if (tempArr.length > 0) {
            tempObj.children = tempArr;
          }
        } else if (childItems instanceof Object) {
          tempObj.value = childItems.id;
          tempObj.label = childItems.name;
        }
      }
    }
    newArr.push(tempObj);
    getOption(sourceArr, newArr, idx + 1);
  };
  getOption(sourceArr, arr, idx);
  return arr;
}

export function calMineListInfo(obj, columns, key, title, type = 'TEXT') { // 微官网渲染方法
  Object.keys(obj).map(idx => {
    if (obj[idx]) {
      const objElText = obj[idx];
      if (idx === key) {
        if (type == 'TEXT') {
          columns.push({
            title,
            content: objElText,
          });
        } else if (type === 'RICH_TEXT') {
          columns.push({
            title,
            content: objElText.replace(/<[^>]*>|&nbsp;/g, '').slice(0, 250),
          });
        } else if (type === 'URL_LIST') {
          columns.push({
            img_list: stringJson(objElText),
          });
        } else if (type === 'VIDEO') {
          columns.push({
            title,
            video_src: objElText,
          });
        }
      }
    }
  });
}

export function fixedZero(val) {
  return val * 1 < 10 ? `0${val}` : val;
}

export function getAddOrUpdateText(isUpdate) {
  if (typeof isUpdate !== 'undefined' && typeof isUpdate !== 'boolean') {  // variable isn't a boolean and also isn't a undefined
    throw new Error('isUpdate must be either true or false if provided.');
  }

  return isUpdate ? '编辑' : '新增';
}


export function getTimeDistance(type) {
  const now = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  if (type === 'today') {
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);
    return [moment(now), moment(now.getTime() + (oneDay - 1000))];
  }

  if (type === 'week') {
    let day = now.getDay();
    now.setHours(0);
    now.setMinutes(0);
    now.setSeconds(0);

    if (day === 0) {
      day = 6;
    } else {
      day -= 1;
    }

    const beginTime = now.getTime() - day * oneDay;

    return [moment(beginTime), moment(beginTime + (7 * oneDay - 1000))];
  }

  if (type === 'month') {
    const year = now.getFullYear();
    const month = now.getMonth();
    const nextDate = moment(now).add(1, 'months');
    const nextYear = nextDate.year();
    const nextMonth = nextDate.month();

    return [
      moment(`${year}-${fixedZero(month + 1)}-01 00:00:00`),
      moment(moment(`${nextYear}-${fixedZero(nextMonth + 1)}-01 00:00:00`).valueOf() - 1000),
    ];
  }

  const year = now.getFullYear();
  return [moment(`${year}-01-01 00:00:00`), moment(`${year}-12-31 23:59:59`)];
}

export function getPlainNode(nodeList, parentPath = '') {
  const arr = [];
  nodeList.forEach(node => {
    const item = node;
    item.path = `${parentPath}/${item.path || ''}`.replace(/\/+/g, '/');
    item.exact = true;
    if (item.children && !item.component) {
      arr.push(...getPlainNode(item.children, item.path));
    } else {
      if (item.children && item.component) {
        item.exact = false;
      }
      arr.push(item);
    }
  });
  return arr;
}

export function digitUppercase(n) {
  return nzh.toMoney(n);
}

function getRelation(str1, str2) {
  if (str1 === str2) {
    console.warn('Two path are equal!'); // eslint-disable-line
  }
  const arr1 = str1.split('/');
  const arr2 = str2.split('/');
  if (arr2.every((item, index) => item === arr1[index])) {
    return 1;
  }
  if (arr1.every((item, index) => item === arr2[index])) {
    return 2;
  }
  return 3;
}

function getRenderArr(routes) {
  let renderArr = [];
  renderArr.push(routes[0]);
  for (let i = 1; i < routes.length; i += 1) {
    // 去重
    renderArr = renderArr.filter(item => getRelation(item, routes[i]) !== 1);
    // 是否包含
    const isAdd = renderArr.every(item => getRelation(item, routes[i]) === 3);
    if (isAdd) {
      renderArr.push(routes[i]);
    }
  }
  return renderArr;
}

/**
 * Get router routing configuration
 * { path:{name,...param}}=>Array<{name,path ...param}>
 * @param {string} path
 * @param {routerData} routerData
 */
export function getRoutes(path, routerData) {
  let routes = Object.keys(routerData).filter(
    routePath => routePath.indexOf(path) === 0 && routePath !== path,
  );
  // Replace path to '' eg. path='user' /user/name => name
  routes = routes.map(item => item.replace(path, ''));
  // Get the route to be rendered to remove the deep rendering
  const renderArr = getRenderArr(routes);
  // Conversion and stitching parameters
  const renderRoutes = renderArr.map(item => {
    const exact = !routes.some(route => route !== item && getRelation(route, item) === 1);
    return {
      exact,
      ...routerData[`${path}${item}`],
      key: `${path}${item}`,
      path: `${path}${item}`,
    };
  });
  return renderRoutes;
}

export function getPageQuery() {
  return parse(window.location.href.split('?')[1]);
}

/**
 * 获取详情页面跳转路径
 */
export function getDetailsPath() {
  const endNode = window.location.href.split('/').pop(); // 获取url 中的根节点
  return `./${endNode}/details`;
}

/**
 * 获取主页页面跳转路径
 */
export function getIndexPath() {
  const endNode = window.location.pathname.replace('/details',''); // 获取url 中的上一级节点
  return `${endNode}`;
}


export function getQueryPath(path = '', query = {}) {
  const search = stringify(query);
  if (search.length) {
    return `${path}?${search}`;
  }
  return path;
}

/**
 * 判断一个值是不是moment 对象
 */
export function isMoment(obj) {
  return moment.isMoment(obj);
}

/**
 * 判断一个值是不是数组
 */
export function isArray(arr) {
  return Array.isArray(arr);
}

/**
 * 判断一个值是不是空数组
 */
export function isEmptyArray(value) {
  return (Array.isArray(value) && value.length === 0) || (Object.prototype.isPrototypeOf(value) && Object.keys(value).length === 0);
}

/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export function isUrl(path) {
  return reg.test(path);
}

export function renderSelectOptions(options, valueText = 'value') {
  const { Option } = Select;
  return options && options.map((item) => {
    return <Option key={item.key} value={item[valueText]}>{item.text}</Option>;
  });
}

export function formatTime(text) {
  return moment(text).format('YYYY-MM-DD')
}

export function formatWan(val) {
  const v = val * 1;
  if (!v) return '';

  let result = val;
  if (val > 10000) {
    result = Math.floor(val / 10000);
    result = (
      <span>
        {result}
        <span
          style={{
            position: 'relative',
            top: -2,
            fontSize: 14,
            fontStyle: 'normal',
            marginLeft: 2,
          }}
        >
          万
        </span>
      </span>
    );
  }
  return result;
}

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export function isAntdPro() {
  return window.location.hostname === 'preview.pro.ant.design';
}

export const importCDN = (url, name) =>
  new Promise(resolve => {
    const dom = document.createElement('script');
    dom.src = url;
    dom.type = 'text/javascript';
    dom.onload = () => {
      resolve(window[name]);
    };
    document.head.appendChild(dom);
  });

