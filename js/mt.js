var api;
$(function(){
    api = new MT.DataAPI({
      clientId: 'dataapi',
      baseUrl:  'http://'+document.domain+'/cgi-bin/mt/mt-data-api.cgi',
    });
    // ログイン確認
    api.getToken(function(response) {
      if (response.error) {
        var url = api.getAuthorizationUrl(window.location);
        location.href = api.getAuthorizationUrl(location.href);
      }
    });


    api.listBlogsForUser('me', function(response) {
      if (response.error) {
        // エラー処理
        return;
      }
      var blog_selector = $('<select>').attr('name', 'blog_id').attr('class', 'blog_id form-control');
      blog_selector.append($('<option>').val('0').attr('label','システム'));
      for (var i = 0; i< response.totalResults; i++){
        var blog = response.items[i];
        blog_selector.append($('<option>').val(blog.id).attr('label',blog.name));
      }
      $('.blogs').prepend(blog_selector);
      // レスポンスデータを使った処理
    });

});
