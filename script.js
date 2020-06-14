
window.onload = function() {
    myOptions();
    this.document.getElementById("submit").addEventListener("click", test);
    this.document.getElementById("getList").addEventListener("click", listFriends);
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
    var date = document.getElementById("date").value;
    var error = document.getElementById("error");
    if(name == "" || friendTimeZone == "" || myTimeZone == "" || email == "" || date == "") {
        error.innerHTML = "Some fields are invalid";
    }
    var result = {
        'name': name,
        'friendTimeZone': friendTimeZone,
        'myTimeZone': myTimeZone,
        'email': email,
        'date': date,
    };
    return JSON.stringify(result);
}

function listFriends() {
    var xhttp = new XMLHttpRequest({mozSystem: true});
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4) {
        if( this.status == 200 && this.statusText == "OK" ) {
            listFormat(this.responseText);
            return;
        }
        else if ( this.status == 400 ) {
            document.getElementById("error").innerHTML = this.responseText;
            document.getElementById("error").style.visibility = "visible";
            return;
        } else {
            document.getElementById("error").innerHTML = "Some problem on our side.";
            document.getElementById("error").style.visibility = "visible";
        }
    }
    };
    xhttp.open("POST", "http://localhost:8080/listFriends", true);
    console.log(document.getElementById("getListInput").value);
    xhttp.send(document.getElementById("getListInput").value);
}

function listFormat(data) {
    if(data == null || data.length == 0) {
        document.getElementById("error").style.visibility = "visible";
        document.getElementById("error").innerText = "Cannot load data.Please reload";
        return null;
    }
    document.getElementById("success").style.visibility = "hidden";
    document.getElementById("error").style.visibility = "hidden";
    var table = document.getElementById("list");
    for (var x=table.rows.length-1; x>0; x--) {
        table.deleteRow(x);
     }
    table.style.visibility = "visible";
    var output = JSON.parse(data);
    let i = 1;
    for(var key in output) {
        var obj = output[key];
        var tr = document.createElement("tr");
        table.appendChild(tr);
        var th = document.createElement("th");
        th.innerText = i;
        th.scope = "row";
        tr.appendChild(th);
        for(let i in obj) {
            let td = document.createElement("td");
            td.innerHTML = obj[i];
            tr.appendChild(td);
        }
        table.appendChild(tr);
        i++;
    }
}