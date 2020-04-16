$(function() {
  // 需要登录
  needLogin()
  // 通过 帖子详情接口 获取帖子信息 来回填编辑框的数据
  // 获取 id
  let id = getId(window.location.href)
  
  $.ajax({
    url: `/posts/${id}`,
    success: function(res) {
      // $('#form-title').prop('value',res.data.title)
      $('#form-title').val(res.data.title)
      $('#form-content').val(res.data.content)
    }
  })

  // 监听 确定按钮的点击， 编辑成功
  $('#edit-post').click(function() {
    $.ajax({
      url: `/posts/${id}`,
      type: 'put',
      data: {
        title: $('#form-title').val(),
        content: $('#form-content').val()
      },
      headers: {
        Authorization: Cookies.get('token')
      },
      success: function(res) {
        if (res.code === 0) {
          alert("更新成功");
          window.location.href = "./index.html";
        } 
      }
      


    })
  })
})