function sendToDB() {

  $.post("db",
      {name:"ravi",comment:"124"},
      //$(formData).serialize(),
      //formData,
      function(data, textStatus, jqXHR) {
          console.log('POST function from postIt function succeeded!');
          console.log(data + ' arrived at server!');
      }
      //.fail(function(jqXHR, textStatus, errorThrown) {
      //     console.log(textStatus);
      // })
  );


    // $.ajax({
    //   // url: 'postgres://postgres:discos@localhost:5432/postgres',
    //   url: './db',
    //   dataType: 'json',
    //   type: 'POST',
    //   data: 'testing',
    //   success: function() {
    //     console.log('Nice job!');
    //   },
    //   error: function(xhr, status, err) {
    //     console.log('You suck!');
    //   }
    // });

}
