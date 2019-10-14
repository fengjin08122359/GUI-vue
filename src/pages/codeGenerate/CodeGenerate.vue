<template>
  <div class="codeGenerate">
    <BackCol></BackCol>
    <el-button @click="codeGenerate.start()">start</el-button>
    <el-button @click="codeGenerate.stop()">stop</el-button>
    <el-button @click="refresh()">open</el-button>
    <!-- <iframe :url='url'></iframe> -->
  </div>
</template>

<script>
import { CodeGenerate } from "./index";
export default {
  name: 'CodeGenerate',
  data() {
    return {
      codeGenerate: new CodeGenerate(this._uid),
      url: '',
      rawUrl: 'http://127.0.0.1:19090/#/'
    }
  },
  created() {
    this.codeGenerate.created()
  },
  mounted() {
    this.codeGenerate.mounted()
    this.url = this.rawUrl
  },
  methods: {
    refresh() {
      window.open(this.rawUrl)
      // this.url = ''
      // this.$nextTick(() => 
      //   this.url = this.rawUrl
      // })
    }
  },
}
</script>

<style>

</style>
