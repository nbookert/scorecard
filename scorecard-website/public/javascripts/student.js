$(document).ready(function() {
    $("#AddStudent").click(function() {
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let _id = $("#studentID").val();
        let month = $("#month").val();
        let day = $("#day").val();
        let year = $("#year").val();
        let address = $("#address").val();
        let phoneNumber = $("#phoneNumber").val();
        let email = $("#email").val();

        let output = ""

        if (firstName == "") {
            output += "<p> First name is required </p>";
        } else if (!checkName(firstName)) {
            output += "<p> First name does not follow the correct syntax </p>";
        }

        if (lastName == "") {
            output += "<p> Last name is required </p>";
        } else if (!checkName(lastName)) {
            output += "<p> Last name does not follow the correct syntax </p>";
        }

        if (_id == "") {
            output += "<p> Student ID is required </p>";
        } else if (!checkID(_id)) {
            output += "<p> ID does not follow the correct syntax </p>";
        }

        if (month == "") {
            output += "<p> Month is required </p>";
        }

        if (day == "") {
            output += "<p> Day is required </p>";
        }

        if (year == "") {
            output += "<p> Year is required </p>";
        }

        if (address == "") {
            output += "<p> Address is required </p>";
        }

        if (phoneNumber == "") {
            output += "<p> Phone number is required </p>";
        } else if (!checkPhoneNumber(phoneNumber)) {
            output += "<p> Phone number does not follow the correct syntax </p>";
        }

        if (email == "") {
            output += "<p> Email address is required </p>";
        } else if (!checkEmail(email)) {
            output += "<p> Email address does not follow the correct syntax </p>";
        }

        //Connect to MongoDb
        if (output == "") {
            let data = {
                "_id" : _id,
                "FirstName" : firstName,
                "LastName" : lastName,
                "Birthday" : month + "-" + day + "-" + year,
                "MailingAddress" : address,
                "PhoneNumber" : phoneNumber,
                "EmailAddress" : email
            }
            let xhttp = new XMLHttpRequest();
            xhttp.open("POST", "http://localhost:8080/brown/student", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    $("#Display").html("<span style='color:green'><p>Success!</p></span>");
                }
                else if (this.status == 500) {
                    $("#Display").html("<span style='color:red'><p> Student " + ID + " already exists and cannot be added</p></span>");
                }
            };
            xhttp.send(JSON.stringify(data));
        } else {
            $("#Display").html("<span style='color:red'>" +output + "</span>");
        }
    });

    $("#FindStudent").click(function() {
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let _id = $("#studentID").val();

        let output = ""

        if (firstName == "" || lastName == "" || _id == "") {
            output += "<p> Full name or Student ID is required </p>";
        } else if ((!checkName(firstName) || !checkName(lastName)) || !checkID(ID)) {
            output += "<p> Full name or Student ID do not follow the correct syntax </p>";
        }

        //Connect to MongoDb
        if (output == "") {
            let xhttp = new XMLHttpRequest();
            let url = "http://localhost:8080/brown/student?ID="+_id+"&FirstName=" +firstName+ "&LastName=" +lastName;
            xhttp.open("GET", url, true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    let response = JSON.parse(this.response);
                    let text = ""

                    if (response.length > 0) {
                        for (let i = 0; i < response.length; i++) {
                            text += "<div>" +
                                "<p>First Name: " +response[i].FirstName+ "</p>" +
                                "<p>Last Name: " +response[i].LastName+ "</p>" +
                                "<p>Student ID: " +response[i]._id+ " </p>" +
                                "<p>Birthday: " +response[i].Birthday+ "</p>" +
                                "<p>Mailing Address: " +response[i].MailingAddress+ "</p>" +
                                "<p>Phone Number: " +response[i].PhoneNumber+ "</p>" +
                                "<p>Email Address: " +response[i].EmailAddress+ "</p></div><br>";
                        }
                    } else {
                        text = "<p>No students found matching the given ID or name</p>";
                    }

                    $("#Display").html(text);
                }
                else if (this.status == 500) {
                    $("#Display").html("<span style='color:red'><p> No Studentes exist</p></span>");
                }
            };
            xhttp.send();
        } else {
            $("#Display").html("<span style='color:red'>" +output + "</span>");
        }
    });

    $("#UpdateStudent").click(function() {
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let _id = $("#studentID").val();
        let month = $("#month").val();
        let day = $("#day").val();
        let year = $("#year").val();
        let address = $("#address").val();
        let phoneNumber = $("#phoneNumber").val();
        let email = $("#email").val();

        let output = ""
        let data = new Object();

        if (firstName != "" && checkName(firstName)) {
            data.FirstName = firstName;
        } else if (firstName != "" && !checkName(firstName)) {
            output += "<p> First name does not follow the correct syntax </p>";
        }

        if (lastName != "" && checkName(lastName)) {
            data.LastName = lastName;
        } else if (lastName != "" && !checkName(lastName)) {
            output += "<p> Last name does not follow the correct syntax </p>";
        }

        if (_id != "") {
           data._id = _id;
        } else if (_id == "") {
            output += "<p>Student ID is required </p>";
        }else if (!checkID(_id)) {
            output += "<p>Student ID does not follow the correct syntax </p>";
        }

        if (month != "") {
            data.Month = month;
        }

        if (day != "") {
            data.Day = day;
        }

        if (year != "") {
            data.Year = year;
        }

        if (address != "") {
            data.Address = address;
        }

        if (phoneNumber != "" && checkPhoneNumber(phoneNumber)) {
            data.PhoneNumber = phoneNumber
        } else if (phoneNumber != "" && !checkPhoneNumber(phoneNumber)) {
            output += "<p> Phone number does not follow the correct syntax </p>";
        }

        if (email != "" && checkEmail(email)) {
            data.EmailAddress = eamil;
        } else if (email != "" && !checkEmail(email)) {
            output += "<p> Email address does not follow the correct syntax </p>";
        }

        //Connect to MongoDb
        if (data._id != undefined && output == "") {
            let xhttp = new XMLHttpRequest();
            xhttp.open("PUT", "http://localhost:8080/brown/student", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    $("#Display").html("<span style='color:green'><p>Student "+_id+ " updated successfully!</p></span>");
                }
                else if (this.status == 500) {
                    $("#Display").html("<span style='color:red'><p> Student " + _id + " doesn't exist</p></span>");
                }
            };
            xhttp.send(JSON.stringify(data));
        } else {
            $("#Display").html("<span style='color:red'>" +output + "</span>");
        }
    });

    $("#DeleteStudent").click(function() {
        let _id = $("#studentID").val();

        let output = ""
        let data = new Object();

        if (_id == "") {
            output += "<p>Student ID is required </p>";
        } else if (!checkID(_id)) {
            output += "<p>Student ID does not follow the correct syntax </p>";
        } else {
            data._id = _id;
        }

        //Connect to MongoDb
        if (data._id != undefined) {
            let xhttp = new XMLHttpRequest();
            xhttp.open("DELETE", "http://localhost:8080/brown/student", true);
            xhttp.setRequestHeader("Content-Type", "application/json");
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    $("#Display").html("<span style='color:green'><p>" +data._id+ " removed successfully!</p></span>");
                }
                else if (this.status == 500) {
                    $("#Display").html("<span style='color:red'><p> Student " + _id + " doesn't exist</p></span>");
                }
            };
            xhttp.send(JSON.stringify(data));
        } else {
            $("#Display").html("<span style='color:red'>" +output + "</span>");
        }
    });
});

function checkID(id) {
    let regex = new RegExp('^[0-9]{6}$');
    return regex.test(id);
}

function checkName(name) {
    let regex = new RegExp('^[a-zA-Z]+$')
    return regex.test(name);
}

function checkPhoneNumber(number) {
    let regex = new RegExp('^([0-9]{3})-([0-9]{3})-([0-9]{4})$');
    return regex.test(number);
}

function checkEmail(email) {
    var regex = new RegExp('^([a-zA-Z0-9_\\-\\.]+)@aggies\.ncat\.edu$');
    return regex.test(email);
}