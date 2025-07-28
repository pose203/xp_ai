import request from './request';

// 获取文章列表
export const getArticleList = (params) => {
  return request({
    url: '/articles',
    method: 'get',
    params
  });
};

// 获取文章详情
export const getArticleDetail = (id) => {
  return request({
    url: `/articles/${id}`,
    method: 'get'
  });
};

// 点赞文章
export const likeArticle = (id) => {
  return request({
    url: `/articles/${id}/like`,
    method: 'post'
  });
};

// 获取文章评论
export const getArticleComments = (id, params) => {
  return request({
    url: `/articles/${id}/comments`,
    method: 'get',
    params
  });
}; 