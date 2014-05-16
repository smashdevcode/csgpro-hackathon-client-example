
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

        $.ajax("https://csgprohackathonapi.azurewebsites.net/api/users", {
            type: "POST",
            contentType: "application/json",
            data: user,
            success: function(data, success) {
                console.log(data);
            },
            error: function (xhr, status, errorThrown) {
                console.log(status);
                console.log(errorThrown);
            }
        });
    };
}

var viewModel = new ViewModel();

ko.applyBindings(viewModel);
