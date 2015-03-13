$(function(){
  $('#create_entry').on('click', function(event){
    insert_entry();
  });
  $('#list-entry').on('click', function(event){
    list_entry();
  });

});

function insert_entry() {
  $('#result_log').empty();
  var siteId = $('#entry .blog_id').val();
  var title = $('#title').val();
  var body = $('#body').val();
  var status = $('.status:checked').val();
  var convert_breaks = $('#convert_breaks').val();
  var data = {
    'title': title,
    'body': body,
    'status': status,
    'convert_breaks': convert_breaks
  }

  api.createEntry(siteId, data, function(response) {
      if(response.error){
          // エラー処理
          alert(response.error.message);
          return;
      }
  });

  list_entry();
}

function list_entry() {
  $('#result_log').empty();

  var siteId = $('#entry .blog_id').val();
  var data = {
    'limit': 0
  }

  api.listEntries(siteId, data, function(response) {
      if(response.error){
          // エラー処理
          alert(response.error.message);
          return;
      }
      var tbody = $('#entry table tbody');
      tbody.empty();
      for (var i = 0; i < response.totalResults; i++) {
        var entry = response.items[i];
        var title = entry.title;
        if(title == ""){
          title = "...";
        }
        var tr = $('<tr>');
        tr.append($('<td>').text(entry.id));
        tr.append($('<td>').append('<i class="fa fa-external-link"></i><a href="' +entry.permalink+'" target="_blank">'+title+'</a>'));
        tr.append($('<td>').text(entry.date));
        tr.append($('<td>').text(entry.status));
        tbody.append(tr);
      }
  });
}
