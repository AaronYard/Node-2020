$(function() {
  $('#login-btn').click(function () {
    $.ajax({
      url: '/login',
      type: 'POST',
      data: {
        email: $('#inputEmail').val(),
        password: $('#inputPassword').val()
      },
      success: function (res) {
        if(res.code !== 0) {
          alert(res.msg)
          return
        }
        // 登录成功后, 将 token 写入 cookie, 并 跳转到首页
        Cookies.set('token', res.token)
        window.location.href = '/post/index.html'
      }
    })
  })
})