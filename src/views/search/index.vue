<template>
    <div>
        <form action="/">
            <van-search
            v-model="searchText"
            placeholder="请输入搜索关键词"
            show-action
            @search="onSearch(searchText)"
            />
        </form>
        <van-cell-group  v-if="searchText">
           <van-cell icon="search" v-for="(item,index) in searchList" :key="index">
               <div slot="title" v-html="highLight (item)"  @click="onSearch(item)" ></div>
           </van-cell>
        </van-cell-group>
        <van-cell-group v-else>
            <van-cell title="历史记录" size="large" >
                <div class="delete">
                    <template v-if="isDeleteShow">
                        <van-tag round type="warning" @click="historyList=[]">全部删除</van-tag>
                        <van-tag plain type="success" @click="isDeleteShow=false">完成</van-tag>
                    </template>
                    <van-icon name="delete" color="red" v-else  @click="isDeleteShow=true"/>
                </div>
            </van-cell>
            <van-cell :title="item" v-for="(item,index) in historyList" :key="index" @click="onSearch (item)">
                <van-icon v-show="isDeleteShow" name="close" color="red" slot="right-icon" style="line-height: inherit;" @click.stop="historyList.splice(index,1)"/>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import { suggestion } from '@/api/suggestion'
import { setItem, getItem } from '@/utils/storage'
import { debounce } from 'lodash'

export default {
  name: 'search',
  data () {
    return {
      searchText: '',
      searchList: [],
      historyList: getItem('search') || [],
      isDeleteShow: false
    }
  },
  watch: {
    searchText: debounce(async function (newValue) {
      if (newValue.length === 0) {
        this.searchList = ''
        return
      }

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
    }, 1000),
    historyList (newValue) {
      setItem('search', newValue)
    }
  },
  methods: {
    highLight (str) {
      const reg = new RegExp(this.searchText, 'gi')
      return str.replace(reg, `<span style="color: red;">${this.searchText}</span>`)
    },
    onSearch (q) {
      if (!q.trim().length) {
        return
      }

      const historyList = this.historyList
      const index = historyList.findIndex(item => {
        return item.trim().toLowerCase() === q.trim().toLowerCase()
      })
      if (index !== -1) {
        historyList.splice(index, 1)
      }
      historyList.unshift(q)
      setItem('search', historyList)
      this.$router.push({
        name: 'search-result',
        params: {
          q
        }
      })
    }
  }
}
</script>

<style lang="less">
    .delete {
        span {
            margin:0 5px;
        }
    }
</style>
