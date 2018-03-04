function User() {
	this.id = "",
	this.name = "",
	this.arrMacp = [],
	this.addCp = function(ma, max, min) {
		return new Promise((reso, rej) => {
			this.getCp(ma)
			.then(dt => {
				var index = dt.index;
				var cp = {
					macp : ma,
					ma : max,
					mi : min
				};
				this.arrMacp[index] = cp;
				reso(201);
			})
			.catch(err => {
				var cp = {
					macp : ma,
					ma : max,
					mi : min
				}
				this.arrMacp.push(cp);
				reso(200);
			})
		});
	},
	this.delCp = function(macp) {
		return new Promise((reso, rej) => {
			this.getCp(macp)
			.then(dt => {
				var index = dt.index;
				this.arrMacp.splice(index,1);
				reso(200);
			})
			.catch(err => {
				reso(201);
			})
		});
	},
	this.checkCp = function(macp) {
		this.getCp(macp)
		.then(dt => {
			return true;
		})
		.catch(err => {
			return false;
		})
	},
	this.getCp = function(macp) {
		var arr = this.arrMacp;
		var len = arr.length;
		var i = 0;
		return new Promise(function(reso, rej){
			if(len == 0) {
				rej(new Error("Không tìm thấy MCP"));
			} else {
				for(i=0; i<len; i++){
					var e = arr[i];
					if(e.macp == macp) reso({cp: e, index: i});
					else if(e.macp != macp && i == (len - 1)) rej(new Error("Không tìm thấy MCP"));
				}
			}
		});
	}
}

module.exports = User;