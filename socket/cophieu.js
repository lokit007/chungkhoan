var rp = require("request-promise");
var cheerio = require("cheerio");
var Macp = require("../schemas/macp");
var Register = require("../schemas/register");
var urlName = "http://www.cophieu68.vn/snapshot.php?id=macp";
var urlInfo = "http://www.cophieu68.vn/snapshot.php?id=macp";

module.exports = function () {
	this.getInfoCurent = function (macp) {
		return new Promise((reso, rej) => {
			urlInfo = urlInfo.replace("macp", macp);
			rp(urlInfo).then(body => {
				var $ = cheerio.load(body);
				var name = $('h1');
				var price = $('#stockname_close');
				var volume = $('#stockname_volume');
				var info = {
					ma: macp,
					company: $(name[0]).text(),
					price: $(price[0]).text(),
					volume: $(volume[0]).text(),
				}
				reso(info);
			}).catch(err => {
				rej(err);
			});
		});
	},
		this.getInfo = function (user, macp) {
			return new Promise((reso, rej) => {
				Register.find()
					.populate({
						path: "_user",
						match: { name: user }
					})
					.populate({
						path: "_macp",
						match: { name: macp },
					})
					.exec((err, dt) => {
						if (err) rej(err);
						else {
							var max = dt.length - 1;
							dt.forEach((dl, index) => {
								if (dl._user != null && dl._macp != null) reso(dl);
								else if (index == max) rej(err);
							});
						}
					});
			});
		},
		this.addInfo = function (macp) {
			return new Promise((reso, rej) => {
				Macp.findOne({ name: macp }, (err, m) => {
					if (err) rej(err);
					else if (m == null) {
						this.getInfoCurent(macp)
							.then(dt => {
								var objCp = new Macp({
									name: dt.ma,
									fullname: dt.company,
									price: dt.price.replace(/,/g, ""),
									volume: dt.volume.replace(/,/g, "")
								});
								objCp.save((err, cp) => {
									if (err) rej(err);
									else reso(cp);
								});
							})
							.catch(err => {
								rej(err);
							});
					} else reso(m);
				});
			});
		},
		this.addRegister = function (user, macp, data) {
			return new Promise((reso, rej) => {
				Register.findOne({ _user: user, _macp: macp }, (err, r) => {
					if (err) rej(err);
					else if (r == null) {
						var objNew = new Register({
							_user: user,
							_macp: macp,
							max: data.ma,
							min: data.mi
						});
						objNew.save((err, rg) => {
							if (err) rej(err);
							else reso({ new: true, obj: rg });
						});
					} else {
						r.max = data.ma;
						r.min = data.mi;
						r.save((err, rg) => {
							if (err) rej(err);
							else reso({ new: false, obj: rg });
						});
					}
				});
			});
		}
}