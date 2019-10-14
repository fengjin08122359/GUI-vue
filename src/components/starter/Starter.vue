<template>
  <div class="starter" v-if="target">
    <el-input v-model='starter.port'>
      <template slot="prepend">port</template>
    </el-input>
    <el-row v-for="(item, index) in starter.proxyArray" :key="index">
      <el-col :span="10">
        <el-input class='' v-model='item.key'>
          <template slot="prepend">match</template>
        </el-input>
      </el-col>
      <el-col :span="10">
        <el-input v-model='item.target'>
          <template slot="prepend">target</template>
        </el-input>
      </el-col>
      <el-col :span="4">
        <el-button v-if='index == 0' @click="addProxy">新增</el-button>
        <el-button v-if='index != 0' @click="removeProxy(index)">删除</el-button>
      </el-col>
    </el-row>
    <el-button  @click="save">保存</el-button>
  </div>
</template>

<script>
import handle, { starter } from "./starter";
export default {
  name: 'Starter',
  data() {
    return {
      starter: starter,
    }
  },
  props:['target'],
  created() {
    handle.created()
  },
  mounted() {
    handle.mounted()
    handle.get(this.target)
  },
  methods: {
    addProxy () {
      starter.proxyArray.push({
        key: '',
        target: '',
      })
    },
    removeProxy (index) {
      starter.proxyArray.splice(index, 1)
    },
    save () {
      handle.save()
    }
  },
  watch: {
    target (val) {
      if (val) {
        // handle.getSingle(val.name)
        handle.get(val)
      }
    }
  },
}
</script>

<style>
</style>
