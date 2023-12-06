/* 
main components
- task
    - time
    - description
    - priority (how the tasks are ordered
            - preferrably by date)
    - associated project
        - decides which project it belongs to 
- project
    - each project has its own list of tasks
- main lists
    - all the tasks 
        - tasks with associated project have the project name () after the description
    - task today

- main array with all the tasks
    - organise into maps (key: project name, value: task)
- each project has sub array with tasks that belong to it 
- function to sort the order of the tasks before displaying them 



steps
- create example page html
- buttons should have a delete button only visible when hover
- create add task button
    - use constructor to make the tasks
- make sure tasks correctly displayed on the all tasks page
- add date and organise by it
- create today list
- create add project button
    - project have its own add task button
        - add task to the main tasks array



- create tasks, project, mainProject
- separate modules for model, view and control
- link Add Project and Add Task button to access a form
- form, redraw, model, control (function that uses model and redraw, button calls these)
*/

import './css/style.css';
import './css/form.css';
import { Task, Project, MainProject } from './modules/model';


/* variable to save which project currently selected
- when project clicked, retrieve the current elements innerText
- go through list of projects and check which one has that name
- if its "All Tasks" or "Today" then run different functions
        to retrieve the tasks and pass it to update task 

1 - select project
2 - display relevant tasks
3 - add tasks
4 - delete button
*/


class UI {
    #mainProject;
    #projectSelected;
    
    initialise() {
        this.addFormToButtons();
        this.updateSelectProjectButtons();
        this.#mainProject = new MainProject();
        this.#projectSelected = "All tasks";
    }

    getProjectSelected() {
        return this.#projectSelected;
    }

    setProjectSelected(projectSelected) {
        this.#projectSelected = projectSelected;
    }

    openForm(formName) {
        document.getElementById(formName).style.display = "block";
    }
    
    closeForm(formName, event) {
        event.preventDefault();
        switch (formName) {
            case "project": 
                document.getElementById("project-form").style.display = "none";
                document.getElementById("project-name").value = "";
                break;
            case "task":
                document.getElementById("task-form").style.display = "none";
                document.getElementById("task-name").value = "";
                document.getElementById("task-due-date").value = "";
                break;
        }
    }
    
    submitForm(formName, event) {
        event.preventDefault();
        switch (formName) {
            case "project":
                const projectName = document.getElementById("project-name").value;
                this.createNewProject(projectName);
                break;
            case "task":
                const taskName = document.getElementById("task-name").value;
                const taskDueDate = document.getElementById("task-due-date").value;
                this.createNewTask(taskName, taskDueDate);
                break;
        }

        this.closeForm(formName, event);
    }
    
    addFormToTaskButton() {
        const taskButton = document.getElementById("main-task-button");
        taskButton.addEventListener("click", () => this.openForm("task-form"));
    
        const submitButton = document.getElementById("task-form-container");
        submitButton.addEventListener("submit", (event) => this.submitForm("task", event));
    
        const deleteButton = document.getElementById("task-cancel");
        deleteButton.addEventListener("click", (event) => this.closeForm("task", event));
    }
    
    addFormToProjectButton() {
        const projectButton = document.getElementById("main-project-button");
        projectButton.addEventListener("click", () => this.openForm("project-form"));
    
        const submitButton = document.getElementById("project-form-container");
        submitButton.addEventListener("submit", (event) => this.submitForm("project", event));
    
        const deleteButton = document.getElementById("project-cancel");
        deleteButton.addEventListener("click", (event) => this.closeForm("project", event));
    }

    addSelectProjectButtons() {
        let projects = document.getElementsByClassName("project-description");
        projects = Array.from(projects);
        projects.forEach(project => {
            project.addEventListener("click", function() {
                const projectName = this.textContent;
            })
        });
    }
    
    // add function to the buttons
    addFormToButtons() {
        this.addFormToTaskButton();
        this.addFormToProjectButton();
        this.addSelectProjectButtons();   
    }

    updateSelectProjectButtons() {
        this.selectProjectButtons();
    }

    updateDeleteButtons() {
        this.deleteProjectButton();
        this.deleteTaskButton();
    }

    // create new tasks and projects
    // plus updating the view 

    updateView() {
        this.updateProjects();
        this.updateTasks();
        this.updateSelectProjectButtons();
        this.updateDeleteButtons();
        
    }

    createNewProject(projectName) {
        const newProject = new Project(projectName);
        this.#mainProject.addProject(newProject);
        this.updateView();
    }
    
    createNewTask(description, date) {
        const newTask = new Task(description, date);
        this.#mainProject.addTaskToProject(this.#projectSelected, newTask);
        this.updateView();
    }

    updateProjects() {
        // clear old projects list
        this.clearProjects();

        // // append new updated projects list
        const projectsList = document.getElementById("main-projects");

        this.#mainProject.getProjects().forEach(project => {
            if (project.getProjectName() != "All tasks" 
                && project.getProjectName() != "Today") {
                const projectToAdd = document.createElement("div");
                projectToAdd.innerHTML += `
                    <div class="project tab">
                        <div class="project-icon"></div>
                        <div class="project-description">${project.getProjectName()}</div>
                        <div class="project-delete"></div>
                    </div>
                `;

                projectsList.append(projectToAdd);
            }
        });
    }

    clearProjects() {
        const projectsList = document.getElementById("main-projects");
        projectsList.innerHTML = '';
    }

    updateTasks() {
        // clear old tasks list
        this.clearTasks();

        // append new tasks list based on selected project
        const taskList = document.getElementById("main-tasks");
        let projectToDisplay;
        let projectToDisplayTasks;

        if (this.#projectSelected === "Today") {
            projectToDisplayTasks = this.#mainProject.getTasksDueToday();
        } else if (this.#projectSelected === "All tasks") {
            projectToDisplayTasks = this.#mainProject.getAllTasks();
        } else {
            projectToDisplay = this.#mainProject.getProjectUsingName(this.#projectSelected);
            projectToDisplayTasks = projectToDisplay.getTasks();
        }
        
        projectToDisplayTasks.forEach(task => {
            const taskToAdd = document.createElement("div");
            taskToAdd.innerHTML += `
            <div class="task tab">
                        <div class="task-icon"></div>
                        <div class="task-description">${task.getDescription()}</div>
                        <div class="task-date">${task.getDueDate()}</div>
                        <div class="task-delete"></div>
            </div>`

        taskList.appendChild(taskToAdd);
        })
    }

    clearTasks() {
        const taskList = document.getElementById("main-tasks");
        taskList.innerHTML = '';
    }


    // select projects
    selectProjectButtons() {
        let projects = document.getElementsByClassName("project");
        projects = Array.from(projects);

        projects.forEach(project => {
            project.addEventListener("click", 
            () => this.selectUpdateProject(project.textContent.trim()));
        });
    }

    selectUpdateProject(projectName) {
        // do not run if the project was deleted
        if (this.#mainProject.getProjectUsingName(projectName) != -1) {
            this.setProjectSelected(projectName);
        }
        this.updateView();
    }

    // delete project
    deleteProjectButton() {
        let projects = document.getElementsByClassName("project-delete");
        projects = Array.from(projects);

        projects.forEach(project => {
            project.addEventListener("click",
            () => {
                // Get the project description element
                const projectDescriptionElement = project.previousElementSibling;
    
                // Get the project name from the project description element
                const projectName = projectDescriptionElement.textContent.trim();
                this.deleteProject(projectName);
                
            });
        })
    }

    deleteProject(projectName) {
        this.#mainProject.removeProject(projectName);
        this.updateView();

        // set project selected back to the default
        this.#projectSelected = "All tasks";
    }

    // delete task
    deleteTaskButton() {
        let tasks = document.getElementsByClassName("task-delete");
        tasks = Array.from(tasks);

        tasks.forEach(task => {
            task.addEventListener("click",
            () => {
                // Get the project description element
                let taskDescriptionElement = task.previousElementSibling;
                taskDescriptionElement = taskDescriptionElement.previousElementSibling;

    
                // Get the project name from the project description element
                const taskName = taskDescriptionElement.textContent.trim();
                this.deleteTask(this.#projectSelected, taskName);
                
            });
        })
    }

    deleteTask(projectName, taskName) {
        this.#mainProject.removeTaskFromProject(projectName, taskName);
        this.updateView();
    }
}

const initialisation = new UI();
initialisation.initialise();

