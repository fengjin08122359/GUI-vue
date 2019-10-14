<template>
  <div class="project">
    <el-button @click="display">新增</el-button>
    <el-button @click="refresh">刷新</el-button>
    <div v-for="(item, index) in list" :key="index" >
      <el-button-group>
        <template v-if='item.use == 0'>
          <el-button @click="switchTarget(item)" :class="{active: item==target}">{{item.name}}</el-button>
          <el-button @click="start(item.name)">启动</el-button>
          <el-button @click="stop(item.name)">停止</el-button>
          <el-button v-if='target == item' @click="install(item.name)">安装</el-button>
          <el-button v-if='target == item' @click="postman(item)">postman</el-button>
          <el-button v-if='target == item' @click="build(item.name)">打包</el-button>
        </template>
        <template v-else-if='item.use == 1'>
          <el-button  @click="switchTarget(null)" >{{item.name}}</el-button>
          <el-button>loading...</el-button>
        </template>
        <template v-else>
          <el-button @click="switchTarget(null)" >{{item.name}}</el-button>
          <el-button @click="transform(item.name)">vue项目转换</el-button>
        </template>
          <el-button @click="open(item.name)">打开文件夹</el-button>
      </el-button-group>
      <Starter v-if='target == item' :target='item'></Starter>
    </div>
    <el-dialog title="新增项目" :visible.sync="addVisible">
      <el-input v-model="name"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="addVisible = false;add()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="postman" :visible.sync="postmanVisible">
      <Postman :path='project.path' :target='postmanTarget'></Postman>
    </el-dialog>
  </div>
</template>

<script>
import Starter from '../starter/Starter.vue'
import Postman from '@/components/postman/Postman.vue'
import handle, { project } from "./project";
export default {
  name: 'Project',
  data() {
    return {
      project: project,
      target: null,
      postmanTarget: null,
      addVisible:false,
      postmanVisible: false,
      name: ''
    }
  },
  props: ['path'],
  computed: {
    list () {
      return this.project.list
    }
  },
  created() {
    handle.created()
  },
  mounted() {
    handle.mounted()
    this.refresh()
  },
  watch: {
    path (val) {
      this.refresh()
    },
    list (val) {
      this.target = null;
    }
  },
  methods: {
    start (name) {
      handle.start(name)
    },
    stop (name) {
      handle.stop(name)
    },
    build(name) {
      handle.build(name)
    },
    open (name) {
      handle.open(name)
    },
    install (name) {
      handle.install(name)
    },
    transform (name) {
      handle.transform(name)
    },
    postman(item) {
      this.postmanVisible = true
      this.postmanTarget = item
    },
    switchTarget (item) {
      this.target = item
    },
    display () {
      this.addVisible = true
    },
    refresh () {
      // handle.refresh()
      if (this.path) {
        this.project.scan(this.path)
      }
    },
    add () {
      if (this.name == ''){
        this.$message({
          message: '未填写项目名称',
          type: 'warning'
        });
      } else if (this.name.match(/[^\w\.\/-]/ig)) {
        this.$message({
          message: '仅能输入英语',
          type: 'warning'
        });
      } else {
        handle.add(this.name)
      }
    }
  },
  components: {Starter, Postman}
}
</script>

<style>
.project .active{
  color: red;
}
</style>
