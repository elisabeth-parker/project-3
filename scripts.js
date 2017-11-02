$(document).ready(function(){
    $('#tbl').DataTable( {
      "ajax": 'swdata.txt'
    });
    $('#mobile-tbl').DataTable( {
      "ajax": 'mobile-swdata.txt'
    });
});
