const multer=require("multer");

//文件上传模块的配置

const storage=multer.diskStorage({
    destination:function (req,file,cb) {
        // console.log(file);
        cb(null,"./public/upload");//用于保存上传的文件
    },
    filename:function (req,file,cb) {
        // console.log(file);
        let fileFormat=(file.originalname).split(".");
        cb(null,fileFormat[0]+"-"+Date.now()+"."+fileFormat[fileFormat.length-1]);

    }
});

//将配置匹配给multer对象
const upload=multer({
    storage:storage
});
//公开配置
module.exports=upload;