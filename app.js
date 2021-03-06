const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

document.addEventListener('DOMContentLoaded',getTodos)
todoButton.addEventListener('click',addTodo)
todoList.addEventListener('click',deleteCheck)
filterOption.addEventListener('click',filterTodo)

function addTodo (e) {
    e.preventDefault()
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value
    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    saveLocalTodos(todoInput.value)
    const completedButton = document.createElement('button')
    completedButton.innerHTML = '<i class = "fas fa-check"></i>'
    completedButton.classList.add("completed-btn")
    todoDiv.appendChild(completedButton)

    const trashButton = document.createElement('button')
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
    trashButton.classList.add("trash-btn")
    todoDiv.appendChild(trashButton)
    
    todoList.appendChild(todoDiv)
    todoInput.value=null
}

function deleteCheck(e) {
    const item = e.target
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement
        todo.classList.add('fall')
        removeLocalTodos(todo)
        todo.addEventListener("transitionend",function(){
            todo.remove()
        })
    }

    if(item.classList[0] === 'completed-btn'){
        item.parentElement.classList.toggle("completed")
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes
    todos.forEach(function(todo,i){
        if(i!=0){
            switch(e.target.value){
                case "all" : todo.style.display = "flex"
                            break;
                    
                case "completed" :  if(todo.classList.contains("completed")){
                                        todo.style.display = "flex"
                                    }else {
                                        todo.style.display = "none"
                                    }
                                    break;
                case "incomplete" : if(todo.classList.contains("completed")){
                                        todo.style.display = "none"
                                    }else {
                                        todo.style.display = "flex"
                                    }
                                    break;
                                    
            }
        } 
    })
}

function saveLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    if(todo != ""){
        todos.push(todo)
    }
    localStorage.setItem('todos',JSON.stringify(todos))
}

function getTodos(){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    // todos.push(todo)
    todos.forEach(function(todo){
        if(todo != ""){
            const todoDiv = document.createElement('div')
            todoDiv.classList.add('todo')
            const newTodo = document.createElement('li')
            newTodo.innerText = todo
            newTodo.classList.add('todo-item')
            todoDiv.appendChild(newTodo)
            saveLocalTodos(todoInput.value)
            const completedButton = document.createElement('button')
            completedButton.innerHTML = '<i class = "fas fa-check"></i>'
            completedButton.classList.add("completed-btn")
            todoDiv.appendChild(completedButton)
            const trashButton = document.createElement('button')
            trashButton.innerHTML = '<i class = "fas fa-trash"></i>'
            trashButton.classList.add("trash-btn")
            todoDiv.appendChild(trashButton)
            todoList.appendChild(todoDiv)
        }
    })
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') === null){
        todos = []
    }
    else{
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    let todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex),1)
    localStorage.setItem("todos",JSON.stringify(todos))
}
