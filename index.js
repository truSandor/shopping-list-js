import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-f9fa0-default-rtdb.europe-west1.firebasedatabase.app/" //process.env.DATABASE_URL
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")


addButtonEl.addEventListener("click", function () {
        const inputValue = inputFieldEl.value
        push(itemsInDB, inputValue)
        clearInputFieldEl();
    }
)

onValue(itemsInDB, snapshot => {
        let itemsArray = Object.values(snapshot.val())
        clearShoppingListEl()
        itemsArray.forEach(item => appendItemToShoppingListEl(item))
    }
)

function appendItemToShoppingListEl(itemName) {
    shoppingListEl.innerHTML += `<li>${itemName}</li>`

}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}
