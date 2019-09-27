<template>
    <div>
        <router-view />
        <van-tabbar
        v-model="active"
        active-color="#07c160"
        inactive-color="#000"
        route
        >
        <van-tabbar-item icon="wap-home-o" to="/tabbar">首页</van-tabbar-item>
        <van-tabbar-item icon="chat-o">问答</van-tabbar-item>
        <van-tabbar-item icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item icon="friends-o" to="/tabbar/my">
          {{$store.state.userToken? '我的':'未登录'}}
        </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
export default {
  name: 'tabbar',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style>

</style>
