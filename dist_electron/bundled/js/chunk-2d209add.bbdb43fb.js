(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d209add"],{a9a0:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"codeGenerate"},[n("BackCol"),n("el-button",{on:{click:function(t){return e.codeGenerate.start()}}},[e._v("start")]),n("el-button",{on:{click:function(t){return e.codeGenerate.stop()}}},[e._v("stop")]),n("el-button",{on:{click:function(t){return e.refresh()}}},[e._v("open")])],1)},o=[],a=n("34b0"),c=n("34bb");class d extends a["DataHandle"]{constructor(e){super("codeGenerateComp",e)}init(){console.log("CodeGenerate init")}created(){console.log("codeGenerate created")}mounted(){console.log("codeGenerate mounted")}start(){c["ipcRenderer"].send("code-generator",{method:"start",data:{}})}stop(){c["ipcRenderer"].send("code-generator",{method:"stop",data:{}})}}var s={name:"CodeGenerate",data(){return{codeGenerate:new d(this._uid),url:"",rawUrl:"http://127.0.0.1:19090/#/"}},created(){this.codeGenerate.created()},mounted(){this.codeGenerate.mounted(),this.url=this.rawUrl},methods:{refresh(){window.open(this.rawUrl)}}},l=s,u=n("2877"),i=Object(u["a"])(l,r,o,!1,null,null,null);t["default"]=i.exports}}]);