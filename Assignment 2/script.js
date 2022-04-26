function addRow(){
    const table = document.getElementsByTagName('tbody')
    const newRow = document.createElement('tr')
    const newAuthorCell = document.createElement('td')
    const newTitleCell = document.createElement('td')
    const newOperationCell = document.createElement('td')
    const authorInput = document.createElement('input')
    const titleInput = document.createElement('input')
    const saveButton = document.createElement('button')
    const removeButton = document.createElement('button')

    authorInput.setAttribute('type', 'text')
    titleInput.setAttribute('type', 'text')
    authorInput.setAttribute('id', 'authorInput')
    titleInput.setAttribute('id', 'titleInput')


    saveButton.setAttribute('id', 'save')
    removeButton.setAttribute('id', 'remove')
    saveButton.textContent = 'Save'
    removeButton.textContent = 'Remove'

    newAuthorCell.appendChild(authorInput)
    newTitleCell.appendChild(titleInput)
    newOperationCell.appendChild(saveButton)
    newOperationCell.appendChild(removeButton)

    newRow.appendChild(newAuthorCell)
    newRow.appendChild(newTitleCell)
    newRow.appendChild(newOperationCell)

    table[0].appendChild(newRow)

    saveButton.addEventListener('click', function(){
        newAuthorCell.removeChild(authorInput)
        newAuthorCell.textContent = authorInput.value
        newTitleCell.removeChild(titleInput)
        newTitleCell.textContent = titleInput.value
        
        const editButton = document.createElement('button')
        editButton.setAttribute('id', 'edit')
        editButton.textContent = 'Edit'
        newOperationCell.replaceChild(editButton, saveButton)
        editButton.addEventListener('click', function(){
            newAuthorCell.textContent = ''
            newAuthorCell.appendChild(authorInput)
            newOperationCell.replaceChild(saveButton, editButton)
            newTitleCell.textContent = ''
            newTitleCell.appendChild(titleInput)
        })
    })

    removeButton.addEventListener('click', function(){
        table[0].removeChild(newRow)
    })
}

let addButton = document.getElementById("add");
addButton.addEventListener('click', addRow);