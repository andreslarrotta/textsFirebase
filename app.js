// jshint esversion: 8
import { login, logout } from "./auth.js";
import { getItems } from "./firestore.js";

let currentUser;

const buttonLogin = document.getElementById("button-login");
const buttonLogout = document.getElementById("button-logout");
const textContainer = document.getElementById("texts-container");
const acceso1Container = document.getElementById("acceso1-container");
const acceso2Container = document.getElementById("acceso2-container");

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
    let htmlTextAcceso1 = "";
    let htmlTextAcceso2 = "";

    texts.forEach((text) => {

        if (text.vista === 'acceso1') {
            htmlTextAcceso1 += `
            <div>
                <h1>${text.value}</h1>
            </div>`
        } else if (text.vista === 'acceso2') {
            htmlTextAcceso2 += `
            <div>
                <h1>${text.value}</h1>
            </div>`
        }
        else {
            htmlText += `
            <div>
                <h1>${text.value}</h1>
            </div>`
        }
    });

    textContainer.innerHTML = htmlText
    acceso1Container.innerHTML = htmlTextAcceso1
    acceso2Container.innerHTML = htmlTextAcceso2
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