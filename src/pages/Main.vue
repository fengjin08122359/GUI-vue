<template>
  <div id="Main">
    <div class='left'>
      <keep-alive>
        <router-view class='routerView'></router-view>
      </keep-alive>
    </div>
    <div class='right'>
      <Aside></Aside>
    </div>
  </div>
</template>

<script>
import Aside from '@/components/aside/Aside.vue'
import {mapActions} from 'vuex'
export default {
  name: 'Main',
  data () {
    return {}
  },
  mounted() {
    this.init()
  },
  methods: {
    ...mapActions({
      init: 'main/init'
    })
  },
  components:{Aside}
}
</script>

<style lang='less'>
#Main {
  width: 100%;
  height: 100%;
  .left {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 30%;
    left: 0;
  }
  .right {
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    width:30%;
  }
}
</style>
