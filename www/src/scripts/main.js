const show_task_menu = document.getElementsByClassName(".add-task-inputs-container")

const add_task_button = document.querySelector('.add-task-button')
const tasksList = document.querySelector('.tasks-container')
const blackBackground = document.querySelector('.black-background')
const shareMenu = document.querySelector(".share-menu-container")

const deleteTaskMenu = document.querySelector('.delete-task-container')
const confirmDeleteTaskButton = document.querySelector('.confirm-delete-task-button')
const cancelDeleteTaskButton = document.querySelector('.cancel-delete-task-button')


const shareButtons = document.querySelectorAll('.round-share-button')

var tasks = []
var targetTaskDelete = -1
var targetTaskShare = -1


document.addEventListener("DOMContentLoaded", () => {
    loadTasksFromLocalStorage()
});


add_task_button.addEventListener('click', function () {
    const taskTitle = document.getElementById("inputTaskTitle").value
    const taskAbout = document.getElementById("inputTaskAbout").value
    const taskId = Math.floor(Date.now() / 1000)

    addTaskToUI(taskTitle, taskAbout, taskId)
    addTaskToLocalStorage(taskTitle, taskAbout, taskId)
});

shareButtons.forEach(shareButton => {
    shareButton.addEventListener('click', function handleClick(event) {
        if (targetTaskDelete != -1 && tasks.indexOf(targetTaskDelete) != -1) {
            if (shareButton.id == "copy") {
                navigator.clipboard.writeText(`http:127.0.0.1:3000/api/taskId=${targetTaskShare}`)
            }
            else {
                blackBackground.style.visibility = "hidden"
                shareMenu.style.visibility = "hidden"
                shareMenu.style.height = "76px"
                window.open(`https://${shareButton.id}.com/api/shareTaskId=${targetTaskShare}`, `${shareButton.id}`)
            }
        }
    });
});


confirmDeleteTaskButton.addEventListener('click', function (event) {
    if (targetTaskDelete != -1) {
        const targetTask = document.getElementById(targetTaskDelete)
        targetTask.remove()
    }

    tasks.splice(tasks.findIndex(task => task.id === targetTaskDelete), 1)
    deleteFromLocalStorage(targetTaskDelete)

    targetTaskDelete = -1
    deleteTaskMenu.style.visibility = "hidden"
    blackBackground.style.visibility = "hidden"

    if (tasks && tasks.length == 0) {
        const element = document.querySelector(".no-task-container")
        element.style.visibility = "visible"
        element.style.height = "0"
    }
})

cancelDeleteTaskButton.addEventListener('click', function (event) {
    targetTaskDelete = -1
    deleteTaskMenu.style.visibility = "hidden"
    blackBackground.style.visibility = "hidden"
})

function loadTasksFromLocalStorage() {
    const localTasksString = window.localStorage.getItem('saveTaskList')

    if (localTasksString) {
        const localTasksArray = JSON.parse(localTasksString)

        localTasksArray.forEach(task => {
            addTaskToUI(task.taskTitle, task.taskAbout, task.id)
        });
    }
}

function deleteFromLocalStorage(id) {
    const localTasksString = window.localStorage.getItem('saveTaskList')

    if (localTasksString) {
        const localTasksArray = JSON.parse(localTasksString)

        localTasksArray.splice(localTasksArray.findIndex(task => task.id === id), 1)
        window.localStorage.setItem('saveTaskList', JSON.stringify(localTasksArray))
    }
}

function addTaskToLocalStorage(taskTitle, taskAbout, id) {
    const localTasksString = window.localStorage.getItem('saveTaskList')
    var localTasksArray = []

    if (localTasksString) {
        localTasksArray = JSON.parse(localTasksString)

    }
    else {
        localTasksArray = []
    }

    localTasksArray.push({ id: id, taskTitle: taskTitle, taskAbout: taskAbout })
    window.localStorage.setItem('saveTaskList', JSON.stringify(localTasksArray))
}

function addTaskToUI(taskTitle, taskAbout, id) {
    const taskCardContainer = document.createElement("div")
    taskCardContainer.className = "task-card-container"
    taskCardContainer.innerHTML = `
        <div class="task-card">
            <div class="text-task-card">
                <h1>${taskTitle}</h1>
                <p>${taskAbout}</p>
            </div>
            <div class="delete-button-task-card"></div>
        </div>
        <div class="menu-task-container">
            <div class="share-task-button"></div>
            <div class="about-task-button"></div>
            <div class="edit-task-button"></div>
        </div>
    `
    taskCardContainer.id = id

    const taskCard = taskCardContainer.querySelector('.task-card')
    taskCard.addEventListener('click', function (event) {

        if (event.target == taskCard) {
            const menuTaskContainer = taskCardContainer.querySelector('.menu-task-container')
            menuTaskContainer.classList.toggle('visible')
        }

        if (event.target.className == "delete-button-task-card") {
            targetTaskDelete = id

            deleteTaskMenu.style.visibility = "visible"
            blackBackground.style.visibility = "visible"
        }
    })

    const shareTask = taskCardContainer.querySelector('.share-task-button')
    shareTask.addEventListener('click', function (event) {
        targetTaskShare = targetTaskDelete = tasks.length - 1
        blackBackground.style.visibility = "visible"
        shareMenu.style.visibility = "visible"
        shareMenu.style.height = "76px"
    })

    tasks.push({ id: id, taskTitle: taskTitle, taskAbout: taskAbout })

    tasksList.appendChild(taskCardContainer)

    if (tasks && tasks.length == 1) {
        const element = document.querySelector(".no-task-container")
        element.style.visibility = "hidden"
        element.style.height = "0"
    }
}