<template>
    <div>
        <!-- 顶部 -->
        <van-nav-bar title="首页" fixed />

        <!-- 文章列表及navBar -->
        <van-tabs v-model="active" title-active-color="blue" color="skyblue">
            <van-tab :title="item.name" v-for="item in channels" :key="item.id">
                <van-pull-refresh v-model="item.isLoading" @refresh="onRefresh">
                    <van-list v-model=" item.loading" :finished=" item.finished" finished-text="已经到底了,去其他频道看看吧" @load="onLoad">
                        <van-cell v-for="items in  item.articles" :key="items.art_id.toString()" :title="items.title">
                            <div slot="label">
                                <van-grid border :column-num="3">
                                    <van-grid-item v-for="(ins,index) in items.cover.images" :key="index">
                                        <van-image :src="ins" lazy-load />
                                    </van-grid-item>
                                </van-grid>
                                <div class="artivlesInfo">
                                    <div class="info">
                                        <span>{{items.aut_name}}</span>
                                        <i><van-icon name="comment-o" ></van-icon>{{items.comm_count}}评论</i>
                                        <span>{{items.pubdate|rTime}}</span>
                                    </div>
                                </div>
                            </div>
                        </van-cell>
                    </van-list>
                </van-pull-refresh>
            </van-tab>

            <!--右侧图标 -->
            <div slot="nav-right" class="icon" @click="showDialog=true">
                <van-icon name="star-o" dot  size="22px" color= "red"/>
            </div>
        </van-tabs>

        <!-- 弹框 -->
        <van-popup
        v-model="showDialog"
        position="bottom"
        closeable
        round
        close-icon="close"
        close-icon-position="top-left"
        :style="{ height: '93%' }"
        />
    </div>
</template>

<script>
import { channel } from '@/api/channel'
import { article } from '@/api/articles'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      channels: [],
      showDialog: false
    }
  },
  computed: {
    currentChannel () {
      return this.channels[this.active]
    }
  },
  methods: {
    async getChannel () {
      const { data } = await channel()
      data.data.channels.forEach(item => {
        item.articles = []
        item.loading = false
        item.finished = false
        item.preTimestamp = null
        item.isLoading = false
      })
      this.channels = data.data.channels
    },
    async onLoad () {
      // 异步更新数据
      const currentChannel = this.currentChannel
      const { data } = await article({ channelId: currentChannel.id,
        timestamp: currentChannel.preTimestamp || Date.now(),
        withTop: 1 })
      console.log(data)

      currentChannel.articles.push(...data.data.results)
      currentChannel.loading = false

      if (!data.data.pre_timestamp) {
        currentChannel.finished = true
      } else {
        currentChannel.preTimestamp = data.data.pre_timestamp
      }
    },
    async onRefresh () {
      const currentChannel = this.currentChannel
      const { data } = await article({ channelId: currentChannel.id,
        timestamp: Date.now(),
        withTop: 1 })
      currentChannel.articles.unshift(...data.data.results)
      currentChannel.isLoading = false
      this.$toast({
        message: '刷新成功',
        icon: 'hot-o'
      })
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style lang="less">
.van-tabs{
    .van-tabs__wrap {
        position: fixed;
        top:46px;
        left:0;
        right:0;
        z-index: 2;
        color: gold
    }
    .van-tabs__content {
      margin-bottom:50px;
      margin-top:90px;
      .van-grid{
        .van-grid-item__content{
          background-color: #eee;
          .van-image {
            width: 80px;
            height: 80px;
          }
        }
      }
      .artivlesInfo{
        margin-top:3px;
        .info {
          display: flex;
          span {
            margin:0 10px;
          }
          i {
            display: flex;
            align-items: center;
            .van-icon {
              color:rgb(0, 217, 255);
            }
          }
        }
      }
    }
    .icon {
        position: sticky;
        right: 2px;
        display: flex;
        align-items: center;
    }
}

</style>
