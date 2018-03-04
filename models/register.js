var User = require("./user.js");

function Register() {
	this.listUser = [],
	this.getUser = function(name) {
		var arr = this.listUser;
		var len = arr.length;
		return new Promise((reso, rej) => {
			if(len == 0) rej(new Error("Không tồn tại " + name));
			else {
				for(let i=0; i<len; i++) {
					var us = arr[i];
					if(us.name == name) reso({user: us, index: i});
					else if(us.name != name && i == (len-1)) rej(new Error("Không tồn tại " + name));
				}
			}
		});
	},
	this.updateList = function(name, data) {
		return new Promise((reso, rej) => {
			var user;
			this.getUser(name)
			.then(dt => {
				var index = dt.index;
				user = dt.user;
				user.addCp(data.cp, data.ma, data.mi)
				.then(state => {
					this.listUser[index] = user;
					if(state == 201) reso({mes: "update", data : user});
					else reso({mes: "addnew", data : user});
				})
				.catch(err => {
					rej(new Error("Thêm mới thất bại"));
				})
			})
			.catch(err => {
				user = new User();
				user.name = name;
				user.addCp(data.cp, data.ma, data.mi);
				this.listUser.push(user);
				reso({mes: "addnew", data : user});
			});
		});
	}
}

module.exports = Register;