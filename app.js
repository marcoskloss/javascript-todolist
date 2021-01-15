const inputElement = document.querySelector('#task-input')
const listElement = document.querySelector('#list')
const addButton = document.querySelector('#add-task')
const loadStoragedData = listElement.children.length == 0 && localStorage.getItem('data') != null

let storageTasks = {tasks: [], keys: [], size: 0}

function loadFromStorage() {
  const data = JSON.parse(localStorage.getItem('data'))
  storageTasks = data
  const loadedTasks = data.tasks
  const loadedKey = data.keys

  for(let i = 0; i < loadedTasks.length; i++) {
    let loadedItem = setListItem(loadedTasks[i], loadedKey[i])
    listElement.innerHTML += loadedItem.item
  }

  inputElement.value = ''
  inputElement.focus()
}

function getInput() {
  return inputElement.value
}

function setListItem(task, key) {
  if(!task){
    inputElement.focus()
    return
  }
  return {
    item: ` <li class="list-item" id="${key}">
      <p class="item-text">${task}</p>
      <button onclick='deleteTask(this)' class="remove-task">Remove</button>
   </li>
  `,
  key: `${key}`
  }
}

function addTask() {
  const task = getInput()
  const item = setListItem(task, storageTasks.size).item
  const key = setListItem(task, storageTasks.size).key
  listElement.innerHTML += item
  setLocalStorageTask(task, key)

  inputElement.value = ''
  inputElement.focus()
}

function setLocalStorageTask(task,key) {
  storageTasks.tasks.push(task)
  storageTasks.keys.push(key)
  storageTasks.size += 1

  const data = JSON.stringify(storageTasks)
  localStorage.setItem('data', data)
}

function deleteTask(element) {
  const item = element.parentElement
  item.remove()
  const key = item.getAttribute('id')
  const index = storageTasks.keys.indexOf(key)
  console.log(key)

  storageTasks.keys.splice(index, 1)
  storageTasks.tasks.splice(index, 1)
  storageTasks.size--

  localStorage.clear()
  localStorage.setItem('data', JSON.stringify(storageTasks))
  inputElement.focus()
}

addButton.addEventListener('click', addTask)
inputElement.addEventListener('keypress', (evt) => {
  if(evt.code == 'Enter') {
    addTask()
  }
})

if(loadStoragedData) {
  loadFromStorage()
}
