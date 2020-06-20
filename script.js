
window.onload = function() {
    getMonth();
    myOptions();
    this.document.getElementById("submit").addEventListener("click", test);
    this.document.getElementById("month").addEventListener("change", getDateFromMonth)
}

function test() {
    document.getElementById("error").innerHTML = "";
    document.getElementById("success").innerHTML = "";
    var xhttp = new XMLHttpRequest({mozSystem: true});
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
        if( this.status == 200 && this.statusText == "OK" ) {
            document.getElementById("success").innerHTML = this.responseText;
            document.getElementById("success").style.visibility = "visible";
            document.getElementById("error").style.visibility = "hidden";

            return;
        }
        else if ( this.status == 400 ) {
            document.getElementById("error").innerHTML = this.responseText;
            document.getElementById("error").style.visibility = "visible";
            document.getElementById("success").style.visibility = "hidden";

            return;
        } else {
            document.getElementById("error").innerHTML = "Some problem on our side.";
            document.getElementById("error").style.visibility = "visible";
            document.getElementById("success").style.visibility = "hidden";

        }
    }
    };
    //xhttp.open("POST", "http://ec2-34-212-29-215.us-west-2.compute.amazonaws.com:8080/i", true);
    xhttp.open("POST", "http://localhost:8080/addFriends", true);
    xhttp.send(submitData());
}

function myOptions() {
    var xhttp = new XMLHttpRequest({mozSystem: true});
    xhttp.onreadystatechange = function() {
        var result = null;
        if(this.readyState == 4) {
        if( this.status == 200 && this.statusText == "OK") {
            result = this.responseText;
        }
        updateOptions(result);
    }
    };
    //xhttp.open("GET", "http://ec2-34-212-29-215.us-west-2.compute.amazonaws.com:8080/i", true);
    xhttp.open("GET", "http://localhost:8080/getZonesList", true);
    xhttp.send();    
}

function updateOptions(result) {
    var list = getList(result);
    if(list == null || list.length == 0) {
        document.getElementById("alert").innerText="Please reload the page. Unable to load everything";
        document.getElementById("alert").style.visibility = "visible";
    }
    var select1 = document.getElementById("mySelect1");
    var select2 = document.getElementById("mySelect2");
    for(let i = 0; i < list.length; i++) {
        let c1 = document.createElement("option");
        c1.text = list[i];
        c1.values = list[i];
        select1.options.add(c1, i);
        let c2 = document.createElement("option");
        c2.text = list[i];
        c2.values = list[i];
        select2.options.add(c2, i);
    }
    document.getElementById("alert").style.visibility = "hidden";
}

function getList(data) {
    if(data == null || data == "") {
        return null;
    }
    if(!data.includes("[") || !data.includes("]")) {
        return null;
    }
    var d = data.replace("[", "").replace("]", "").split(",");
    return d;
}

function submitData() {
    var name = document.getElementById("Id").value;
    var friendTimeZone = document.getElementById("mySelect2").value;
    var myTimeZone = document.getElementById("mySelect1").value;

    var email = document.getElementById("email").value;
    var day = document.getElementById("day").value;
    var month = document.getElementById("month").value;
    var error = document.getElementById("error");
    if(name == "" || friendTimeZone == "" || myTimeZone == "" || email == "" || month == "" || day == "") {
        error.innerHTML = "Some fields are invalid";
    }
    var result = {
        'name': name,
        'friendTimeZone': friendTimeZone,
        'myTimeZone': myTimeZone,
        'email': email,
        'date': month + "-" + day,
    };
    return JSON.stringify(result);
}

function getMonth() {
    var month = document.getElementById("month");
    for(let i = 1; i <= 12; i++) {
        let opt = document.createElement("option");
        opt.text = i;
        opt.value = i;
        month.append(opt);
    }
}

function getDateFromMonth() {
    var month = document.getElementById("month").value;
    if(month <= 7) {
    if(month % 2 == 0) {
        if(month == 2) {
            getDate(1, 29);
        } else {
            getDate(1, 30);
        }
    } else {
        getDate(1, 31);
    }
} else {
    if(month % 2 == 0) {
        getDate(1, 31);  
    } else {
        getDate(1, 30);
    }
}
}

function getDate(start, end) {
    var day = document.getElementById("day");
    for(let i = start; i <= end; i++) {
        let opt = document.createElement("option");
        opt.text = i;
        opt.value = i;
        day.append(opt);
    }
}