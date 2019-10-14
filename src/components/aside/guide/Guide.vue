<template>
  <div class="guide">
    <div>依赖项:</div>
    <div>安装node:打开网址https://nodejs.org/zh-cn/ 推荐版本10.16.3</div>
    <div>安装pm2: 进入命令行 输入 npm install -g pm2</div>
    <div>安装nclient-build : 进入命令行 输入 npm install -g nclient-build </div>
    
    <div>项目:</div>
    <div>当启动无响应时请进行如下步骤</div>
    <div>安装: 进入当前文件夹的命令行 输入 npm install</div>
    <div>启动: 进入当前文件夹的命令行 输入 npm start </div>
  </div>
</template>

<script>
import { Guide } from "./index";
export default {
  name: 'Guide',
  data() {
    return {
      guide: new Guide(this._uid)
    }
  },
  created() {
    this.guide.created()
  },
  mounted() {
    this.guide.mounted()
  },
}
</script>

<style lang='less'>
.guide div{
word-break: break-all;
word-wrap: break-word;
&:nth-child(even) {
  border-bottom: 1px solid #e6e6e6;
  padding: 5px 0;
  background: #e6e6e6;
}
}
</style>