const inputField = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button")
const todoAddField = document.querySelector(".todoList");
const deleteAll = document.querySelector(".clearBtn")
inputField.onkeyup = () => {
    let userData = inputField.value;
    if (userData.trim != 0) {
        addBtn.classList.add("active");
    }

}
showTodo()


addBtn.addEventListener("click", () => {
    let userData = inputField.value; //getting the value that user writing on input field
    let getLocalStorage = localStorage.getItem("New Todo Lists") //making a local storage

    if (getLocalStorage == null) {
        listArr = [] // if local storage null than return a array
    }

    else {
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }

    listArr.push(userData); //puhing the input value to empty array
    localStorage.setItem("New Todo Lists", JSON.stringify(listArr));//transfering js object to json string
    showTodo() //calling the function
})

function showTodo() {
    let getLocalStorage = localStorage.getItem("New Todo Lists") //making a local storage

    if (getLocalStorage == null) {
        listArr = [] // if local storage null than return a array
    }

    else {
        listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    }

    if (listArr.length > 0) {
        deleteAll.classList.add("active");
    } else {
        deleteAll.classList.remove("active")
    }
    const pending = document.querySelector(".pendingTasks");
    pending.textContent = listArr.length;
    let newLiTag = "";
    listArr.forEach((element, index) => {
        newLiTag += `<li>${element}<span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span></li>`
    });
    todoAddField.innerHTML = newLiTag; //adding li to todo 
}

const deleteBtn = document.querySelector(".icon")

function deleteTask(index) {
    let getLocalStorage = localStorage.getItem("New Todo Lists") //making a local storage
    listArr = JSON.parse(getLocalStorage); // transforming json string into a js object
    listArr.splice(index, 1);
    //updating new list
    localStorage.setItem("New Todo Lists", JSON.stringify(listArr));//transfering js object to json string
    showTodo()
}

deleteAll.addEventListener("click", () => {
    listArr = []
    localStorage.setItem("New Todo Lists", JSON.stringify(listArr));//transfering js object to json string
    showTodo()
})