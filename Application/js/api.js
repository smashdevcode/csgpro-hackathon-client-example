
function API ($) {
    var self = this,
        url = 'https://csgprohackathonapi.azurewebsites.net/api/';












    self.post = function (controller, json) {
        $.ajax({
            type: 'POST',
            data: jsonDataString,
            url: url + controller,
            contentType: 'application/json',
            success: function (data, success, xhr) {
                console.log(data);
            },
            error: function (xhr, status, errorThrown) {
                console.log(status);
                console.log(errorThrown);
            },
            statusCode: {
                200: function (data, success, xhr) {
                    console.log(data);
                },
                201: function (data, success, xhr) {
                    console.log(data);
                },
                400: function (xhr, status, errorThrown) {
                    console.log(status);
                    console.log(errorThrown);
                },
                500: function (xhr, status, errorThrown) {
                    console.log(status);
                    console.log(errorThrown);
                }
            }
        });
    };
}
