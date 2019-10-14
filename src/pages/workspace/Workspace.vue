<template>
  <div class="workspace">
  </div>
</template>

<script>
import handle, { workspace } from "./index";
export default {
  name: 'Workspace',
  data() {
    return {
      workspace: workspace
    }
  },
  created() {
    handle.created()
  },
  mounted() {
    handle.mounted()
  },
}
</script>

<style>

</style>
