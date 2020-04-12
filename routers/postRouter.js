// post 路由文件
const express = require('express')

// 创建路由实例
const router = express.Router()

// 引入 分离出去的路由回调函数
const { index, create, update, remove } = require('../controllers/postController')

/**
 * @api {get} http://localhost:3000/posts 获取帖子列表
 * @apiName index
 * @apiGroup 帖子
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 * @apiSuccess {Array} data  帖子数组.
 */
router.get('/', index)

/**
 * @api {post} http://localhost:3000/posts 创建帖子
 * @apiName  create
 * @apiGroup 帖子
 * 
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 */
router.post('/', create)

/**
 * @api {put} http://localhost:3000/posts:id 编辑帖子
 * @apiName  update
 * @apiGroup 帖子
 *
 * @apiParam {String} title 帖子标题
 * @apiParam {String} content 帖子内容
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 */
router.put('/:id', update)

/**
 * @api {delete} http://localhost:3000/posts:id 删除帖子
 * @apiName  remove
 * @apiGroup 帖子
 *
 * @apiSuccess {Number} code 状态码.
 * @apiSuccess {String} msg  消息.
 */
router.delete('/:id', remove)

module.exports = router