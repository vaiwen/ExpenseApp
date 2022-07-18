const getSavedNotes = () => {
    const loadData = localStorage.getItem('expenses')

    if (loadData !== null) {
        return JSON.parse(loadData)
    }
    else {
        return []
    }
}

const saveNotes = (expenseList) => {
    localStorage.setItem('expenses', JSON.stringify(expenseList))
}

let i = 0

document.querySelector('#filter-search').addEventListener('input', function () {
    i = 0
})

const createExpenseItem = (item) => {

    const summaryMain = document.createElement('div')
    summaryMain.className = 'summary-main'
    document.querySelector('#expenses').appendChild(summaryMain)


    const summaryItem = document.createElement('div')
    summaryItem.className = "expenses-item"
    summaryItem.className += ` ${item.id}`
    summaryItem.innerHTML = `Describe : ${item.describe} <br/> Price : ${item.price}$ <br/>
                                       Category : ${item.category} <br/> Date : ${item.date}`

    const deleteButton = document.createElement('button')
    deleteButton.className = 'delete-button'
    deleteButton.className += ` ${item.id}`
    deleteButton.textContent = 'X'
    
    document.querySelectorAll('.summary-main')[i].appendChild(summaryItem)
    document.querySelectorAll('.summary-main')[i].appendChild(deleteButton)

    i++
}

const deleteAllExpenses = () => {
    localStorage.clear()
    alert('all expenses deleted successfully !')
}