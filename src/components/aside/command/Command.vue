<template>
  <div class="command">
    <div class='btn-list'>
      <div class='btn' @click="command.clear()">clear</div>
    </div>
    <div class='list'>
      <div class='single' v-for="(item, index) in command.lines" :key="index">
        {{item.text}}
      </div>
    </div>
  </div>
</template>

<script>
import { Command } from "./index";
export default {
  name: 'Command',
  data() {
    return {
      command: new Command(this._uid)
    }
  },
  created() {
    this.command.created()
  },
  mounted() {
    this.command.mounted()
  },
}
</script>

<style lang='less'>
.command {
  .btn-list{
    position: absolute;
    top:0;
    height: 30px;
    right: 0;
    left: 0;
    overflow: auto;
    .btn {
      width: 100%;
      background: red;
      color:#fff;
      text-align: center;
      line-height: 30px;
      cursor: pointer;
    }
  }
  .list {
    position: absolute;
    top:30px;
    right: 0;
    left: 0;
    bottom: 0;
    overflow: auto;
    .single {
      word-break: break-all;
      word-wrap: break-word;

      &:nth-child(even) {
        border-bottom: 1px solid #e6e6e6;
        padding: 5px 0;
        background: #e6e6e6;
      }
    }
  }
}
</style>
