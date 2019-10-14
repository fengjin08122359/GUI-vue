import Vue from 'vue'
import Router from 'vue-router'

const Main = () => import('../pages/Main.vue')
const Dependence = () => import('../pages/dependence/Dependence.vue')
const PortConfig = () => import('../pages/portConfig/PortConfig.vue')
const Menu = () => import('../pages/menu/Menu.vue')
const CodeGenerate = () => import('../pages/codeGenerate/CodeGenerate.vue')

Vue.use(Router);

var router =  new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main,
      children: [{
        path: '/',
        name: 'Dependence',
        component: Dependence,
      },{
        path: '/PortConfig',
        name: 'PortConfig',
        component: PortConfig,
      },{
        path: '/Menu',
        name: 'Menu',
        component: Menu,
      },{
        path: '/CodeGenerate',
        name: 'CodeGenerate',
        component: CodeGenerate,
      }]
    }
  ],
})

router.beforeEach((to, from, next)=>{
  next()
})

export default router