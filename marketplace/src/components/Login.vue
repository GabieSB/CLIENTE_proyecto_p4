<template>
<div class="wrapper fadeInDown">
    <img class="logo" src="../assets/marketplace.png" alt="" />
    <h2>Bienvenido a marketplace</h2>
    <div id="formContent">
       
        <div class="fadeIn first">
            <img src="https://ambitioustracks.com/wp-content/uploads/2017/01/1.-fundadores.png" id="icon" alt="User Icon" />
        </div>

    
        <form v-on:submit.prevent="login">
            <input type="text" id="login" class="fadeIn second" name="usuario" placeholder="Usuario" v-model="usuario" required />
            <input type="password" id="password" class="fadeIn third" name="login" placeholder="Password" v-model="password" required />

            <input type="submit" value="Login">

        </form>

    </div>
    <a id="registration_link" v-on:click='goToRegistration'>--Aun no tengo una cuenta--</a>
</div>
</template>

<script>
import axios from "axios";
import {
    main
} from "../main.js";

// @ is an alias to /src
export default {

    name: "Login",
    components: {

    },

    data: () => ({
        usuario: "",
        password: "",
        error: false,
    }),

    methods: {
        onClick() {
            console.log("Vue 2");
        },
        login() {
            console.log(this.usuario);

            axios
                .get(process.env.VUE_APP_API_URL + "login/" + this.usuario + "/" + this.password)
                .then((data) => {

                    if (data.statusText == "OK") {
                        localStorage.setItem('id_user', data.data.usuario_id) //aqui iria guardado el token, si tuvieramos una papa de Timmy.jpg
                        this.$store.state.usuario = data.data;
                        console.log(this.$store.state.usuario)
                        if (data.data.usuario_tipo == 'C') {
                            localStorage.setItem('modo_usuario','t');
                            localStorage.setItem('usuario_id', data.data.usuario_id);
                            console.log(localStorage.getItem('usuario_id'));
                            this.$router.push("dashboardComprador");
                            this.getComprador();
                        } else {
                            localStorage.setItem('modo_usuario','c');
                            this.$router.push("dashboardTienda");
                        }
                    }
                }).catch((error) => {

                    if (error.response) {
                        if (error.response.status == 500 || error.response.status == 404) {
                            this.$alertify.error('Han surgido problemas para conectarse con el servidor. Inténtelo más tarde.')
                        } else {
                            this.$alertify.error(error.response.data)
                        }
                    } else {
                        this.$alertify.error('No se ha podido establecer conexión con el servidor.')
                    }
                    this.password = '';
                    this.usuario = '';
                });
        },
        goToRegistration() {
            localStorage.removeItem('userData');
            this.$router.push("userCreator");
        },
        getComprador() {
            var idUsuario = localStorage.getItem('usuario_id');
            axios.get(process.env.VUE_APP_API_URL + 'get_comprador2/' + idUsuario)
                .then((respose) => {

                    var cont = respose.data;
                    localStorage.setItem('comprador_id', cont[0].comprador_id);
                })
        },
    },
};
</script>

<style>
/* aqui van los estilos */

html {
    background-color: #56baed;
}

body {
    font-family: "Poppins", sans-serif;
    height: 100vh;
}

a {
    color: #92badd;
    display: inline-block;
    text-decoration: none;
    font-weight: 400;
}

.logo{
    height: 100px;
    width: 100px;
}

#registration_link {
    transition: 200ms;
    color: #2196F3;
}

#registration_link:hover {
    color: #9C27B0;
    font-weight: bold;

}

h2 {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    display: inline-block;
    margin: 40px 8px 10px 8px;
    color: #cccccc;
}

/* STRUCTURE */

.wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 20px;
}

#formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background: rgb(0, 177, 151);
    padding: 30px;
    width: 90%;
    max-width: 450px;
    position: relative;
    padding: 0px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    box-shadow: 0 30px 60px 0 rgba(0, 0, 0, 0.3);
    text-align: center;
}

#formFooter {
    background-color: #f6f6f6;
    border-top: 1px solid #dce8f1;
    padding: 25px;
    text-align: center;
    -webkit-border-radius: 0 0 10px 10px;
    border-radius: 0 0 10px 10px;
}

/* TABS */

h2.inactive {
    color: #cccccc;
}

h2.active {
    color: #0d0d0d;
    border-bottom: 2px solid #5fbae9;
}

/* FORM TYPOGRAPHY*/

input[type="button"],
input[type="submit"],
input[type="reset"] {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    box-shadow: 0 10px 30px 0 rgba(95, 186, 233, 0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
}

input[type="button"]:hover,
input[type="submit"]:hover,
input[type="reset"]:hover {
    background-color: #39ace7;
}

input[type="button"]:active,
input[type="submit"]:active,
input[type="reset"]:active {
    -moz-transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -o-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
}

input[type="text"], input[type="password"] {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 85%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
}

input[type="text"]:focus,  input[type="password"]:focus{
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
}

input[type="text"]:placeholder, input[type="password"]:focus {
    color: #cccccc;
}

/* ANIMATIONS */

/* Simple CSS3 Fade-in-down Animation */
.fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }

    100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
}

@keyframes fadeInDown {
    0% {
        opacity: 0;
        -webkit-transform: translate3d(0, -100%, 0);
        transform: translate3d(0, -100%, 0);
    }

    100% {
        opacity: 1;
        -webkit-transform: none;
        transform: none;
    }
}

/* Simple CSS3 Fade-in Animation */
@-webkit-keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@-moz-keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.fadeIn {
    opacity: 0;
    -webkit-animation: fadeIn ease-in 1;
    -moz-animation: fadeIn ease-in 1;
    animation: fadeIn ease-in 1;

    -webkit-animation-fill-mode: forwards;
    -moz-animation-fill-mode: forwards;
    animation-fill-mode: forwards;

    -webkit-animation-duration: 1s;
    -moz-animation-duration: 1s;
    animation-duration: 1s;
}

.fadeIn.first {
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    animation-delay: 0.4s;
}

.fadeIn.second {
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    animation-delay: 0.6s;
}

.fadeIn.third {
    -webkit-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    animation-delay: 0.8s;
}

.fadeIn.fourth {
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    animation-delay: 1s;
}

/* Simple CSS3 Fade-in Animation */
.underlineHover:after {
    display: block;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 2px;
    background-color: #56baed;
    content: "";
    transition: width 0.2s;
}

.underlineHover:hover {
    color: #0d0d0d;
}

.underlineHover:hover:after {
    width: 100%;
}

/* OTHERS */

*:focus {
    outline: none;
}

#icon {
    height: 80px;
    margin: 20px;
}
</style>
