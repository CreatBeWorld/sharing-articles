import request from '../utils/request.js'
export const userLogin = data=>request('userLogin',data)
export const getCode = data=>request('getCode',data)
export const getUserInfoById = data=>request('getUserInfoById',data,false)
// 取消关注/关注作者
export const switchFollowAuthor = data=>request('switchFollowAuthor',data,false)
// 文章点赞或取消点赞
export const switchThumbUp = data=>request('switchThumbUp',data,false)
// 获取用户收藏的文章
export const getMyArticles = data=>request('getMyArticles',data,false)
// 获取app应用的版本以及对应的下载链接
export const getCurrentVersion = data=>request('getVersionInfo',data,false)
// 提交反馈意见
export const addFeedback= data=>request('addFeedback',data,false)
// 修改用户头像
export const changeAvatar= data=>request('changeAvatar',data,false)


