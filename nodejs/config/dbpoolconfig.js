const mysql=require("mysql");
const dbpool={
    pool:{},
    config:{//创建连接池需要用到的参数
        host:"localhost",//主机地址
        port:"3306",//端口
        user:"root",//用户名
        password:"root",//密码
        database:"school"
    },
    create(){
        console.log("创建连接池");
        this.pool=mysql.createPool(this.config)//创建连接池
    },
    connect(sql,arr,fn){
       this.pool.getConnection((err,connection)=>{
           /*发起query数据库语局
           * 1.SQL语局
           * 2.sql参数
           * 3.回调函数，执行完sql语句后调用，把结果注入在回调函数的参数里面，做出响应*/
        connection.query(sql,arr,fn);

        //释放连接
        connection.release();

       })
    }
};
dbpool.create();
module.exports=dbpool;