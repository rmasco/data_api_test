$(function(){
  jQuery('#btn').on('click', function(event){
    upload_asset();
  });
  jQuery('#list-asset').on('click', function(event){
    list_asset();
  });

});

function upload_asset() {
  $('#result_log').empty();

  var siteId = $('#asset .blog_id').val();
  var files = document.getElementById("file").files;
  for (var i = 0; i< files.length; i++){
    var rename = $('#auto_rename').val() ? true : false;
    var data = {
      file: files[i], // File object
      path: "",
      autoRenameIfExists: rename,
      normalizeOrientation: true,
      site_id: siteId
    };
    api.uploadAsset(data, function(response) {
      if (response.error) {
        // エラー処理
        $('#result_log').append($('<p>').append("<div class=\"alert alert-danger\">code：" + response.error.code + "<br />message:" + response.error.message+"</div>"))
        return;
      }
      var img_box = $('<div>').attr('class','col-xs-3 col-md-1');
      var img_link = $('<a>').attr('href',response.url).attr('class','thumbnail').attr('target','_blank');
      img_link.append($('<img>').attr('src',response.url).attr('style','width:100%').attr('display','block'));
      img_box.append(img_link);
      $('#result').append(img_box);
      $('#result_log').append($('<p>').append("<div class=\"alert alert-success\">" + response.filename+"をアップロードしました！</div>"));
    });
  }
  $('#result_log').append($('<p>').append("タスクが完了しました"));

}

function list_asset() {
  $('#result_log').empty();

  var siteId = $('#asset .blog_id').val();
  var data = {
    limit: 0
  }
  api.listAssets(siteId, data, function(response) {
      if(response.error){
          // エラー処理
      }
      var tbody = $('#asset table tbody');
      tbody.empty();
      for (var i = 0; i < response.totalResults; i++) {
        var asset = response.items[i];
        var tr = $('<tr>');
        tr.append($('<td>').text(asset.id));
        tr.append($('<td>').append('<i class="fa fa-external-link"></i><a href="' +asset.url+'" target="_blank">'+asset.label+'</a>'));
        tr.append($('<td>').text(asset.filename));
        tr.append($('<td>').text(asset.type));
        tbody.append(tr);
      };
  });

}
