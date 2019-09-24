<template>
    <div>
        <form action="/">
            <van-search
            v-model="searchText"
            placeholder="请输入搜索关键词"
            show-action
            />
        </form>
        <van-cell-group>
           <van-cell icon="search" v-for="(item,index) in searchList" :key="index">
               <div slot="title" v-html="highLight (item)"></div>
           </van-cell>
        </van-cell-group>
        <van-cell-group>
            <van-cell title="历史记录" size="large" >
                <div class="delete">
                    <van-tag round type="warning">全部删除</van-tag>
                    <van-tag plain type="success">完成</van-tag>
                    <van-icon name="delete" color="red" size="20px"/>
                </div>
            </van-cell>
            <van-cell :title="item" v-for="(item,index) in historyList" :key="index">
                <van-icon name="close" color="red" slot="right-icon" style="line-height: inherit;"/>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import { suggestion } from '@/api/suggestion'

export default {
  name: 'search',
  data () {
    return {
      searchText: '',
      searchList: [],
      historyList: []
    }
  },
  watch: {
    async searchText (newValue) {
      if (newValue.length === 0) {
        this.searchList = ''
        return
      }

      this.historyList.push(newValue)
      const { data } = await suggestion(newValue)

      // 把返回的数据修改了 不能用,用下面的 highLight方法
      //   let options = []
      //   options = data.data.options
      //   options.forEach((item, index) => {
      //     let reg = new RegExp(newValue, 'gi')
      //     options[index] = item.replace(reg, `<span style="color: red;">${newValue}</span>`)
      //   })
      // this.searchList = options

      this.searchList = data.data.options
      console.log(data)
    }
  },
  methods: {
    highLight (str) {
      const reg = new RegExp(this.searchText, 'gi')
      return str.replace(reg, `<span style="color: red;">${this.searchText}</span>`)
    }
  }
}
</script>

<style>
    .delete {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
</style>
