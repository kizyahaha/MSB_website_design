var a = '';
$.ajax({
    type: "GET",
    url: "/main/simple",
    dataType: 'text',
    success: function(data, textStatus, jqXHR) {
        alert(data);
        return void 0;
    },
    error: function(jqXHR, textStatus, errorThrown) {
        alert(errorThrown);
        return void 0;
    }
});
