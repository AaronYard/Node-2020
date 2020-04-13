
$(function () {

  let pageNum = 1   // 当前页码数
  let totalPage = 1 // 总页数

  $.get('http://localhost:3000/posts', function (res) {
    if(res.code === 0) {
      // 帖子列表数据
      let html = ''
      res.data.list.forEach((item, i) => {
        html += `
        <li class="list-group-item flex-column align-items-start py-3">
        <div class="d-flex justify-content-between">
          <a class="text-dark w-75" href="./show.html?id=${item._id}">
            <h4>${item.title}</h4>
          </a>
          <small class="text-black-50 text-right">${moment(item.updatedAt).format('YYYY-MM-DD hh-mm-ss')}</small>
        </div>
        <div class="font-weight-light text-truncate">${item.content}</div>
        </li>
        `
      })
      $('.list-group').html(html)

      // 分页数据
      totalPage = res.data.totalPage
      let pageHtml = ''
      // 上一页
      pageHtml += `
        <li data-page="${pageNum > 1 ? pageNum-1: 1}" class="page-item"><a class="page-link" href="javascript:;">Prev</a></li>
      `
      for(let i=0; i<totalPage; i++) {
        pageHtml += `
          <li  data-page="${i+1}" class="page-item ${i+1 === pageNum ? 'active': ''}">
            <a class="page-link" href="javascript:;">${ i+1 }</a>
          </li>
        `
      }
      // 下一页
      pageHtml += `
        <li data-page="${pageNum < totalPage? pageNum+1: totalPage}" class="page-item"><a class="page-link" href="javascript:;">Next</a></li>
      `
      // 写入页面中
      $('.pagination').html(pageHtml)
    }
  })

  // 监听分页按钮的点击事件 
  // 需要使用事件委托的方法，去找一个默认在页面上就存在的元素
  $('.pagination').on('click', '.page-item', function() {
    // 自定义属性，知道我点击的是要去获取那一页的数据
    // $(this).data('page') 获者  $(this).attr('data-page')
    const toPage = $(this).attr('data-page')
    $.get('http://localhost:3000/posts', { pageNum: toPage}, function(res) {
      if (res.code === 0) {
        // 帖子列表数据
        let html = ''
        res.data.list.forEach((item, i) => {
          html += `
        <li class="list-group-item flex-column align-items-start py-3">
        <div class="d-flex justify-content-between">
          <a class="text-dark w-75" href="./show.html">
            <h4>${item.title}</h4>
          </a>
          <small class="text-black-50 text-right">${moment(item.updatedAt).format('YYYY-MM-DD hh-mm-ss')}</small>
        </div>
        <div class="font-weight-light text-truncate">${item.content}</div>
        </li>
        `
        })
        $('.list-group').html(html)

        // 分页数据
        totalPage = res.data.totalPage
        let pageHtml = ''
        // 上一页
        pageHtml += `
        <li data-page="${pageNum > 1 ? pageNum - 1 : 1}" class="page-item"><a class="page-link" href="javascript:;">Prev</a></li>
      `
        for (let i = 0; i < totalPage; i++) {
          pageHtml += `
          <li  data-page="${i + 1}" class="page-item ${i + 1 === pageNum ? 'active' : ''}">
            <a class="page-link" href="javascript:;">${ i + 1}</a>
          </li>
        `
        }
        // 下一页
        pageHtml += `
        <li data-page="${pageNum < totalPage ? pageNum + 1 : totalPage}" class="page-item"><a class="page-link" href="javascript:;">Next</a></li>
      `
        // 写入页面中
        $('.pagination').html(pageHtml)
      }
    })
  })
})