import request from '../utils/request.js'
// 获取首页顶部TabBar数据
export const getLabelList = data=>request('getLabelList',data)
// 获取文章列表数据
export const getArticleList = data=>request('getArticleList',data,false)
// 取消或收藏文章
export const updateSaveLikes = data=>request('updateSaveLikes',data,false)
// 通过搜索获取文章
export const getArticleBySearch = data=>request('getArticleBySearch',data)
// 更新用户的label_ids
export const updateLabelIds = data=>request('updateLabelIds',data)
// 获取文章详情
export const getArticleDetail = data=>request('getArticleDetail',data)
// 更新文章评论
export const updateComment = data=>request('updateComment',data)
// 获取评论列表
export const getCommentList = data=>request('getCommentList',data)