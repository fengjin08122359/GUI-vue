var request = require("request"); 
var fs = require('fs');
var path = require('path');
var postman = {
  getJson (target) {
    var jsonPath =  path.resolve(target.path,  target.name, 'postman.json')
    var pe = fs.existsSync(jsonPath)
    if (!pe) {
      fs.writeFileSync(jsonPath, '[]')
    }
    return jsonPath
  },
  saveList (val) {
    return new Promise(resolve => {
      var jsonPath = this.getJson(val.target)
      var targetPath = val.data.upload;
      var result = fs.readFileSync(targetPath, 'utf-8')
      try{
        if (JSON.parse(result)) {
          analysisJson(jsonPath, JSON.parse(result));
        } 
      }catch(error){
      }
      resolve({})
    })
  },
  saveSingle (val) {
    return new Promise(resolve => {
      var jsonPath = this.getJson(val.target)
      saveSingle(jsonPath, val.data.id, val.data).then(res=>{
        resolve({})
      })
    })
  },
  del (val) {
    return new Promise(resolve => {
      var jsonPath = this.getJson(val.target)
      val.data.ids.forEach(async id => {
        await delSingle(jsonPath, id);
      })
      resolve({})
    })
  },
  getList (val) {
    return new Promise((resolve) => {
      var jsonPath = this.getJson(val.target)
      getList(jsonPath).then(res=>{
        resolve(res)
      })
    })
  },
  test (val) {
    return new Promise((resolve) => {
      var jsonPath = this.getJson(val.target)
      getSingle(jsonPath, val.data.id).then(res=>{
        console.log(res)
        if (res) {
          new HttpLink(res).test().then(data => {
            console.log(res)
            resolve(data)  
          }) 
        } else {
          resolve({})  
        }
      })
    })
  },
  export (val) {
    return new Promise((resolve) => {
      var jsonPath = this.getJson(val.target)
      getList(jsonPath).then(data=>{
        var nameList= [];
        data.forEach(item => {
          if (item.name != '') {
            if (nameList.filter(target => target.name == item.name).length == 0) {
              nameList.push({
                name: item.name,
                time: 0
              })
            } else {
              var t = nameList.filter(target => target.name == item.name)[0]
              t.time++
              item.name = item.name + '_' + t.time
            }
          }
        })
        let httpConfig = ''
        let axiosConfig = ''
        let axiosExportConfig = ''
        data.forEach(item => {
          var inArray = []
          var outArray = []
          for (const key in item.data) {
            if (item.data.hasOwnProperty(key)) {
              inArray.push(`${key}='${item.data[key]}'`)
              outArray.push(`${key}`)
            }
          }
          httpConfig += `${item.name} ({${inArray.join(',')}}){
            return httplink('${item.name}', \`${item.url}\`,{${outArray.join(',')}}, '${item.type}')
          },
          `
          axiosConfig += `export const ${item.name} = ({${inArray.join(',')}}) => {
        return httpInstance.${item.type}(\`${item.url}\`, {${outArray.join(',')}})
      };0
      `
          axiosExportConfig += `${item.name},
      `
        });

        resolve({
          http: exportConfig.getHttpText(httpConfig),
          axios: exportConfig.getAxiosText(axiosConfig, axiosExportConfig)
        })
      })
    })
  }
}

var exportConfig = {
  axios: `import axios from 'axios'
  import qs from 'qs'
  //默认
  var postFormInstance = axios.create({
    headers: {
      'Content-Type': 'multipart/form-data'
    },
  })
  //json
  var postJsonInstance = axios.create({
    headers: {
      'Content-Type': 'application/json'
    },
  });
  var postInstance = axios.create({
    timeout: 15000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    transformRequest: [function (data, headers) {
      return qs.stringify(data);
    }],
  });
  
  const httpInstance = {
    post(url, params) {
      return postInstance.post(url, params)
    },
    postJson(url, params) {
      return postJsonInstance.post(url, params)
    },
    postForm(url, params) {
      return postFormInstance.post(url, params)
    },
    get(url, params) {
      return postInstance.get(url, params)
    },
  }
  
  /* http start */
  /* http end */
  `,
  http: `import {httplink, Handle} from 'nclient-microfront'

  var http = new Handle({
    /* http start */
    /* http end */
  })
  
  export default http`,
  getHttpText(routerConfig) {
    return this.http.replace(/\/\* http start \*\/([\s\S]*)\/\* http end \*\//g,`\r\n${routerConfig}\r\n`)
  },
  getAxiosText(routerConfig, exportConfig) {
    return this.axios.replace(/\/\* http start \*\/([\s\S]*)\/\* http end \*\//g,`\r\n${routerConfig}\r\n`).replace(/\/\* export start \*\/([\s\S]*)\/\* export end \*\//g,`\r\n${exportConfig}\r\n`)
  },
}

var db = {
  get(path) {
    var result = fs.readFileSync(path, 'utf-8')
    return JSON.parse(result);
  },
  set(path, data) {
    fs.writeFileSync(path, JSON.stringify(data))
  },
  getList (path) {
    var list = this.get(path)
    return list
  },
  getSingle (path, id) {
    var list = this.get(path)
    return list.filter(item => item.id == id)[0]
  },
  delSingle (path, id) {
    var list = this.get(path)
    if (!id) return
    var result = list.filter(item => {
      return item.id != id
    }) 
    this.set(path, result)
  },
  saveSingle (path, id, target) {
    target.id = id
    var list = this.get(path)
    var hasList = false;
    var result = list.reduce((total, item) => {
      if (item.id == id) {
        item = target
        hasList = true
      }
      total.push(item)
      return total
    }, [])
    if (!hasList) {
      result.push(target)
    }
    this.set(path, result)
  },
}
function formatParams(data) {
  var arr = [];
  for(var name in data){
    if (data[name] != undefined) {
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
  }
  return arr.join("&");
}

class HttpLink {
  constructor (json) {
    this.id = json.id || `httplink${new Date().getTime()}`
    this.name = json.name || ''
    this.type = json.type || ''
    this.url = json.url || ''
    this.data = json.data || {}
  }
  async save(routerId, json) {
    if (json) {
      this.name = json.name || this.name
      this.type = json.type || this.type
      this.url = json.url || this.url
      this.data = json.data || this.data
    }
    await db.saveSingle(routerId, this.id, this)
  }
  async test () {
    if (this.type == 'get') {
      return await this.sendGet()
    } else if (this.type == 'post') {
      return await this.urlencoded()
    } else if (this.type == 'postJson') {
      return await this.sendPost()
    } else if (this.type == 'postForm') {
      return await this.formData()
    }
  }
  sendGet () {
    return new Promise(resolve => {
      request(this.url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body)
        }
      })
    })
  }
  sendPost () {
    return new Promise(resolve => {
      request({
        url: this.url,
        method: "POST",
        json: true,
        headers: {
            "content-type": "application/json",
        },
        body: JSON.stringify(this.data)
      }, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body)
        }
      });
    })
  }
  urlencoded () {
    return new Promise(resolve => {
      request.post({url:this.url, form:this.data}, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          resolve(body)
        }
      })
    })
  }
  formData () {
    return new Promise(resolve => {
      request.post({url:this.url, formData: this.data}, function (error, response, body) {  
        if (!error && response.statusCode == 200) {
          resolve(body)
        }
      })
    })
  }
}

class REQUEST {
  constructor (item, name) {
    this.receive = item;
    this.request = this.receive.request;
    this.alias = '';
    var pattern=new RegExp("^[0-9a-zA-Z]+$");
    if (pattern.test(item.name)) {
      this.name = item.name
    }else {
      this.name = 'test';
    }
    this.url = '';
    this.proxy = ''
    this.data = {};
    this.type = 'get';
    this.response = ''
    this.host = ''
    this.port = ''
    this.protocol = 'http'
    this.path = ''
    this.header = [];
    this.httplink =  new HttpLink({})
    this.httplink.name = this.name
    this.manageHost()
    this.manageType()
    this.manageData()
  }
  manageHost () {
    this.host = this.request.url.host.join('.')
    this.port = this.request.url.port || this.port
    this.protocol = this.request.url.protocol || this.protocol
    this.path = this.request.url.path.join('/')
    this.proxy = this.protocol + '://' + this.host + (this.port ? (':'+  this.port) : '')
    this.url = this.proxy + '/' + this.path
    this.httplink.url = this.url
  }
  manageType () {
    var methodType = this.request.method || this.type
    this.type = methodType.toLowerCase() 
    this.httplink.type = this.type
    if (this.type == 'post') {
      if (this.request.body.mode == 'binary') {
        this.httplink.type = 'postForm'
      } else if (this.request.body.mode == 'formdata') {
        this.httplink.type = 'postJson'
      }
    }
  }
  manageData () {
    var body = this.request.body
    var query = this.request.url.query
    if (query) {
      var queryList = query.reduce((total, item) => {
        total[item.key] = item.value
        return total
      },{})
      if (this.type == 'get') {
        this.data = queryList
      } else if (this.type == 'post') {
        this.url = this.url + (this.url.indexOf('?')>-1?'&':'?') +formatParams(queryList)
        this.httplink.url = this.url
      }
    } 
    if (body) {
      if (typeof body[body.mode] == 'string') {
        if (body[body.mode]) {
          this.data = eval('('+body[body.mode]+')') 
        }
      } else if (body[body.mode] instanceof Array) {
        this.data = body[body.mode].reduce((total, item) => {
          total[item.key] = item.value
          return total
        },{})
      }
    }
    this.httplink.data = this.data || {}
  }
  async test () {
    return await this.httplink.test()
  }
}



async function analysisJson(routerId, json) {
  for(let item of json.item){
    if (!item.item) {
      var target = analysis(item, json.info ? json.info.name: json.name)
      await target.httplink.save(routerId)
    } else {
      await analysisJson(routerId, item)
    }
  }
}

function analysis(item, name) {
  return new REQUEST(item, name)
}

async function getList(routerId) {
  return await db.getList(routerId)
}
async function getSingle(routerId, id) {
  return new  HttpLink(await db.getSingle(routerId, id) || {})
}
async function delSingle(routerId, id) {
  return await db.delSingle(routerId, id)
}

async function saveSingle(routerId, id, target) {
  return await db.saveSingle(routerId, id, target)
}


module.exports = postman
