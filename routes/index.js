var express = require("express");
const multer = require("multer");
var router = express.Router();
const rootDir = process.cwd();
// multer处理中文文件名乱码 解决办法
// const jschardet = require("jschardet");
// const iconv = require("iconv-lite");
const { addFiles, getFileList } = require("../sql/mongodb");
// 将上传的文件保存到指定目录
const storage = multer.diskStorage({
  //自定义存储位置
  destination: function (req, file, cb) {
    cb(null, "files");
  },
  //自定义上传文件的重命名
  filename: function (req, file, cb) {
    let { originalname } = file;
    // const encoding = jschardet.detect(originalname).encoding;
    // file.originalname = iconv.decode(Buffer.from(originalname), encoding);
    cb(null, Date.now() + originalname.slice(originalname.lastIndexOf(".")));
    // cb(null, file.originalname);
  },
});
// jschardet.detect() 方法可以自动检测文件名字符串的编码格式，并返回相应的编码方式；
// iconv.decode() 方法则将文件名字符串转换为指定编码方式的字符串，这里我们选择了 UTF-8 编码。

const upload = multer({ storage });

router.post("/upload", upload.array("files"), async function (req, res) {
  // console.log("req.files", req.files);
  if (!req.files) {
    return res.status(500).json({ message: "Files Invalid" });
  }
  await addFiles(req.files);
  res.status(200).json({ message: "successful" });
});

router.post("/allFiles", async function (req, res) {
  const data = (await getFileList()).map((obj) => ({
    id: obj._id,
    size: obj.size,
    filename: obj.filename,
    originalname: obj.originalname,
  }));
  res.status(200).json(data);
  // res.render("index", { title: "Express" });
});
// 定义动态路由
router.get("/files/:filename", function (req, res) {
  const filename = req.params.filename;
  res.setHeader("Content-type", "application/octet-stream");
  //！！！响应头里不允许带中文
  res.setHeader("Content-Disposition", `attachment;filename=${filename}`);
  res.sendFile(rootDir + `/files/${filename}`);
});
module.exports = router;
