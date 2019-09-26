<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-nav-bar
        :title="total_count+'条回复'"
    />
     <van-cell>
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
            <van-button size="mini" type="default">回复</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
       <van-cell title="网友回复" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="item in list"
        :key="item.com_id.toString()"
      >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{item.content}}</p>
          <p>
            <span style="margin-right: 10px;">{{item.pubdate|rTime}}</span>
            <van-button size="mini" type="default">回复</van-button>
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
        <van-button slot="button" size="mini" @click="addComment"  type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComment, addArticleComment } from '@/api/comment'

export default {
  name: 'Abc',
  props: ['comment', 'articleId'],
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null,
      total_count: 0,
      content: ''
    }
  },
  methods: {
    async onLoad () {
      const { data } = await getComment({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset,
        limit: 20
      })
      console.log(data)
      this.list.push(...data.data.results)
      this.total_count = data.data.total_count
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
        target: this.comment.com_id.toString(),
        content: this.content,
        artId: this.articleId
      })
      this.list.unshift(data.data.new_obj)
      this.content = ''
      this.total_count++
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
