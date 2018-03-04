var socket = io();

socket.on("add-status", function (data) {
    if(data.state == 200) {
        if(data.action == "add") {
            var cp = data.dl;
            var iframeHtml = "<iframe id=" + cp.name + " src='https://banggia-hn.vndirect.com.vn/chung-khoan/widget.html?type=stock&mode=full&theme=bright&symbol='" + cp.name + " width='300' height='210' scrolling='no'></iframe>";
            $("#list-cp").append(iframeHtml);
        } else if(data.action == "del") {
            $("#" + data.dl).remove();
            alert("Đã xóa");
        } else {
            alert(data.mes);
        }
    } else alert(data.mes);
});

$(document).ready(function () {
    $("#btn-add").click(function () {
        var mcp = $("#txt-macp").val();
        var max = $("#txt-macp-max").val();
        var min = $("#txt-macp-min").val();
        socket.emit("add-macp", { name: user, data: { cp: mcp, ma: max, mi: min } });
    });
    
    $("#btn-del").click(function () {
        var mcp = $("#txt-macp").val();
        socket.emit("del-macp", { name: user, data: { cp: mcp } });
    });

    $("#logout").click(function () {
        window.location="/logout";
    });

    var mkcheck = $("#txt-check-pass");
    var email = $("#txt-email");
    var phone = $("#txt-tel");
    var btngin = $("#login");
    var flogin = $("#f-login");

    $("#cb-signin").change(function() {
        if(this.checked) {
            $(mkcheck).show();
            $(email).show();
            $(phone).show();
            $(btngin).text("Đăng ký hệ thống");
            $(flogin).attr("action", "/singin");
        } else {
            $(mkcheck).hide();
            $(email).hide();
            $(phone).hide();
            $(btngin).text("Đăng nhập");
            $(flogin).attr("action", "/login");
        }
    });
});