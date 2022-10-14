import presetWeapp from 'unocss-preset-weapp'
import { transformerAttributify, transformerClass } from 'unocss-preset-weapp/transformer'
import { defineConfig } from 'unocss';

export default defineConfig({
  presets: [
    // https://github.com/MellowCo/unocss-preset-weapp
    presetWeapp(

      // h5兼容设置，默认为 750 标准，webpack4 平台
      // 只开发小程序可删除
      {
        isH5: process.env.TARO_ENV === 'h5',
        platform: 'taro',
        designWidth: 640,
        deviceRatio: {
          640: 2.34 / 2,
          750: 1,
          828: 1.81 / 2,
          375: 2 / 1
        },
        //解决和UI组件库原子化CSS冲突
        prefix: 'li--',
        // 通过设置 taroWebpack 版本，指定 rem 策略
        // 解决h5根字体(rem)大小不同 https://github.com/NervJS/taro/issues/12361
        // webpack4 webpack5
        taroWebpack: 'webpack5'
      }
    ),
  ],
  shortcuts: [
    {
      'border-base': 'border border-gray-500/10',
      'center': 'flex justify-center items-center',
    },
  ],
  theme: {
    animation: {
      keyframes: {
        'my-animation': '{0% {letter-spacing: -0.5em;transform: translateZ(-700px);opacity: 0;}40% {opacity: 0.6;}100% {transform: translateZ(0);opacity: 1;}}',
      },
      durations: {
        'my-animation': '0.8s',
      },
      counts: {
        'my-animation': 'infinite',
      },
      timingFns: {
        'my-animation': 'cubic-bezier(0.215, 0.610, 0.355, 1.000)',
      },
    }
  },
  transformers: [
    // options 见https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerAttributify
    transformerAttributify({
      //解决和UI组件库原子化CSS冲突
      classPrefix: 'li--'
    }),

    // options 见https://github.com/MellowCo/unocss-preset-weapp/tree/main/src/transformer/transformerClass
    transformerClass(),
  ],
})
