import request from '@/utils/request'

export const article = ({ channelId, timestamp, withTop }) => {
  return request({
    url: '/app/v1_1/articles',
    method: 'GET',
    params: {
      channel_id: channelId,
      timestamp,
      with_top: withTop
    }
  })
}

export const getArticle = articleId => {
  return request({
    url: `/app/v1_0/articles/${articleId}`,
    method: 'GET'
  })
}

export const likingArticle = articleId => {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}

export const unLikingArticle = articleId => {
  return request({
    url: `/app/v1_0/article/likings/${articleId}`,
    method: 'DELETE'
  })
}

export const likeArticle = articleId => {
  return request({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}

export const unLikeArticle = articleId => {
  return request({
    url: `/app/v1_0/article/dislikes/${articleId}`,
    method: 'DELETE'
  })
}
