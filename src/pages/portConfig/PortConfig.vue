<template>
  <div class="portConfig">
    <BackCol></BackCol>
    <el-button @click='btnClick'>选择项目文件夹,程序将自动检测当前文件夹下的vue项目</el-button>
    <el-row v-show='path'>
      {{path}}<el-button @click='open'>打开项目文件夹</el-button>
      <Project :path='path'></Project>
    </el-row>
  </div>
</template>

<script>
import handle, { portConfig } from "./index";
import Project from '@/components/project/Project.vue'
export default {
  name: 'PortConfig',
  data() {
    return {
      portConfig: portConfig,
    }
  },
  computed: {
    path () {
      return this.portConfig.path
    }
  },
  created() {
    handle.created()
  },
  mounted() {
    handle.mounted()
  },
  methods: {
    btnClick () {
      this.portConfig.openDialogue()
    },
    open () {
      handle.open(this.path)
    }
  },
  components: {Project}
}
</script>

<style>

</style>
