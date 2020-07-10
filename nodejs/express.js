const express=require("express");//加载express 资源
const app=express();
const logger=require("morgan");//日志模块
const favicon=require("serve-favicon");//小图标
const bodyParser=require("body-parser");
const route=require("./routes/router");
const path=require("path");
const session=require("express-session");
const cookieParser=require("cookie-parser");
const ws=require("ws");
app.use(logger("dev"));//调用日志，配置为dev模式

//配置cookie,session
app.use(cookieParser());
app.use(session({
  name:"demo223",
  secret:"123123123",//秘钥
  resave:true,//是否更新session-cookie的失效时间
  saveUninitialized:true,//未初始化cookie要不要保存，无论有没有设置session cookie,每次请求都设置个 session cookie
  cookie:{
    maxAge:1000*60*60*24*30,//cookie有效时间，单位是毫秒
    rolling:true,//更新保存，按照原设定的maxAge值重新设定session同步到cookie中
  }
}));

app.set("views",path.join(__dirname,"views"));//视图文件路径
//视图解析引擎
app.set("view engine","ejs");


//使用处理post请求的模块
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use("*",(req,resp,next)=>{
    resp.header("Access-Control-Allow-Origin","*");
    resp.header("Access-Control-Allow-Methods"," GET, POST, PUT,DELETE,OPTIONS,PATCH");
    resp.header("Access-Control-Allow-Headers"," Origin, X-Requested-With, Content-Type, Accept, Authorization");
    resp.header("Content-Type","application/json;charset=utf-8");
    next()
});
app.use(route);
app.use(express.static(__dirname+"/public"));
app.use(express.static(__dirname+"/public/html"));
app.use(express.static(__dirname+"/public/css"));
app.use(express.static(__dirname+"/public/images"));
app.use(express.static(__dirname+"/public/fonts"));
app.use(express.static(__dirname+"/public/jQuery"));
app.use(express.static(__dirname+"/public/js"));
app.use(favicon(__dirname+"/public/images/favicon.ico"));
app.set("port",8888);
app.listen(8888,()=>{
  console.log("进入服务器")
});

//配置websocket
const Ws=new ws.Server({
  host:"localhost",
  port:8088
});

let arr=Array();

 Ws.on("connection",function (ws) {
   console.log("=============");
  arr.push(ws);
  ws.on("message",function (data) {
    console.log(data);
    for(let i=0;i<arr.length;i++){
      arr[i].send(data);//ws的send方法，可以将受到的data消息发送出去
    }
  });
  ws.on("close",function () {
    for(let i=0;i<arr.length;i++){
      if(arr[i]==ws){
        arr.splice(i,1);
        break;
      }
    }
  })
});