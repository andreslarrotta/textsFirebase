// jshint esversion: 8
import { login, logout } from "./auth.js";
import { getItems } from "./firestore.js";

let currentUser;

const buttonLogin = document.getElementById("button-login");
const buttonLogout = document.getElementById("button-logout");
const textContainer = document.getElementById("texts-container");

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        init();
    }
    else {
        console.log('no esta logeado')
        textContainer.innerHTML = ''
    }
});

buttonLogin.addEventListener("click", async () => {
    try {
        currentUser = await login();
        console.log('info user', currentUser)
        init()
    } catch (error) {
        console.error(error);
    }
});

buttonLogout.addEventListener("click", (e) => {
    e.target.classList.toggle('hola')
    logout()
});

/* 
Version es6
*/
const printHtml = (texts) => {
    let htmlText = "";
    texts.forEach((text) => {
        htmlText += `
        <div>
            <h1>${text.value}</h1>
        </div>`
    });
    textContainer.innerHTML = htmlText
}

async function init() {
    loadTexts();
}

async function loadTexts() {
    try {
        const response = await getItems();
        console.log('todos los textos', response)
        printHtml(response)
    } catch (error) {
        console.error(error);
    }
}

/* 
Version es5
function printHtml() {}
*/