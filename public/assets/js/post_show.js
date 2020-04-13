$(function() {
  // 获取当前帖子的 id 
  const href = window.location.href
  let str = href.split('?')[1]

  // 判断 str 是否存在
  if(!str) {
    alert('请查看是否携带 id')
    return
  }
  // http://localhost:3000/posts?id=1
  // http://localhost:3000/posts?id1=1&id2=2
  let arr = str.split('&')
  
  let result = {}
  arr.forEach(item => {
    let tmp = item.split('=')
    result[tmp[0]] = tmp[1]
  })
  
  // 发送请求 获取详情数据
  const url = `http://localhost:3000/posts/${result.id}`
  $.get(url, function(res) {
    if(res.code === 0) {
      let data = res.data
      let html = `
        <h1 class="mb-5 font-weight-light">${data.title}</h1>
    <div class="py-4">${data.content}</div>
    <div class="border-top py-4 mt-4">
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a href="./edit.html" class="nav-link btn btn-link">Edit</a>
        </li>
        <li class="nav-item">
          <a href="javascript:;" class="nav-link btn btn-link">Delete</a>
        </li>
      </ul>
    </div>
      `
      $('.container').html(html)
    }
  })
  
})