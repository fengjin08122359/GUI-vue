<template>
  <div class="menu">
    依赖已验证
    <el-button @click="jumpPortConfig">项目管理</el-button>
    <el-button @click="jumpCodeGenerate">前端代码生成</el-button>
  </div>
</template>

<script>
import { Menu } from "./index";
export default {
  name: 'Menu',
  data() {
    return {
      menu: new Menu(this._uid)
    }
  },
  created() {
    this.menu.created()
  },
  mounted() {
    this.menu.mounted()
  },
  methods: {
    jumpPortConfig() {
      this.$router.push({name: 'PortConfig'})
    },
    jumpCodeGenerate() {
      this.$router.push({name: 'CodeGenerate'})
    },
  },
}
</script>

<style>

</style>
