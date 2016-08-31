import { createRenderer } from 'fela'
import prefixer from 'fela-plugin-prefixer'
import fallbackValue from 'fela-plugin-fallback-value'
import unit from 'fela-plugin-unit'
import lvha from 'fela-plugin-lvha'
import validator from 'fela-plugin-validator'
import logger from 'fela-plugin-logger'

import perf from 'fela-perf'
import beautifier from 'fela-beautifier'
import fontRenderer from 'fela-font-renderer'


export default (fontNode) => {
  const renderer = createRenderer({
    plugins: [
      prefixer(),
      fallbackValue(),
      unit(),
      lvha(),

      validator(),
      logger({ logMetaData: true })
    ],
    enhancers: [
      perf(),
      beautifier(),
      fontRenderer(fontNode)
    ]
  })

  // renderer.renderStatic({background: '#eee'}, 'html,body')
  // resizable global styles
  renderer.renderStatic(`
    .react-resizable {
      position: relative;
    }
    .react-resizable-handle {
      position: absolute;
      width: 20px;
      height: 20px;
      bottom: 0;
      right: 0;
      background: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg08IS0tIEdlbmVyYXRvcjogQWRvYmUgRmlyZXdvcmtzIENTNiwgRXhwb3J0IFNWRyBFeHRlbnNpb24gYnkgQWFyb24gQmVhbGwgKGh0dHA6Ly9maXJld29ya3MuYWJlYWxsLmNvbSkgLiBWZXJzaW9uOiAwLjYuMSAgLS0+DTwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DTxzdmcgaWQ9IlVudGl0bGVkLVBhZ2UlMjAxIiB2aWV3Qm94PSIwIDAgNiA2IiBzdHlsZT0iYmFja2dyb3VuZC1jb2xvcjojZmZmZmZmMDAiIHZlcnNpb249IjEuMSINCXhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbDpzcGFjZT0icHJlc2VydmUiDQl4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjZweCIgaGVpZ2h0PSI2cHgiDT4NCTxnIG9wYWNpdHk9IjAuMzAyIj4NCQk8cGF0aCBkPSJNIDYgNiBMIDAgNiBMIDAgNC4yIEwgNCA0LjIgTCA0LjIgNC4yIEwgNC4yIDAgTCA2IDAgTCA2IDYgTCA2IDYgWiIgZmlsbD0iIzAwMDAwMCIvPg0JPC9nPg08L3N2Zz4=");
      background-position: bottom right;
      padding: 0 3px 3px 0;
      background-repeat: no-repeat;
      background-origin: content-box;
      box-sizing: border-box;
      cursor: se-resize;
    }`
  )

  renderer.renderFont('Roboto', [ 'https://fonts.useso.com/css?family=Roboto:400,300,500' ])
  renderer.renderFont('Material Icons', [ 'https://fonts.useso.com/icon?family=Material+Icons' ])

  return renderer
}
