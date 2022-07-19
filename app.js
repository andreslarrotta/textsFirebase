// jshint esversion: 8
import { login, logout } from "./auth.js";

let currentUser;

const buttonLogin = document.getElementById("button-login");
const buttonLogout = document.getElementById("button-logout");


firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        /* // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        currentUser = user;
        init(); */
        document.querySelector('.hermosa').setAttribute('style', 'background:purple;color:pink')
        document.querySelector('.hermosa').innerHTML = `<h1>${user.displayName}</h1>`
    } else {
        document.querySelector('.hermosa').setAttribute('style', 'background:red;color:white')
        document.querySelector('.hermosa').innerHTML = `<h1>No login</h1>`
    }
});

buttonLogin.addEventListener("click", async (e) => {
    try {
        currentUser = await login();
        console.log('info user', currentUser)
        /* init(); */
    } catch (error) {
        console.error(error);
    }
});

buttonLogout.addEventListener("click", (e) => {
    logout();
    console.log('hermosa nos deslogueamos')
    //localStorage.removeItem("user");
    /* buttonLogin.classList.remove("hidden");
    buttonLogout.classList.add("hidden");
    todoForm.classList.add("hidden");
    todosContainer.innerHTML = ""; */
});