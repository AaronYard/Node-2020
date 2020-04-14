// 帖子 路由文件
const express = require('express')
const auth = require('../middlewares/auth')  // 引入 权限验证（token)中间件

// 创建路由实例
const router = express.Router()

// 引入 分离出去的路由回调函数
const { index, create, update, remove, show } = require('../controllers/postController')

/**
 * @api {get} http://localhost:3000/posts 查询帖子
 * @apiGroup 帖子
 * 
 * @apiParam (query) {String} pageNum=1 页码<可选>
 * @apiParam (query) {String} pageSize=2 每页显示条数<可选>
 * @apiParam (query) {String} title 搜索关键字<可选>
 *
 * @apiSuccess {Number} code 状态码
 * @apiSuccess {String} msg  消息
 * @apiSuccess {Object} data 数据
 * @apiSuccess {Array} data[list] 帖子数据
 * @apiSuccess {Number} data[totalPage] 总页数
 */
router.get('/', index)

/**
 * @api {get} http://localhost:3000/posts/:id 帖子详情
 * @apiGroup 帖子
 * 
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 * @apiSuccess {Object} data 更新完成后的帖子信息.
 */
router.get('/:id', show) 

/**
 * @api {post} http://localhost:3000/posts 创建帖子
 * @apiName  create
 * @apiGroup 帖子
 * 
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 * @apiParam (Headers) {String} token token信息
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 */
router.post('/', auth, create)

/**
 * @api {put} http://localhost:3000/posts:id 编辑帖子
 * @apiName  update
 * @apiGroup 帖子
 *
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 * @apiParam (Headers) {String} token token信息
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 */
router.put('/:id', auth, update)

/**
 * @api {delete} http://localhost:3000/posts:id 删除帖子
 * @apiName  remove
 * @apiGroup 帖子
 * 
 * @apiParam (Headers) {String} token token信息
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 */
router.delete('/:id', auth, remove)

module.exports = router