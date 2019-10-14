<template>
  <div class="dependence">
    <h1>dependence</h1>
    <el-row>
      <el-col :span='24'>
        node 
        <template v-if='dependence.installed.nodejs == 2'>
          <span>installed</span>
        </template>
        <template v-else-if='dependence.installed.nodejs == 1'>
          <span>installing</span>
        </template>
        <template v-else>
          <el-button @click="nodetest()">test</el-button>
          <el-button @click="nodeinstall">download</el-button>
        </template>
      </el-col>
      <template v-if='dependence.installed.nodejs'>
        <el-col :span='24'>
          pm2
          <template v-if='dependence.installed.pm2 == 2'>
            <span>installed</span>
          </template>
          <template v-else-if='dependence.installed.pm2 == 1'>
            <span>installing</span>
          </template>
          <template v-else>
            <el-button @click="pm2test()">test</el-button>
            <el-button @click="pm2install">install</el-button>
          </template>
        </el-col>
        <el-col :span='24'>
          nclient-build 
          <template v-if='dependence.installed.nclientBuild == 2'>
            <span>installed</span>
          </template>
          <template v-else-if='dependence.installed.nclientBuild == 1'>
            <span>installing</span>
          </template>
          <template v-else>
            <el-button @click="nbuildtest()">test</el-button>
            <el-button @click="nbuildinstall">install</el-button>
          </template>
        </el-col>
        <el-col :span='24'>
          code-generate-mike
          <template v-if='dependence.installed.codeGen == 2'>
            <span>installed</span>
          </template>
          <template v-else-if='dependence.installed.codeGen == 1'>
            <span>installing</span>
          </template>
          <template v-else>
            <el-button @click="codeGentest()">test</el-button>
            <el-button @click="codeGeninstall">install</el-button>
          </template>
        </el-col>
      </template>
    </el-row>
    假如一直无法安装,请尝试手动安装
  </div>
</template>

<script>
import handle, { dependence } from "./index";
export default {
  name: 'Dependence',
  data() {
    return {
      dependence: dependence
    }
  },
  computed: {
    nextVisible () {
      return this.dependence.installed.nodejs == 2 && this.dependence.installed.pm2 == 2 && this.dependence.installed.nclientBuild == 2  && this.dependence.installed.codeGen == 2
    }
  },
  created() {
    handle.created()
  },
  mounted() {
    handle.mounted()
    this.nodetest()
    this.pm2test()
    this.nbuildtest()
    this.codeGentest()
  },
  watch: {
    nextVisible (val) {
      if (val) {
        this.next()
      }
    }
  },
  methods: {
    next () {
      this.$router.push({name: 'Menu'})
    },
    nodetest () {
      this.dependence.test('nodejs')
    },
    nodeinstall () {
      // this.dependence.installed.nodejs = 1
      // this.dependence.install('nodejs')
      window.open('https://nodejs.org/zh-cn/')
    },
    pm2test () {
      this.dependence.test('pm2')
    },
    pm2install () {
      this.dependence.installed.pm2 = 1
      this.dependence.install('pm2')
    },
    nbuildtest () {
      this.dependence.test('nclientBuild')
    },
    nbuildinstall () {
      this.dependence.installed.nclientBuild = 1
      this.dependence.install('nclientBuild')
    },
    codeGentest () {
      this.dependence.test('codeGen')
    },
    codeGeninstall () {
      this.dependence.installed.codeGen = 1
      this.dependence.install('codeGen')
    }
  },
}
</script>

<style>

</style>
