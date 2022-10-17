import request from '../utils/request.js'
// 获取收藏的文章
export const getFollowedArticles = (data,isShowLoading)=>request('getFollowedArticles',data,isShowLoading)
export const getFollowedAuthors = (data,isShowLoading)=>request('getFollowedAuthors',data,isShowLoading)