<template>
  <div class="tools">
    <el-row>
      <el-col>
        vscode:
        <span class='pointer' @click="open('https://code.visualstudio.com/Download')">下载地址: https://code.visualstudio.com/Download</span>
        <span>安装插件包:</span>
        <span>vscode 左侧点击扩展(extensions),搜索以下插件点击安装</span>
        <span>Auto Close Tag</span>
        <span>Auto Rename Tag</span>
        <span>Beautify</span>
        <span>Chinese (Simplified) Language Pack for Visual Studio Code</span>
        <span>Debugger for Chrome</span>
        <span>Elm Emmet</span>
        <span>ESLint</span>
        <span>Git History</span>
        <span>HTML CSS Support</span>
        <span>HTML Snippets</span>
        <span>Idea Directory Diff</span>
        <span>JavaScript (ES6) code snippets</span>
        <span>jQuery Code Snippets</span>
        <span>Local History</span>
        <span>Markdown All in One</span>
        <span>Markdown Preview Enhanced</span>
        <span>Vetur</span>
        <span>Vue 2 Snippets</span>
        <span>Vue VSCode Snippets</span>
      </el-col>
      <el-col>
        Hbuilder
        <span class='pointer' @click="open('https://www.dcloud.io/hbuilderx.html')">下载地址: https://www.dcloud.io/hbuilderx.html</span>
      </el-col>
      <el-col>
        favicon转换地址与配置
        <span class='pointer'  @click="open('https://realfavicongenerator.net/')">使用地址: https://realfavicongenerator.net/</span>
        <span>选择一张png图片,然后点击继续使用</span>
        <span>在设置中选择需要生成的类型</span>
        <span>下载html代码包</span>
      </el-col>
      <el-col>
        常用链接:
        <span class='pointer' @click="open('https://www.processon.com/')">
          流程图: https://www.processon.com/
        </span>
        <span class='pointer' @click="open('https://cn.vuejs.org/')">
          vue: https://cn.vuejs.org/
        </span>
        <span class='pointer' @click="open('https://cli.vuejs.org/zh/')">
          vue-cli: https://cli.vuejs.org/zh/
        </span>
        <span class='pointer' @click="open('https://element.eleme.cn/#/zh-CN/component/installation')">
          element-ui: https://element.eleme.cn/#/zh-CN/component/installation
        </span>
        <span class='pointer' @click="open('https://www.iconfont.cn/')">
          iconfont: https://www.iconfont.cn/
        </span>
        <span class='pointer' @click="open('https://www.npmjs.com/package/nclient-microfront')">
          nclient-microfront: https://www.npmjs.com/package/nclient-microfront
        </span>
        <span class='pointer' @click="open('https://www.npmjs.com/package/nclient-build')">
          nclient-build: https://www.npmjs.com/package/nclient-build
        </span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { Tools } from "./index";
export default {
  name: 'Tools',
  data() {
    return {
      _uid: '',
      tools: new Tools(this._uid)
    }
  },
  created() {
    this.tools.created()
  },
  mounted() {
    this.tools.mounted()
  },
  methods: {
    open (url) {
      window.open(url)
    }
  },
}
</script>

<style scoped lang='less'>
.tools {
  font-size: 16px;

  span{
    margin: 5px;
    display: block;
    font-size: 14px;
  }
  .pointer {
    cursor: pointer;
    color: red;
  }
}
</style>
