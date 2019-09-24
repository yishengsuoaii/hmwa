<template>
    <div>
        <van-nav-bar
        :title='`${$route.params.q}的搜索结果`'
        fixed
        left-arrow
        @click-left="$router.back()"
        />
        <van-list
        v-model="loading"
        :finished="finished"
        finished-text="已经到底了"
        @load="onLoad"
        >
            <van-cell
            v-for="item in list"
            :key="item.art_id.toString()"
            :title="item.title"
            />
        </van-list>
    </div>
</template>

<script>
import { searchResult } from '@/api/suggestion'
export default {
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1
    }
  },

  methods: {
    async onLoad () {
      const { data } = await searchResult({
        page: this.page,
        perPage: 20,
        q: this.$route.params.q
      })
      this.list.push(...data.data.results)
      this.loading = false
      if (data.data.results.length) {
        this.page++
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style lang="less" scoped>
    .van-icon {
        color:#fff;
    }
    .van-list{
        margin-top:46px;
    }
</style>
