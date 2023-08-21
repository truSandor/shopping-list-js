const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")
const shoppingListFromStorage = localStorage.getItem("shoppingList")

const shoppingList = shoppingListFromStorage ? new Map(JSON.parse(shoppingListFromStorage)) : new Map()
let id = shoppingList.size === 0 ? 0 : findHighestId(shoppingList)


function addToShoppingList(inputValue) {
    if (shoppingList.size === 0) shoppingListEl.innerHTML = ""
    shoppingList.set(id, inputValue)
    localStorage.setItem("shoppingList", JSON.stringify(Array.from(shoppingList.entries())))
    appendItemToShoppingListEl(id, inputValue)
    clearInputFieldEl()
}

addButtonEl.addEventListener("click", function () {
        const inputValue = inputFieldEl.value
        if (!inputValue) return
        id++
        addToShoppingList(inputValue);
    }
)

function findHighestId(shoppingList) {
    let [max] = shoppingList.keys()
    for (const id of shoppingList.keys()) {
        max = (id > max) ? id : max
    }
    return max
}

function renderShoppingList() {
    if (shoppingList.size === 0) {
        shoppingListEl.innerHTML = "No items here... yet"
    } else {
        clearShoppingListEl()
        for (const e of shoppingList.entries()) {
            appendItemToShoppingListEl(e[0], e[1])
        }
    }
}

function appendItemToShoppingListEl(id, item) {
    const liEl = document.createElement("li")
    liEl.textContent = item
    liEl.addEventListener("click", () => {
            removeItemFromShoppingList(id)
            renderShoppingList()
        }
    )
    shoppingListEl.appendChild(liEl)
}

function removeItemFromShoppingList(id) {
    shoppingList.delete(id)
    localStorage.setItem("shoppingList", JSON.stringify(Array.from(shoppingList.entries())))
}

function clearInputFieldEl() {
    inputFieldEl.value = ""
}

function clearShoppingListEl() {
    shoppingListEl.innerHTML = ""
}

renderShoppingList()