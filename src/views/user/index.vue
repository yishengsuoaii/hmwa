<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
      @click-left="$router.back()"
      @click-right="onSavePhoto"
    />
    <van-cell-group>
      <van-cell title="头像" is-link @click="upFile">
        <van-image
          round
          width="30"
          height="30"
          :src="userInfo.photo"
        />
      </van-cell>
      <van-cell
        title="昵称"
        :value="userInfo.name"
        is-link
        @click="showTitle=true"
      />
      <van-cell
        title="性别"
        :value="userInfo.gender===1?'女':'男'"
        is-link
        @click="showGender=true"
      />
      <van-cell
        title="生日"
        :value="userInfo.birthday"
        is-link
        @click="showBirthday=true"
      />
    </van-cell-group>
    <input type="file" ref="file" hidden>

    <!-- 修改昵称-->
    <van-dialog
        v-model="showTitle"
        title="用户昵称"
        show-cancel-button
        @confirm="userInfo.name=title"
    >
      <van-field :value="userInfo.name" placeholder="请输入用户名" @input="titleCurrent" />
    </van-dialog>
    <!-- 修改昵称-->

    <!-- 修改性别-->
    <van-action-sheet
        v-model="showGender"
        :actions="[
                { name: '男',value:0 },
                { name: '女',value:1 }
            ]"
        cancel-text="取消"
        @select="onSelect"
    />
    <!-- 修改性别-->

    <!-- 修改生日-->
    <van-action-sheet v-model="showBirthday">
        <van-datetime-picker
            v-model="currentDate"
            type="date"
            :min-date="minDate"
            @confirm="saveBirthday"
            @cancel="showBirthday=false"
        />
    </van-action-sheet>
    <!-- 修改生日-->
  </div>
</template>

<script>
import { getProfile, savePhoto, setProfile } from '@/api/user'
import { formatDate } from '@/utils/date'
export default {
  name: 'UserIndex',
  data () {
    return {
      userInfo: '',
      showTitle: false,
      showGender: false,
      showBirthday: false,
      title: '',
      currentDate: new Date(),
      minDate: new Date(1900, 0, 1)
    }
  },
  computed: {
    file () {
      return this.$refs.file
    }
  },
  methods: {
    async onLoadProfile () {
      const { data } = await getProfile()
      this.userInfo = data.data
      console.log(data)
    },
    upFile () {
      this.file.click()
    },
    async onSavePhoto () {
      const toast = this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '更新中'
      })
      try {
        if (this.file.files[0]) {
          await savePhoto(this.file.files[0])
        } else {
          await setProfile(this.userInfo)
        }

        toast.clear()
        this.$toast.success('更新成功!')
      } catch (error) {
        this.$toast.fail('更新失败,请重试!')
      }
    },
    titleCurrent (value) {
      this.title = value
    },
    onSelect (item) {
      // 点击选项时默认不会关闭菜单，可以手动关闭
      this.showGender = false
      this.userInfo.gender = item.value
    },
    saveBirthday (value) {
      this.userInfo.birthday = formatDate(value)
      this.showBirthday = false
    }
  },
  mounted () {
    this.file.onchange = () => {
      this.userInfo.photo = URL.createObjectURL(this.file.files[0])
    }
  },
  created () {
    this.onLoadProfile()
  }
}
</script>
<style lang="less">
.van-nav-bar {
    .van-nav-bar__text {
        color:#fff;
    }
    .van-icon {
        color:#fff
    }
}

</style>
