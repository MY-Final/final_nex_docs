import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "final",
  description: "NEX 2.0 开发插件使用指南",
  lang: 'zh-CN',
  lastUpdated: true,
  base: '/final_nex_docs/',
  vite: {
    optimizeDeps: {
      exclude: [
        '@nolebase/vitepress-plugin-enhanced-readabilities/client',
        'vitepress'
      ],
    },
    ssr: {
      noExternal: [
        '@nolebase/vitepress-plugin-enhanced-readabilities',
        '@nolebase/ui'
      ],
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
    ],

    sidebar: [
      {
        text: 'NEX 2.0 开发指南',
        items: [
          { text: '使用指南', link: '/nex-guide' },
          // { text: '全局对象 CTX', link: '/global-ctx' },
          // { text: '首页拓展 PC', link: '' }
        ]
      },
      {
        text: '全局对象 CTX',
        items: [
          { text: 'CTX的使用', link: '/global-ctx' },
        ]
      },
      {
        text: '首页拓展',
        collapsed: true,
        items: [
          { text: 'PC端', link: '/Homepage_Extension_PC' },
        ]
      },
      // {
      //   text: '表单页扩展',
      //   items: [
      //     { text: 'PC端', link: '/Form_page_extensions_PC' },
      //   ]
      // }
      {
        text: '表单页扩展',
        items: [
          {
            text: 'PC端',
            collapsed: true,
            items: [
              { text: '表单页', link: '/Form_page' },
              { text: '表单头部', link: '/Form_header' },
              { text: '表单底部按钮', link: '/Form_footer_button' },
              { text: '实体表单', link: '/Entity_form' },
            ]
          }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/MY-Final/final_nex_docs' }
    ],
    
    lastUpdated: {
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'full',
        timeStyle: 'medium'
      }
    },
    
    search: {
      provider: 'local',
      options: {
        locales: {
          'zh-CN': {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭'
                }
              }
            }
          }
        }
      }
    },
    
    footer: {
      message: '在 CC-BY-SA-4.0 许可下发布',
      copyright: 'Copyright © 2025-forever final'
    },
    
    // 目录配置
    outline: {
      level: [2, 3], // 显示2级和3级标题
      label: '本页目录'
    }
  }
})
