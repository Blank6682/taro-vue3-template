<template>
  <view class="index">
    <text class="border-base center">{{ msg }}</text>
  </view>
  <div border-base bg-pink center> This is Html tag</div>
  <MyComponents :msg="componentMsg" />
  <div flex="~ col item-center" text-center>
    <div>Pinia</div>
    <div>{{counter.count}}</div>
    <button @click="counter.increment">Add</button>
  </div>
  <button @click="toAbout">to about</button>
</template>

<script setup lang="ts">
import Taro from '@tarojs/taro';
import './index.scss'

const msg = ref('Hello world')
const componentMsg = ref('This is MyComponents')
const counter = useCounterStore()
const toAbout = () => {
  console.log(Taro);

  Taro.navigateTo({
    url: '../about/index'
  })
}
</script>
