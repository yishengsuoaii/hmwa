<template>
  <div class="article-container">
    <van-nav-bar
    class="search"
      fixed
      left-arrow
      @click-left="$router.back()"
      title="文章详情"
    ></van-nav-bar>
    <van-loading class="article-loading" v-if="loading"  type="spinner" color="#1989fa"/>
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <van-image round width="2rem" height="2rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <p class="time">{{article.pubdate|rTime}}</p>
        </div>
        <van-button
          round
          size="small"
          :type="article.is_followed?'primary':'warning'"
          @click="setAttention"
        >{{article.is_followed?'已关注':'+ 关注'}}</van-button>
      </div>
      <div class="content" v-html="article.content"></div>
      <div class="zan">
        <van-button
          round
          size="small"
          hairline
          :type="article.attitude===1?'primary':'default'"
          plain icon="good-job-o"
          @click="setLikingArticle"
        >点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button
          round
          size="small"
          hairline
          :type="article.attitude===0?'danger':'default'"
          plain icon="delete"
          @click="setLikeArticle"
        >不喜欢</van-button>
      </div>
    </div>
    <div class="error" v-else>
      <p>网络超时，点击 <a href="#" @click.prevent="loadArticle">刷新</a> 试一试。</p>
    </div>
    <children-a :articleId="$route.params.articleId"/>
  </div>
</template>

<script>
import { attention, unAttention } from '@/api/user'
import { getArticle,
  likingArticle,
  unLikingArticle,
  likeArticle,
  unLikeArticle } from '@/api/articles'
import childrenA from '@/components/article/chia'

export default {
  name: 'Article',
  data () {
    return {
      loading: false,
      article: {}
    }
  },
  components: {
    childrenA
  },
  methods: {
    async  loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticle(this.$route.params.articleId)
        this.article = data.data
        console.log(data)
      } catch (error) {
        console.log(error)
      }
      this.loading = false
    },
    async setAttention () {
      try {
        if (this.article.is_followed) {
          await unAttention(this.article.aut_id)
          this.article.is_followed = false
        } else {
          await attention(this.article.aut_id)
          this.article.is_followed = true
        }
      } catch (error) {
        this.$toast({
          message: '不能关注自己',
          icon: 'Liking-o'
        })
      }
    },
    async setLikingArticle () {
      if (this.article.attitude === 1) {
        await unLikingArticle(this.article.art_id.toString())
        this.article.attitude = -1
      } else {
        await likingArticle(this.article.art_id.toString())
        this.article.attitude = 1
      }
    },
    async setLikeArticle () {
      if (this.article.attitude === 0) {
        await unLikeArticle(this.article.art_id.toString())
        this.article.attitude = -1
      } else {
        await likeArticle(this.article.art_id.toString())
        this.article.attitude = 0
      }
    }

  },
  created () {
    this.loadArticle()
  }
}
</script>

<style scoped lang='less'>
.article-container{
  position: absolute;
  left: 0;
  top: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
}
.article-loading {
  padding-top: 100px;
  text-align: center;
}
.error{
  padding-top: 100px;
  text-align: center;
}
.detail {
  padding: 50px 10px;
  .title {
    font-size: 16px;
  }
  .zan{
    text-align: center;
  }
  .author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
  }
}
.search .van-icon {
    color: red;
    vertical-align: middle;
}
</style>
