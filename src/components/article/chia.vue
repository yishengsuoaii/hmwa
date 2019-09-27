<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="已经到底了"
      @load="onLoad"
    >
      <van-cell
        v-for="comment in list"
        :key="comment.com_id.toString()"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="comment.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{comment.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{comment.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{comment.pubdate|rTime}}</span>
            <van-button size="mini" type="default" @click="showPopups(comment)">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field
        clearable
        placeholder="请输入评论内容"
        v-model="content"
      >
        <van-button slot="button" size="mini" type="info" @click="addComment">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
    <van-popup
    v-model="showPopup"
    position="bottom"
    round
    closeable
    :style="{ height: '95%' }"
    >
    <children-b :comment="comments" :articleId="articleId" v-if="showPopup"></children-b>
    </van-popup>

  </div>
</template>

<script>
import { getComment, addArticleComment } from '@/api/comment'
import childrenB from '@/components/article/chib'
export default {
  name: 'ArticleComment',
  props: ['articleId'],
  components: {
    childrenB
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      content: '',
      showPopup: false,
      comments: {}
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getComment({
        type: 'a',
        source: this.articleId,
        offset: this.offset,
        limit: 20
      })
      console.log(data)
      this.list.push(...data.data.results)
      this.loading = false
      if (data.data.last_id) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    },
    async addComment () {
      if (!this.content.trim().length) {
        return
      }
      const { data } = await addArticleComment({
        target: this.articleId,
        content: this.content
      })
      this.list.unshift(data.data.new_obj)
      this.content = ''
    },
    showPopups (comment) {
      this.showPopup = true
      this.comments = comment
    }
  }
}
</script>

<style scoped lang='less'>
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
