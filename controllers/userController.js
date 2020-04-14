const UserModel = require('../models/userModel')

// 注册
exports.register = async (req, res) => {
  // 判断用户是否已经注册
  const {email} = req.body
  const data = await UserModel.findOne({ email })
  if (data) {
    res.send({code: -1, msg: '用户已经注册了'})
    return
  } 
  // 用户没注册，进行注册。  create()写入数据库
  await UserModel.create(req.body)
  // await UserModel.create(Object.assign({}, req.body, {password: bcryptjs.hashSync(req.body.password,10)} ))
  // 密码加密， 也可以去 userSchema 中的 钩子函数实现
  res.send({code: 0, msg: '注册成功'})
}

// 登录
exports.login = async (req, res) => {
  const { email, password }  = req.body
  // 通过 email 去数据库查数据
  const data = await UserModel.findOne({email})
  if(!data) {
    res.send({code: -1, msg: '用户邮箱不正确'})
    return
  }
  // 验证密码是否正确 bcryptjs(使用文档上实例化的方法)
  if (!data.comparePassword(password)) {
    res.send({code: -1, msg:'用户密码错误'})
  } else {
    res.send({code: 0, msg: '登录成功'})
  }
  
}
