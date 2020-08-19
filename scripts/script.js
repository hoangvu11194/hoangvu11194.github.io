$(document).ready(function(){
        $("#login").click(function(){
            var username = $('#username').val();
            var password = $('#password').val();
            if (username == "officer" && password == "officer"){
                window.location.href = "user.html";               
            }
			else if (username == "icaofficer" && password == "icaofficer"){
                window.location.href = "admin.html";               
            }			
			else alert("Please try again");

                
        });
        
    });
            