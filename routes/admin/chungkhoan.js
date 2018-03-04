
var Macp = require("../../schemas/macp");
var User = require("../../schemas/user");

module.exports = (app) => {
    app.get("/admin", (req, res) => {
		Macp.find((err, data) => {
			if(err) {
				res.render("admin", { list: [], show: 0});
			} else {
				res.render("admin", { list: data, show: 0});
			}
		})
    });

	app.get("/admin/user", (req, res) => {
		User.find((err, data) => {
			if(err) {
				res.render("admin", { list: [], show: 1});
			} else {
				res.render("admin", { list: data, show: 1});
			}
		})
	});

}