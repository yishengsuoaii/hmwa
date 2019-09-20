<template>
  <div>
        <van-nav-bar title="首页" />
        <van-tabs v-model="active" title-active-color="blue" color="skyblue">
            <van-tab :title="item.name" v-for="item in channels" :key="item.id">
              {{item.name}}
            </van-tab>
        </van-tabs>
  </div>
</template>

<script>
import { channel } from '@/api/channel'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      channels: []
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
      this.channels = data.data.channels
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
