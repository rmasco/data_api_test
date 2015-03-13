$(function(){
  $('#list-category').on('click', function(event){
    list_category();
  });

});


function list_category() {
  $('#result_log').empty();

  var siteId = $('#category .blog_id').val();
  var data = {
    'limit': 0
  }

  api.listCategories(siteId, data, function(response) {
      if(response.error){
          // エラー処理
      }

      // <td>id</td>
      // <td>label</td>
      // <td>class</td>
      // <td>basename</td>

      var tbody = $('#category table tbody');
      tbody.empty();
      for (var i = 0; i < response.totalResults; i++) {
        var cat = response.items[i];
        var tr = $('<tr>');
        tr.append($('<td>').text(cat.id));
        tr.append($('<td>').append('<i class="fa fa-external-link"></i><a href="' +cat.archiveLink+'" target="_blank">'+cat.label+'</a>'));
        tr.append($('<td>').text(cat.class));
        tr.append($('<td>').text(cat.basename));
        tbody.append(tr);
      }
  });
}
