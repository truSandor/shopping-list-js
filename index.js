import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
        if (!snapshot.exists()) {
            shoppingListEl.innerHTML = "No items here... yet"
        } else {
            let itemEntries = Object.entries(snapshot.val())
            clearShoppingListEl()
            itemEntries.forEach(entry => appendItemToShoppingListEl(entry))
        }
    }
)

function appendItemToShoppingListEl(item) {
    const liEl = document.createElement("li")
    liEl.id = item[0]
    liEl.textContent = item[1]
    liEl.addEventListener("click", () => {
            const exactLocationOfItemInDB = ref(database, `items/${liEl.id}`)
            remove(exactLocationOfItemInDB)
        }
    )
    shoppingListEl.appendChild(liEl)
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}
