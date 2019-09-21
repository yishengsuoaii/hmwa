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
                            <van-icon slot="right-icon" name="envelop-o" size="18px" color="purple" style="line-height: inherit;"
                                @click="showDialogs(items)"
                            />
                        </van-cell>
                    </van-list>
                </van-pull-refresh>
            </van-tab>

            <!--右侧图标 -->
            <div slot="nav-right" class="icon" @click="showPopur=true">
                <van-icon name="star-o" dot  size="22px" color= "red"/>
            </div>
        </van-tabs>

        <!-- popup弹框 -->
        <van-popup
        v-model="showPopur"
        position="bottom"
        closeable
        round
        close-icon="close"
        close-icon-position="top-left"
        :style="{ height: '93%' }"
        />

        <!-- Dialog弹框-->
        <van-dialog v-model="showDialog" :show-cancel-button="false" @confirm="confirms">
            <van-cell-group v-if="!isRubbishShow">
                <van-cell title="不感兴趣" label="减少这类内容" icon="close"/>
                <van-cell title="反馈垃圾内容" label="低俗,标题党等" icon="warning-o" @click="isRubbishShow = true" />
                <van-cell title="拉黑作者" icon="award-o" />
                <van-cell title="屏蔽" icon="flag-o" />
            </van-cell-group>
             <van-cell-group v-else>
                <van-cell icon="arrow-left" title="反馈" title-style="text-align:center;color:red;" center @click="isRubbishShow = false" />
                <van-cell icon="location-o" v-for="item in repotTypes" :key="item.type" :title="item.title" @click="fn(item.type)"/>

             </van-cell-group>
        </van-dialog>
    </div>
</template>

<script>
import { channel } from '@/api/channel'
import { article } from '@/api/articles'
import { feedback } from '@/api/feedback'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      channels: [],
      showPopur: false,
      showDialog: false,
      isRubbishShow: false,
      data: {},
      repotTypes: [
        { title: '标题夸张', type: 1 },
        { title: '低俗色情', type: 2 },
        { title: '错别字多', type: 3 },
        { title: '旧闻重复', type: 4 },
        { title: '广告软文', type: 5 },
        { title: '内容不实', type: 6 },
        { title: '涉嫌违法犯罪', type: 7 },
        { title: '严重侵权', type: 8 },
        { title: '其他问题', type: 0 }
      ]
    }
  },
  computed: {
    currentChannel () {
      return this.channels[this.active]
    }
  },
  methods: {
    showDialogs (data) {
      this.showDialog = true
      this.data = data
    },
    confirms () {
      this.isRubbishShow = false
    },
    async fn (type) {
      try {
        await feedback({
          channelId: this.data.art_id.toString(),
          type
        })
        this.$toast.success('反馈成功!')
      } catch (error) {
        this.$toast.fail('您已反馈该文章,请勿重复!')
      }
    },
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
