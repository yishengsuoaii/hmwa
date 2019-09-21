<template>
  <div>
        <van-nav-bar title="首页" />
        <van-tabs v-model="active" title-active-color="blue" color="skyblue">
            <van-tab :title="item.name" v-for="item in channels" :key="item.id">
              <van-list
              v-model=" item.loading"
              :finished=" item.finished"
              finished-text="已经到底了,去其他频道看看吧"
              @load="onLoad"
              >
              <van-cell
              v-for="items in  item.articles"
              :key="items.art_id.toString()"
              :title="items.title"
              />
              </van-list>
            </van-tab>
        </van-tabs>
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
      list: [],
      loading: false,
      finished: false
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
    }
  },
  created () {
    this.getChannel()
  }
}
</script>

<style lang="less">

    .van-tabs__content {
        margin-bottom:50px;
    }

</style>
