<template>
  <view class="index">
    <text class="border-base center">{{ msg }}</text>
  </view>
</template>

<script>
import { ref } from 'vue'
import './index.scss'

export default {
  setup() {
    const msg = ref('Hello world')
    return {
      msg
    }
  }
}
</script>
