<template>
<div>
<van-nav-bar title="登录" />
<van-cell-group>
    <ValidationObserver tag="form" ref="loginForm">
        <ValidationProvider rules="required|phone" name="手机号" v-slot="{ errors }">
            <van-field
                v-model="userInfo.mobile"
                clearable label="手机号"
                placeholder="请输入手机号:">
                <van-icon name="smile" slot="left-icon" color="yellowgreen"/>
            </van-field>
            <span>{{ errors[0] }}</span>
        </ValidationProvider>

        <ValidationProvider name="验证码" rules="required|digits:6" v-slot="{ errors }">
            <van-field
                v-model="userInfo.code"
                label="验证码" clearable
                placeholder="请输入验证码:"
                >
                <van-button slot="button" size="small" color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="commit">发送验证码</van-button>
                <van-icon name="fire" slot="left-icon" color="red"/>
        </van-field>
        <span>{{ errors[0] }}</span>
        </ValidationProvider>
    </ValidationObserver>
</van-cell-group>
    <div class="login">
      <van-button :loading="isLoading" color="linear-gradient(to right, red, yellow)" @click="login">登录</van-button>
    </div>
    <div class="ico">
      <van-icon name="gem" />
    </div>
  </div>
</template>

<script>
import { Login } from '@/api/user'

export default {
  name: 'Login',
  data () {
    return {
      userInfo: {
        mobile: '13911111111',
        code: '246810'
      },
      isLoading: false
    }
  },
  methods: {
    async login () {
      try {
        const isValid = await this.$refs.loginForm.validate()
        // 验证失败，则什么都不做
        if (!isValid) {
          return
        }
        this.isLoading = true
        const { data } = await Login(this.userInfo)
        this.$store.commit('setToken', data.data)
        this.$router.push('/tabbar')
      } catch (error) {
        console.log(error)
        if (error.response.status === 400) {
          this.$toast.fail('登陆失败!,请检查重试')
        }
      }
      this.isLoading = false
    },
    commit () {
      this.$toast.success('验证码已发送,注意查收!')
    }
  }

}
</script>

<style lang="less" scoped>
.login {
  padding: 0 20px;
  .van-button {
    width: 100%;
  }
}
.ico {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 400px;
  .van-icon {
    font-size: 88px;
    color: gold;
  }
}
</style>
