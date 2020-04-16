const UserModel = require('../models/userModel')   // 引入用户模型
const jsonwebtoken = require('jsonwebtoken')  // 生成 token
const path = require('path')
const fs = require('fs')

// 注册
exports.register = async (req, res) => {
  // 判断用户是否已经注册
  const { email } = req.body
  const data = await UserModel.findOne({ email })
  if (data) {
    res.send({ code: -1, msg: '用户已经注册了' })
    return
  }
  // 用户没注册，进行注册。  create()写入数据库
  await UserModel.create(req.body)
  // await UserModel.create(Object.assign({}, req.body, {password: bcryptjs.hashSync(req.body.password,10)} ))
  // 密码加密， 也可以去 userSchema 中的 钩子函数实现
  res.send({ code: 0, msg: '注册成功' })
}

// 登录
exports.login = async (req, res) => {
  const { email, password } = req.body
  // 通过 email 去数据库查数据
  const data = await UserModel.findOne({ email })
  if (!data) {
    res.send({ code: -1, msg: '用户邮箱不正确' })
    return
  }
  // 验证密码是否正确 bcryptjs(使用文档上实例化的方法)
  if (!data.comparePassword(password)) {
    res.send({ code: -1, msg: '用户密码错误' })
    return
  }
  // 用户可以登录， 生成 token（参数为 token信息，密钥，失效时间）
  const token = jsonwebtoken.sign({
    userId: data._id,
    nickname: data.nickname
  }, 'mygod', { expiresIn: '2h' })
  res.send({ code: 0, msg: '登录成功', token })
}

// 获取用户信息
exports.getInfo = async (req, res) => {
  // 获取用户id 
  const { userId } = req.auth
  // 查询数据库 , { passwod: 0 } 是将 password 字段在返回中剔除掉
  const data = await UserModel.findOne({ _id: userId }, { password: 0 })
  // 响应
  res.send({
    code: 0,
    msg: 'OK',
    data
  })
}

// 修改用户信息
exports.update = async (req, res) => {
  // 1. 获取用户Id
  const { userId } = req.auth;
  // 定义一个后续有来修改的对象
  let updateData = {};
  // 2. 判断是否有传递头像过来
  if (req.file.path) {
    // 2.1 定义 newFilename 与 newFilepath
    const newFilename = `${req.file.filename}-${req.file.originalname}`;
    const newFilepath = path.resolve(__dirname, "../public", newFilename);

    // 2.2 读文件
    const fileData = fs.readFileSync(req.file.path);

    // 2.3 写文件
    fs.writeFileSync(newFilepath, fileData);

    // 2.4 给 updateData 中设置 avatar
    updateData.avatar = `http://localhost:3000/${newFilename}`;
  }
  // 3. 修改数据库 (先改再查)
  await UserModel.updateOne({ _id: userId }, updateData);
  const data = await UserModel.findOne({ _id: userId }, { password: 0 });
  // 4. 响应给前端
  res.send({
    code: 0,
    msg: "修改成功",
    data
  });
};
