// 用户 路由文件
const express = require('express')
const router = express.Router()

const {register, login} =  require('../controllers/userController.js')

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
 */
router.post('/login', login)

module.exports = router