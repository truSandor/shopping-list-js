import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-f9fa0-default-rtdb.europe-west1.firebasedatabase.app/" //process.env.DATABASE_URL
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    const inputValue = inputFieldEl.value
    push(itemsInDB, inputValue)
    clearInputFieldEl();
    shoppingListEl.innerHTML+=`<li>${inputValue}</li>`
})

function clearInputFieldEl() {
    inputFieldEl.value = ""
}
