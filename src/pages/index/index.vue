<template>
  <!-- wx写法 -->
  <view class="index">
    <text border-base center m-2>{{ msg }} </text>
  </view>
  <!-- Html tag写法 -->
  <div m-2 border-base bg-pink text-center> This is Html tag</div>
  <MyComponents :msg="componentMsg" m-2 />
  <div flex="~ col item-center" text-center border m-5>
    <div>Pinia</div>
    <div>{{counter.count}}</div>
    <button @click="counter.increment">Add</button>
  </div>
  <button @click="toAbout" center>to about </button>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import './index.scss'

const msg = ref('Hello world')
const componentMsg = ref('This is MyComponents')
const counter = useCounterStore()
const toAbout = () => {

  Taro.navigateTo({
    url: '/pages/about/index'
  })
}
</script>
