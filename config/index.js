import path from 'path'
import UnoCSS from 'unocss/webpack'
import AutoImport from 'unplugin-auto-import/webpack'
import Components from 'unplugin-vue-components/webpack'

const config = {
  projectName: 'taro-dome',
  date: '2022-10-14',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  outputRoot: 'dist',
  plugins: [
    '@tarojs/plugin-html',
    'taro-plugin-pinia',
    ['@tarojs/plugin-framework-vue3', {
      vueLoaderOption: {
        compilerOptions: {
          isCustomElement: tag => tag.includes("ec-canvas"),
          whitespace: 'preserve'
          // ...
        },
        reactivityTransform: true  // 开启vue3响应性语法糖
      }
    }]
  ],
  defineConstants: {
  },
  copy: {
    patterns: [
    ],
    options: {
    }
  },
  framework: 'vue3',
  compiler: 'webpack5',
  cache: {
    enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
  },
  mini: {
    postcss: {
      pxtransform: {
        enable: true,
        config: {

        }
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    // 合并webpack配置
    webpackChain(chain) {
      // https://github.com/unocss/unocss
      chain.plugin('unocss').use(UnoCSS()),
        // https://github.com/antfu/unplugin-auto-import
        chain.plugin('unplugin-auto-import').use(AutoImport({
          imports: [
            'vue',
            // https://vuejs.org/guide/extras/reactivity-transform.html#refs-vs-reactive-variables
            'vue/macros',
          ],
          dts: 'types/auto-imports.d.ts',
          dirs: [
            'src/composables',
            'src/stores',
          ],
          vueTemplate: true,
        })),
        // 添加组件按需引入, 自动引入 `src/components` 目录下的组件
        // https://github.com/antfu/unplugin-vue-components
        chain.plugin('unplugin-vue-components').use(Components({
          dts: 'types/components.d.ts',
          dirs: ['src/components', 'src/layouts'],
        })),
        chain.merge({
          module: {
            rule: {
              mjsScript: {
                test: /\.mjs$/,
                include: [/pinia/, /unplugin-vue-components/, /unplugin-auto-import/],
                use: {
                  babelLoader: {
                    loader: require.resolve('babel-loader'),
                  },
                },
              },
            },
          },
        })
    },
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    postcss: {
      autoprefixer: {
        enable: true,
        config: {
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      },
    },
    // 合并webpack配置
    webpackChain(chain) {
      // https://github.com/unocss/unocss
      chain.plugin('unocss').use(UnoCSS())
    },
  },
  rn: {
    appName: 'taroVue3Template',
    postcss: {
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
      }
    }
  },
  alias: {
    '@/': path.resolve(__dirname, '..', 'src')
  }
}

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'))
  }
  return merge({}, config, require('./prod'))
}
