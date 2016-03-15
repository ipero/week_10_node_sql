$(document).ready(function() {

    $('#submit-button').on('click', postData);
    getData();

});

function postData() {
    event.preventDefault();

    var values = {};
    $.each($('#sql-form').serializeArray(), function(i, field) {
        values[field.name] = field.value;
    });

    console.log(values);

    $.ajax({
        type: 'POST',
        url: '/people',
        data: values,
        success: function(data) {
            if(data) {
                // everything went ok
                console.log('from server:', data);
                getData();
            } else {
                console.log('error');
            }
        }
    });

}

function getData() {
    $.ajax({
        type: 'GET',
        url: '/people',
        success: function(data) {
            console.log(data);
            appendToDom(data);

        }
    });
}

function appendToDom(peopleList){
  $('.people-list').empty();
  for(var i=0; i<peopleList.length; i++){
    $('.people-list').append('<li style="line-height: 2em">'+peopleList[i].name+', '+peopleList[i].address+
    ', '+peopleList[i].city+', '+peopleList[i].state+', '+peopleList[i].zip_code+'</li>');
  }

}
