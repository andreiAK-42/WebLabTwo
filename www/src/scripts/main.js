const show_task_menu = document.getElementsByClassName(".add-task-inputs-container")

const add_task_button = document.querySelector('.add-task-button')
const tasksList = document.querySelector('.tasks-container')
var tasks = []



add_task_button.addEventListener('click', function () {
    const taskTitle = document.getElementById("inputTaskTitle").value
    const taskAbout = document.getElementById("inputTaskAbout").value

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
    taskCardContainer.id = tasks.length

    const taskCard = taskCardContainer.querySelector('.task-card')
    taskCard.addEventListener('click', function () {
        const menuTaskContainer = taskCardContainer.querySelector('.menu-task-container')
        menuTaskContainer.classList.toggle('visible')
    })

    tasks.push(tasks.length)

    tasksList.appendChild(taskCardContainer)

    if (tasks && tasks.length == 1) {
        const element = document.querySelector(".no-task-container")
        element.style.display = "none"
        element.style.height = "0"
    }

});