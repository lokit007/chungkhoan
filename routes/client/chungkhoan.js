var User = require("../../schemas/user");
var Register = require("../../schemas/register");
var rp = require('request-promise');

module.exports = (app) => {
    app.get("/", (req, res) => {
        var user = req.session.user;
        if(user == undefined || user == "") res.render("home", { list: [], data: "", mes: "" });
        else {
            Register.find().populate({
                path: "_user",
                match: { name: user }
            }).populate("_macp").exec((err, dt) => {
                if (err) res.render("home", { list: [], data: "Lỗi kết nối", mes: "" });
                else if(dt == null) res.render("home", { list: [], data: user, mes: "" });
                else {
                    var lsData = [];
                    var max = dt.length - 1;
                    dt.forEach((ck, i) => {
                        if(ck._user != null) lsData.push(ck);
                        if(i == max) {
                            res.render("home", { list: lsData, data: user, mes: "" });
                        }
                    });
                }
            });
        }
    });

    app.post("/singin", (req, res) => {

    });

    app.post("/login", (req, res) => {
        console.log(req.body);
        var login = req.body;
        User.findOne({name: login.user, pass: login.pass}, (err, user) => {
            if(err) res.render("home", { list: [], data: "", mes: "Tên đăng nhập hoặc mật khẩu không chính xác!" });
            else if(user == null) res.render("home", { list: [], data: "", mes: "Tên đăng nhập hoặc mật khẩu không chính xác!" });
            else {
                req.session.user = login.user;
                res.redirect("/");
            }
        });
    });

    app.get("/logout", (req, res) => {
        req.session.user = "";
        res.redirect("/");
    });

    app.get("/view", (req, res) => {
        console.log(req.query);
        res.render("home", { list: [], data: "Lỗi kết nối" });
    });
}