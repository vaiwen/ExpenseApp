const myExpenses = getSavedNotes()

const expense = {
    describe: '',
    price: 0,
    category: '',
    date
}

const editObj = {
    id: 0,
    describe: '0',
    price: 0,
    category: '',
    date
}

class Exp {
    constructor(id, describe, price, category, date) {
        this.id = id
        this.describe = describe
        this.price = price
        this.category = category
        this.date = date
    }
}

document.querySelector('#input-describe').addEventListener('input', function (e) {
    expense.describe = e.target.value
})

document.querySelector('#input-price').addEventListener('input', function (e) {
    expense.price = e.target.value
})

document.querySelector('#input-category').addEventListener('input', function (e) {
    expense.category = e.target.value
})

document.querySelector('#input-date').addEventListener('input', function (e) {
    expense.date = e.target.value
})

// Add Expense

document.querySelector('#add').addEventListener('click', function () {
    const id = uuidv4()
    const expenses = new Exp(id, expense.describe, expense.price, expense.category, expense.date)

    myExpenses.push(expenses)
    saveNotes(myExpenses)

    alert('expense added successfully')

    document.querySelector('#expenses').innerHTML = ''
    document.querySelector('#filter-search').value = ''

    const expenseInput = document.querySelectorAll('.options .form-items > :nth-child(2)')
    expenseInput.forEach(function (item) {
        item.value = ''
    })
})

// Option Buttons

const myOptions = []

const optionsButtons = document.querySelectorAll('.info-box > div > div')
optionsButtons.forEach(function (item) {
    myOptions.push(item)
})

// Edit Inputs

const editInputs = document.querySelectorAll('.edit-options .form-items > :nth-child(2)')

const filterText = document.querySelector('#filter-search')

myOptions.forEach(function (item) {
    item.addEventListener('click', function () {
        document.querySelector('#expenses').innerHTML = ''
        filterText.value = ''

        editInputs.forEach(function (item) {
            item.value = ''
            item.disabled = true
        })

        let current = document.getElementsByClassName("active");
        current[0].className = "option"
        item.className += " active";
        filterText.placeholder = `Filter by ${item.id}`

        if(item.id == "date") {
            filterText.setAttribute("type", "date")
        }
        else {
            filterText.setAttribute("type", "text")
        }
    })
})

// Filter Expenses

filterText.addEventListener('input', function (e) {

    document.querySelector('#expenses').innerHTML = ''

    const filter = e.target.value

    const filteredData = localStorage.getItem('expenses')
    const JSONfilteredData = JSON.parse(filteredData)
    //console.log(JSONfilteredData[0].describe)  -->  Silme !

    const selectedOption = myOptions.filter(function (item) {
        return item.className.includes('active')
    })

    const deneme = selectedOption[0].id

    const yeter = JSONfilteredData.filter(function (item) {
        if (deneme == "price") {
            return item[`${deneme}`] == filter
        }
        else {
            return item[`${deneme}`].includes(filter)
        }
        
    })

    yeter.forEach(function (item) {
        if (filter !== '') {
            createExpenseItem(item)
        }
        else {
            document.querySelector('#expenses').innerHTML = ''

            editInputs.forEach(function (item) {
                item.value = ''
                item.disabled = true
            })
        }
    })

    //  Select expenses item's for edit

    const items = document.querySelectorAll('.expenses-item')

    items.forEach(function (item) {
        item.addEventListener('click', function () {
            const find = myExpenses.filter(function (items) {
                return item.className.toLowerCase().includes(items.id)
            })

            editInputs.forEach(function (item) {
                Object.keys(find[0]).forEach(function (items) {
                    if (item.id.toLowerCase().includes(items)) {
                        item.value = find[0][items]
                        editObj[items] = item.value
                    }
                    else {
                        editObj.id = find[0].id
                    }
                })
                item.disabled = false
            })
        })
    })

    // Delete Single Item

    const deleteItems = document.querySelectorAll('.delete-button')

    let index = 0
    let indexTwo = 0

    deleteItems.forEach(function (item) {
        item.addEventListener('click', function () {
            myExpenses.forEach(function (items) {
                if (item.className.toLowerCase().includes(items.id)) {
                    indexTwo = index
                }
                else {
                    index++
                }
            })
            myExpenses.splice(indexTwo, 1)
            saveNotes(myExpenses)
            alert('Expense deleted successfully')
            index = 0
            filterText.value = ''

            // Removing deleted item from expenses-item

            let bisey = 0

            items.forEach(function (item) {
                myExpenses.forEach(function (expense) {
                    if (item.className.toLowerCase().includes(expense.id)) {
                        bisey++
                    }
                })

                if (bisey > 0) {
                    bisey = 0
                }
                else {
                    item.parentElement.remove()
                }

            })
        })
    })
})

// Save Expense

document.querySelector('#edit').addEventListener('click', function () {

    editInputs.forEach(function (items) {
        Object.keys(editObj).forEach(function (item) {
            if (items.id.toLowerCase().includes(item)) {
                editObj[item] = items.value
            }
        })
    })

    myExpenses.forEach(function (items) {
        if (items.id == editObj.id) {
            Object.keys(items).forEach(function (item) {
                items[item] = editObj[item]
            })
        }
    })

    saveNotes(myExpenses)

    alert('Expense edited successfully')

    filterText.value = ''
    document.querySelector('#expenses').innerHTML = ''

    editInputs.forEach(function (item) {
        item.value = ''
        item.disabled = true
    })

})

// Delete All Expenses 

document.querySelector('#delete-all').addEventListener('click', function () {
    deleteAllExpenses()
})


