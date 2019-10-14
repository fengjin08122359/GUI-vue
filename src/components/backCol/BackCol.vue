<template>
  <div class="backCol">
    <el-button @click="back"><span class='el-icon-back'></span></el-button>
  </div>
</template>

<script>
import handle, { backCol } from "./index";
export default {
  name: 'BackCol',
  data() {
    return {
      backCol: backCol
    }
  },
  created() {
    handle.created()
  },
  mounted() {
    handle.mounted()
  },
  methods: {
    back() {
      this.$router.back(-1)
    },
  },
}
</script>

<style>

</style>
