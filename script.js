$(document).ready(function () {
    let invalidChars = ["-", "+", "e"];
    $(":input[type='number']").on({
        keydown: function (e) {
            if (invalidChars.includes(e.key)) {
                e.preventDefault();
            }
        }
    });
    //$(":input").bind("copy paste cut", function(e){
    //    e.preventDefault();
    //});
    $(":input[type='text']").on({
        keydown: function (e) {
            if (e.key == '/' || e.key == '|' || e.key == '\\' || e.key == '&') {
                e.preventDefault();
            }
        }
    });

});


let str = "brocoli/2.99/lb/yes/brocoli.jpg|potatoe/5.99/lb/yes/potatoe.jpg|tomatoe/1.99/lb/no/tomatoe.jpg|rice(8kg)/26.99/bag/no/rice.jpg|soybean/0.49/lb/no/soybean.jpg|sweet corn/0.59/lb/yes/sweet-corn.jpg|bean sprout/0.99/lb/yes/bean-sprout.jpg";
let sum1 = function (n) {
    let ret = 0;
    for (let i = n.length - 1; i >= 0; i -= 2) {
        ret += Number.parseInt(n[i]);
    }
    return ret;
}
let sum2 = function (n) {
    let ret = 0;
    for (let i = n.length - 2; i >= 0; i -= 2) {
        let num = Number.parseInt(n[i]) * 2;
        if (num.toString().length == 2) {
            ret += Number.parseInt(num.toString()[0]) + Number.parseInt(num.toString()[1]);
        } else {
            ret += num;
        }
    }
    return ret;
}
let validNum = function (n) {
    if (n.length != 16) {
        return false;
    }
    if ((sum1(n) + sum2(n)) % 10 == 0) {
        return true;
    } else {
        return false;
    }
}

function clearCart() {
    sessionStorage.removeItem("FarmToKitchenOrder");
    location.reload();
}

function showCart() {
    alert(sessionStorage.getItem("FarmToKitchenOrder"));
}

function showUser() {
    alert(localStorage.getItem("users"));
}
function showCurrent(){
    if(sessionStorage.getItem("currentUser") == null){
        alert("No user log in");
    }else{
        alert(sessionStorage.getItem("currentUser").split('/')[0]);
    }
}
function addToCart(name, unit) {
    let ret = window.prompt(`You want how many ${unit} of ${name}?`, `0`);
    if (ret != null) {
        if (unit == "lb") {
            ret = Number.parseFloat(ret);
        } else {
            ret = Number.parseInt(ret);
        }
        if (isNaN(ret) == true) {
            alert("Not a valid amount");
        } else {
            let conf = window.confirm(`Add ${ret} ${unit} of ${name} to Cart?`);
            if (conf == true) {
                if (sessionStorage.getItem("FarmToKitchenOrder") == null || sessionStorage.getItem("FarmToKitchenOrder") == 'null') {
                    sessionStorage.setItem("FarmToKitchenOrder", `${name}/${ret}`);

                } else {
                    sessionStorage.setItem("FarmToKitchenOrder", sessionStorage.getItem("FarmToKitchenOrder") + `|${name}/${ret}`);
                }
            }
        }
    }
}

function login() {
    let us = localStorage.getItem("users");
    if (us == null) {
        alert('no user');
    } else {
        for (let u of us.split('|')) {
            if ($("#usernameLogin").val() == u.split('/')[0]) {
                if ($("#passwordLogin").val() == u.split('/')[1]) {
                    sessionStorage.setItem("currentUser", u);
                    location.href = 'home.html';
                    return;
                }
            }
        }
    }
    alert("Wrong password or username");
}

function register() {
    let ret = "";
    ret += $("#username").val() + "/";
    ret += $("#password").val() + "/";
    ret += $("#name").val() + "/";
    ret += $("#address").val() + "/";

    if ($("#master").attr('checked')) {
        ret += "master/";
    }
    if ($("#visa").attr('checked')) {
        ret += "visa/";
    }
    ret += $("#cardNumber").val() + "/";
    ret += $("#nameOnTheCard").val() + "/";
    ret += $("#expMonth").val() + "/";
    ret += $("#expYear").val() + "/";
    ret += $("#securityCode").val();

    if ($("#securityCode").val().length != 3 || Number.isInteger(Number.parseInt($("#securityCode").val())) == false) {
        alert("Security Code not valid");
        return;
    }
    alert(ret);
    let tempDate = new Date(Date.now());
    if ($("#expMonth").val() <= tempDate.getMonth() && $("#expYear").val() <= tempDate.getFullYear()) {
        alert("Card Expired or expire soon");
        return;
    }
    alert(tempDate.getMonth());
    alert(tempDate.getFullYear());
    if (validNum($("#cardNumber").val()) == false) {
        alert("Invalid card number");
        return;
    }


    if (localStorage.getItem("users") == null) {
        localStorage.setItem("users", ret);

        alert("First Person to register");
    } else {
        for (let u of localStorage.getItem('users').split('|')) {
            if (u.split('/')[0] == $('#username').val()) {
                alert("username exist");
                return;
            }
        }
        localStorage.setItem("users", localStorage.getItem("users") + "|" + ret);
        alert("Register Success");
    }
    location.href = "home.html";
    alert(localStorage.getItem("users"));
}

function signout() {
    sessionStorage.removeItem("currentUser");
    sessionStorage.removeItem("FarmToKitchenOrder");
}

function postComment() {
    if($("#writeComment").val().trim() == ""){
        alert("Please write useful comment");
        return;
    }
    let user = "";
    if (sessionStorage.getItem("currentUser") == null) {
        user = "Anonymous";
    } else {
        user = sessionStorage.getItem("currentUser").split("/")[0];
    }
    let tempDay = "";
    let d = new Date();
    switch (d.getDay()) {
        case 0:
            tempDay = "Sun";
            break;
        case 1:
            tempDay = "Mon";
            break;
        case 2:
            tempDay = "Tue";
            break;
        case 3:
            tempDay = "Wed";
            break;
        case 4:
            tempDay = "Thu";
            break;
        case 5:
            tempDay = "Fri";
            break;
        case 6:
            tempDay = "Sat";
            break;
    }
    let ret = user + "@#$|&&" + tempDay + " " + d.getUTCDate() + "/" + d.getUTCMonth() + "/" + d.getFullYear() + " " + d.getUTCHours() + ":" + d.getUTCMinutes() + "@#$|&&" + $("#writeComment").val();
    if (localStorage.getItem("userComments") == null) {
        localStorage.setItem("userComments", ret);
    } else {
        localStorage.setItem("userComments", localStorage.getItem("userComments") + "^^%%$$" + ret);
    }
    location.reload();
}

function deleteOrder(indx) {
    let countme = 0;
    let ordme = sessionStorage.getItem("FarmToKitchenOrder").split('|');
    let ret = "";
    for (let s in ordme) {
        //   if(countme == indx){
        //       continue;
        //   }
        //    countme+= 1:
        if (s == indx) {
            continue;
        }
        if (ret != "") {
            ret += "|";
        }
        ret += ordme[s];
    }
    if (ret == "") {
        sessionStorage.removeItem("FarmToKitchenOrder");
    } else {
        sessionStorage.setItem("FarmToKitchenOrder", ret);
    }
    location.reload();
}

function pay() {
    location.href = 'receipt.html';
}
