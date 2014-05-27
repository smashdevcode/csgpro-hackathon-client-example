
function ViewModel () {
    var self = this;

    self.password = new ko.observable();
    self.userName = new ko.observable();
    self.name = new ko.observable();
    self.email = new ko.observable();

    self.register = function () {

        var user = {
            Password: self.password(),
            UserName: self.userName(),
            Name: self.name(),
            Email: self.email(),
            TimeZoneId: "Pacific Standard Time"
        };

        console.log(user);

        var url = "https://csgprohackathonapi.azurewebsites.net/api/users";
        var jsonDataString = JSON.stringify(user);

        $.ajax({
            type: "POST",
            data: jsonDataString,
            url: url,
            contentType: "application/json",
            success: function(data, success, xhr) {
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
                400: function(xhr, status, errorThrown) {
                    console.log(status);
                    console.log(errorThrown);
                },
                500: function(xhr, status, errorThrown) {
                    console.log(status);
                    console.log(errorThrown);
                }
            }
        });
    };
}

var viewModel = new ViewModel();

ko.applyBindings(viewModel);
