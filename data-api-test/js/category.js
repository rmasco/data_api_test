$(function(){
  $('#list-category').on('click', function(event){
    list_category();
  });

});


function list_category() {
  $('#result_log').empty();

  var siteId = $('#category .blog_id').val();
  var data = {};
  api.listCategories(siteId, data, function(response) {
      var tbody = $('#category table tbody');
      tbody.empty();
      if(response.error){
          // エラー処理
          alert(response.error.message);
          return;
      }
      if(response.totalResults == 0){
        alert("category is not found.");
      }

      // <td>id</td>
      // <td>label</td>
      // <td>class</td>
      // <td>basename</td>

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
