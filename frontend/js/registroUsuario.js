function redes(){
    alert("Esta opcion pronto estara disponible")
}

function setRegistro(event){
    //event.preventDefault();
    if($("#registro-password-1").val() == $("#registro-password-2").val()){
        $("#error").empty();
        $("#ok").empty();
        $("#ok").append("Perfecto: Las contraseñas coinciden");
        if($("#registro-nombre").val() == "" || $("#registro-email").val() == "" || $("#registro-password-1").val() =="" ){
            alert("Todos los campos son obligatorios")   
        }else{       
            let myData = {
                name: $("#registro-nombre").val(),
                email: $("#registro-email").val(),
                password: $("#registro-password-1").val()
            };
            let dataToSend = JSON.stringify(myData);
            $.ajax({
                url:"http://localhost:8085/api/user/new/",
                type:"POST",
                contentType: "application/json",
                dataType:"json",
                data: dataToSend,
                success:function(){
                    
                    console.log("envio exitoso");
                    //location.reload();
                }
            });
            alert("Usuario Registrado Existosamente");
        } 
    } else{
        $("#ok").empty();
        $("#error").empty();
        $("#error").append("ERROR: Las contraseñas no coinciden");
    }
}

function logIn(e){
   // e.preventDefault();
     if($("#login-email").val() == "" || $("#login-password").val() == ""){
         alert("Todos los campos son obligatorios");
     }else{
         let email = $("#login-email").val()
         let password = $("#login-password").val()  
         $.ajax({
             dataType:"json",
             typ:"GET",
             url: "http://localhost:8085/api/user/"+email+"/"+password,
             success:function(json){
                 
                 if(json.id == null || json.name == null){
                     $("#inicio-fail").empty();
                     $("#inicio-ok").empty();
                     $("#inicio-fail").append("Error al iniciar sesion: usuario o contraseña incorrecto");
                 }else{
                     $("#inicio-fail").empty();
                     $("#inicio-ok").empty();
                     $("#inicio-ok").append(json.name + " ha iniciado sesion, Redireccionado...")
                     if(json.email != ""){
                         sessionStorage.setItem("ID",json.id);
                         sessionStorage.setItem("ROL",json.type);
                         sessionStorage.setItem("ZONA",json.zone);
                         sessionStorage.setItem("DIRECCION",json.address);
                         sessionStorage.setItem("TELEFONO",json.cellPhone);
                         sessionStorage.setItem("CORREO",json.email);
                         sessionStorage.setItem("NOMBRE",json.name);
                         redireccionarAsesor();
                     }
                     
                 }    
             }
         }) 
     }
 }

function recuperarContraseña(){
    if($("#recovery-email").val() == ""){
        alert("Debes colocar el correo con que te registraste")
    }else{
        let email = $("#recovery-email").val()
        $.ajax({
            dataType:"json",
            typ:"GET",
            url: "http://localhost:8085/api/user/emailexist/"+email,
            success:function(respuesta){
                if(respuesta == true){
                    alert("Hemos enviado la contraseña a tu correo")
                }else if(respuesta == false){
                    alert("Lo sentimos el correo ingresado no se encuentra registrado")
                }
            }
        })
    }
}

// funcion para retardar el cargado de la asesores
function redireccionarAsesor(){
    function retrasarCarga() {
        window.location="./catalogo.html"; 
      }
      setTimeout(retrasarCarga, 1500);
}