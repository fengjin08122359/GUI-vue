<template>
  <el-button @click='btnClick'>上传文件</el-button>
</template>

<script>
import { Upload } from "./index";
export default {
  name: 'Upload',
  data() {
    return {
      _uid: new Date().getTime(),
      upload: new Upload(this._uid)
    }
  },
  computed: {
    result () {
      return this.upload.result
    }
  },
  created() {
    this.upload.created()
  },
  mounted() {
    this.upload.mounted()
  },
  methods: {
    btnClick () {
      this.upload.openDialogue()
    },
    handleChange () {
      this.$emit('uploadChange', this.result)
    }
  },
  watch: {
    result (val) {
      if (val) {
        this.handleChange();
      }
    }
  },
}
</script>

<style>

</style>
