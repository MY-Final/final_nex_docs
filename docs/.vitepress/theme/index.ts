// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import {
  NolebaseEnhancedReadabilitiesMenu,
  NolebaseEnhancedReadabilitiesScreenMenu,
  InjectionKey
} from '@nolebase/vitepress-plugin-enhanced-readabilities/client'
import type { Options } from '@nolebase/vitepress-plugin-enhanced-readabilities/client'

import '@nolebase/vitepress-plugin-enhanced-readabilities/client/style.css'
import './style.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      // 为较宽的屏幕的导航栏添加阅读增强菜单
      'nav-bar-content-after': () => h(NolebaseEnhancedReadabilitiesMenu),
      // 为较窄的屏幕（通常是小于 iPad Mini）添加阅读增强菜单
      'nav-screen-content-after': () => h(NolebaseEnhancedReadabilitiesScreenMenu),
    })
  },
  enhanceApp({ app, router, siteData }) {
    // 添加中文国际化配置
    app.provide(InjectionKey, {
      locales: {
        'zh-CN': {
          title: {
            title: '阅读增强',
            titleAriaLabel: '阅读增强'
          },
          layoutSwitch: {
            title: '布局切换',
            titleAriaLabel: '布局切换',
            titleHelpMessage: '调整内容布局的宽度',
            optionFullWidth: '全宽',
            optionSidebarWidthAdjustableOnly: '侧边栏可调',
            optionBothWidthAdjustable: '双栏可调',
            optionOriginalWidth: '原始宽度',
            contentLayoutMaxWidth: {
              title: '内容宽度',
              titleAriaLabel: '内容宽度',
              titleHelpMessage: '调整内容区域的最大宽度'
            },
            pageLayoutMaxWidth: {
              title: '页面宽度',
              titleAriaLabel: '页面宽度',
              titleHelpMessage: '调整页面的最大宽度'
            }
          },
          spotlight: {
            title: '聚光灯',
            titleAriaLabel: '聚光灯',
            titleHelpMessage: '高亮当前阅读行',
            optionOn: '开启',
            optionOff: '关闭',
            styles: {
              title: '聚光灯样式',
              titleAriaLabel: '聚光灯样式',
              optionUnder: '下划线',
              optionAside: '侧边线'
            }
          }
        }
      }
    } as Options)
  }
} satisfies Theme
