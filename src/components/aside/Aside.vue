<template>
  <div class="aside">
    <swiper :options="swiperOption" ref='swiper'>
        <swiper-slide v-for="(item, index) in tabs" :key="index">
          <span :class='{active: selected == index}' @click="selectedItem(index)">
            <template v-if='item.name=="command"'>
              <span>命令行</span>
            </template>
            <template v-else-if='item.name=="codeif"'>
              <span>命名工具codeif</span> 
            </template>
            <template v-else-if='item.name=="guide"'>
              <span>启动指南</span>
            </template>
            <template v-else-if='item.name=="tools"'>
              <span>工具箱</span>
            </template>
            <template v-else>
              {{item.name}}<div class='fa fa-remove' @click="removeTab(item)"></div>
            </template>
          </span>
        </swiper-slide>
      </swiper>
      <div class='aside-list'>
        <div class='aside-list_item' v-for="(item, index) in tabs" :key="index" v-show='selected == index'>
          <template v-if='item.name=="command"'>
            <Command></Command>
          </template>
          <template v-else-if='item.name=="codeif"'>
            <iframe :src="item.url"></iframe>
          </template>
          <template v-else-if='item.name=="guide"'>
            <Guide></Guide>
          </template>
          <template v-else-if='item.name=="tools"'>
            <Tools></Tools>
          </template>
          <template v-else>
            <iframe :src="item.url"></iframe>
          </template>
        </div>
      </div>
  </div>
</template>

<script>
import Command from './command/Command.vue'
import Guide from './guide/Guide.vue'
import Tools from './tools/Tools.vue'
import { Aside } from "./index";

export default {
  name: 'Aside',
  data() {
    return {
      aside: new Aside(this._uid),
      selected: 0,
      swiperOption: {
        slidesPerView: 'auto',
        calculateHeight: true
      },
    }
  },
  computed: {
    tabs () {
      return this.aside.tabs || []
    }
  },
  methods: {
    selectedItem (index) {
      if (index > this.tabs.length - 1) {
        this.selected = 1
      } else {
        this.selected = index
      }
    },
    removeTab (item) {
      this.aside.removeTab(item)
    }
  },
  created() {
    this.aside.created()
  },
  mounted() {
    this.aside.mounted()
  },
  watch: {
    tabs (val) {
      if (val.length > 2) {
        this.selected = val.length - 1
        this.$nextTick(() => {
          var width = this.$refs.swiper.swiper.wrapper.clientWidth - this.$refs.swiper.swiper.container.clientWidth
          this.$refs.swiper.swiper.setWrapperTranslate(- Math.max(0, width))
        });
        // this.$refs.swiper.swiper.swipeTo(val.length - 1, 1000 ,false)
      } else {
        this.$nextTick(() => {
          this.selected = 0
        });
      }
    }
  },
  components: {Command,Guide,Tools}
}
</script>

<style lang="less">
  
.swiper-slide{
  width: auto;
  span{
    margin-top:5px;
    padding: 6px 10px 6px 10px;
    display: inline-block;
    color: #b7b7b7;
    cursor: pointer;
    font-size: 12px;
    line-height:20px;
    min-width: 80px;
    &.active{
      color: #326c2f;   
      background: #fff;
      border-top-left-radius:  5px;
      border-top-right-radius:  5px;
      border-top: 1px solid #d7d7d7;
      border-left: 1px solid #d7d7d7;
      border-right: 1px solid #d7d7d7;
    }
    .fa.fa-remove{
      margin-left: 5px;
    }
  }
}
.aside-list{
  position: absolute;
  top: 55px;
  bottom: 0;
  left:0;
  right:0;
  overflow: hidden;
  .aside-list_item{
    width: 100%;
    height: 100%;
    overflow: auto;
    word-break: break-all;
    word-wrap: break-word;
    iframe{
      width: 100%;
      height: 100%;
      border:0;
    }
  }
}
</style>
