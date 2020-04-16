$(function() {
  // 获取当前帖子的 id 
  // const href = window.location.href
  // let str = href.split('?')[1]

  // // 判断 str 是否存在
  // if(!str) {
  //   alert('请查看是否携带 id')
  //   return
  // }
  // // http://localhost:3000/posts?id1=1&id2=2
  // let arr = str.split('&')
  
  // let result = {}
  // arr.forEach(item => {
  //   let tmp = item.split('=')
  //   result[tmp[0]] = tmp[1]
  // })

  // 通过 common.js中定义的 getId() 方法获取 id
  const id = getId(window.location.href)
  
  // 发送请求 获取详情数据
  const url = `http://localhost:3000/posts/${id}`
  $.get(url, function(res) {
    if(res.code === 0) {
      let data = res.data
      let html = `
        <h1 class="mb-5 font-weight-light">${data.title}</h1>
    <div class="py-4">${data.content}</div>
    <div class="mt-2 text-black-50">
      <small>${data.userId.nickname}</small>
    </div>
    <div class="border-top py-4 mt-4">
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a href="./edit.html?id=${id}" class="nav-link btn btn-link">编辑</a>
        </li>
        <li class="nav-item">
          <a id="delete-post" href="javascript:;" class="nav-link btn btn-link">删除</a>
        </li>
      </ul>
    </div>
      `
      $('.container').html(html)
    }
  })

  // 删除功能
  $('.container').on('click','#delete-post', function() {
    // 判断是否有登录
    if (!isLogined()) {
      // 没有登录
      alert("请登录");
      window.location.href = "/login.html";
      return;
    }
    // 确认框确认是否删除
    if(!confirm('你确认要删除吗')) {
      // 点击取消，则不做任何操作
      return
    }
    $.ajax({
      url: `/posts/${id}`,
      type: 'delete',
      headers: {
        Authorization: Cookies.get('token')
      },
      success: function (res) {
        if(res.code === 0) {
          alert('删除成功')
          window.location.href = './index.html'
        } else {
          console.log(res);
        }
      }
    })
  })
})