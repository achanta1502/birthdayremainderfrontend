window.onload = function() {
this.document.getElementById("getList").addEventListener("click", listFriends);
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
    xhttp.send(document.getElementById("getListInput").value);
}

function listFormat(data) {
    if(data == null || data.length == 0) {
        document.getElementById("error").style.visibility = "visible";
        document.getElementById("error").innerText = "Cannot load data.Please reload";
        return null;
    }
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
