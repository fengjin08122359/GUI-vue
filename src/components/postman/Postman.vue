<template>
  <div class="postman">
    <BackCol></BackCol>
    <Upload v-on:uploadChange='handleUpload'></Upload>
    <el-button @click='multiDel'>批量删除</el-button>
    <el-button @click='exportZip'>导出</el-button>
    <el-table
      :data="postman.list"
      stripe
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55">
      </el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          HttpCode:
          <div>{{getHttpCode(props.row)}}</div>
          AxiosCode:
          <div>{{getAxiosCode(props.row)}}</div>
        </template>
      </el-table-column>
      <el-table-column  prop="id" label="id" width='120'>
      </el-table-column>
      <el-table-column  prop="name" label="name" width='180'>
      </el-table-column>
      <el-table-column  prop="type" label="type" width='120'>
      </el-table-column>
      <el-table-column  prop="url" label="url" >
      </el-table-column>
      <el-table-column  label="data"  width='180' >
        <template slot-scope="scope">
          <div style='max-height: 100px;'>{{ JSON.stringify(scope.row.data) }}</div>
        </template>
      </el-table-column>
      <el-table-column   label="modify">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row, 'edit')" type="text" size="small">编辑</el-button>
          <el-button @click="handleClick(scope.row, 'test')" type="text" size="small">测试</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogVisible">
      <el-row>
        <el-input v-model='current.name'><template slot='prepend' >名称(只支持大小写与数字):</template></el-input>
        <el-input v-model='current.url'><template slot='prepend' >地址:</template></el-input>
        <el-select v-model='current.type' >
          <el-option
            v-for="(item, index) in options"
            :key="index"
            :label="item.name"
            :value="item.value">
          </el-option>
        </el-select>
      </el-row>
      <el-button @click='current.addData()'>addData</el-button>
      <el-row v-for="(item, index) in current.array" :key="index">
        <el-col :span='10'><el-input v-model='item.name'><template slot='prepend' >name:</template></el-input></el-col>
        <el-col :span='10'><el-input v-model='item.value'><template slot='prepend' >value:</template></el-input></el-col>
        <el-col :span='4'><el-button @click="current.delData(index)">del</el-button></el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false;save()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Upload from '@/components/upload/Upload'
import { Postman } from "./index";
export default {
  name: 'Postman',
  data() {
    var postman = new Postman(this._uid)
    return {
      _uid: '',
      postman: postman,
      url: '/postman/upload',
      dialogVisible: false,
      current: postman.manage({}),
      options: [{
        name: 'get',
        value: 'get'
      },{
        name: 'post',
        value: 'post'
      },{
        name: 'postJson',
        value: 'postJson'
      },{
        name: 'postForm',
        value: 'postForm'
      }],
      multipleSelection: [],
    }
  },
  props: ['path', 'target'],
  created() {
    this.postman.created()
  },
  mounted() {
    this.postman.mounted()
    this.postman.switchRoute(this.path, this.target)
  },
  activated() {
  },
  methods: {
    getHttpCode (item) {
      var inArray = []
      var outArray = []
      for (const key in item.data) {
        if (item.data.hasOwnProperty(key)) {
          inArray.push(`${key}='${item.data[key]}'`)
          outArray.push(`${key}`)
        }
      }
      return `${item.name} ({${inArray.join(',')}}){
        return httplink('${item.name}', \`${item.url}\`,{${outArray.join(',')}}, '${item.type}')
      },
      `
    },
    getAxiosCode (item) {
      var inArray = []
      var outArray = []
      for (const key in item.data) {
        if (item.data.hasOwnProperty(key)) {
          inArray.push(`${key}='${item.data[key]}'`)
          outArray.push(`${key}`)
        }
      }
      return `var ${item.name} = ({${inArray.join(',')}}) => {
  return httpInstance.${item.type}(\`${item.url}\`, {${outArray.join(',')}})
};
`
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleUpload (val) {
      this.postman.saveList(val)
    },
    handleClick (data, event) {
      this.current = this.postman.manage(data);
      if (event == 'edit') {
        this.dialogVisible = true
      } else if (event == 'test') {
        this.postman.test(data.id)
      }
    },
    exportZip (){
      this.postman.exportZip(this.$route.params.id)
    },
    save () {
      var pattern=new RegExp("^[0-9a-zA-Z]+$");
      if (pattern.test(this.current.name)) {
        this.postman.saveSingle(this.current);
      }else {
        alert('只支持大小写与数字')
      }
    },
    multiDel () {
      if (this.multipleSelection.length > 0) {
        this.postman.delMul(this.multipleSelection.reduce((total, current) => {total.push(current.id);return total} ,[]))
      }
    }
  },
  components: {Upload},
  watch: {
    path (val) {
      this.postman.switchRoute(val, this.target)
    },
    target (val) {
      this.postman.switchRoute(this.path, val)
    },
  },
}
</script>

<style>

</style>
