// 用户 路由文件
const express = require('express')
const auth = require('../middlewares/auth')
const multer = require('multer')   // 文件上传插件

const upload = multer({
  dest: './uploads'
})

const router = express.Router()
const {register, login, getInfo, update} =  require('../controllers/userController.js')

/**
 * @api {post} http://localhost:3000/register 用户注册
 * @apiGroup 用户
 *
 * @apiParam (body) {String} email 用户邮箱
 * @apiParam (body) {String} password 用户密码
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 */
router.post('/register', register)

/**
 * @api {post} http://localhost:3000/login 用户登录
 * @apiGroup 用户
 *
 * @apiParam (body) {String} email 用户邮箱
 * @apiParam (body) {String} password 用户密码
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 * @apiSuccess {String} token  token.
 */
router.post('/login', login)

/**
 * @api {get} http://localhost:3000/getInfo 登录用户基本信息
 * @apiGroup 用户
 *
 * @apiParam (Header) {String} Authorization token信息
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 * @apiSuccess {Object} data  当前用户基本信息.
 */
router.get('/getInfo', auth, getInfo)

/**
 * @api {put} http://localhost:3000/users/update 修改当前用户基本信息
 * @apiGroup 用户
 *
 * @apiParam (body) {Object} avatar 用户头像
 * @apiParam (Header) {String} Authorization token信息
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 * @apiSuccess {Object} data  update修改之后的当前用户基本信息.
 */
router.put('/users/update', auth, upload.single('avatar'), update)

module.exports = router