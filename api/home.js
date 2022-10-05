import request from '../utils/request.js'
// 获取首页顶部TabBar数据
export const getLabelList = data=>request('getLabelList',data)
// 获取文章列表数据
export const getArticleList = data=>request('getArticleList',data,false)
