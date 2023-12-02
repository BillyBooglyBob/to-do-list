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
- 
*/

import './style.css';
class Task {
    #description;
    #dueDate;

    constructor(description) {
        this.#description = description;
        // default date, can be overriden
        this.#dueDate = "No Date";
    }

    getDescription() {
        return this.#description;
    }
    
    getDueDate() {
        return this.#dueDate;
    }
}

class Project {
    #projectName;
    #tasks;

    constructor(projectName) {
        this.#projectName = projectName;
        this.#tasks = [];
    }

    addTask(task) {
        const duplicateTask = this.#tasks.some(taskA => taskA.getDescription() === task.getDescription());
        if (duplicateTask) {
            alert("Task already exists");
        } else {
            this.#tasks.push(task);
        }
    }

    removeTask(task) {
        const index = this.#tasks.indexOf(task);
        if (index != -1) {
            this.#tasks.splice(index, 1);
        }
    }

    getProjectName() {
        return this.#projectName;
    }

    getTasks() {
        return this.#tasks;
    }
}

class MainProject {
    #projects;

    constructor() {
        this.#projects = [];
    }

    addProject(project) {
        const duplicateProject = this.#projects.some(projectA => 
            projectA.getProjectName() === project.getProjectName());
        if (duplicateProject) {
            alert("Project already exists");
        } else {
            this.#projects.push(project);
        }
    }

    getProject(projectName) {
        return this.#projects.find(project => project.getProjectName() === projectName);
    }

    getAllTasks() {
        const allTasks = this.#projects.reduce((allTasks, project) => allTasks.concat(project.getTasks()), []);

        const sortedTasks = allTasks.sort((taskA, taskB) => new Date(taskA.getDueDate()) - new Date(taskB.getDueDate()));
        return sortedTasks;
    }

    getTasksDueToday() {
        const today = new Date().toISOString().split('T')[0]; // Get today's date in 'YYYY-MM-DD' format
    
        // Use flatMap to extract tasks from all projects into a single array
        const allTasks = this.getAllTasks();
    
        // Filter tasks that are due today
        const tasksDueToday = allTasks.filter(task => task.getDueDate() === today);
    
        return tasksDueToday;
      }
}


// Example usage:
const mainProject = new MainProject();

const projectA = new Project('Project A');
const projectADuplicate = new Project('Project A');
const projectB = new Project('Project B');

const task1 = new Task('Task 1');

const task2 = new Task('Task 2');
const task3 = new Task('Task 3');

projectA.addTask(task1);
projectA.addTask(task2);

projectB.addTask(task3);

mainProject.addProject(projectA);
mainProject.addProject(projectB);

const tasksDueToday = mainProject.getAllTasks();
console.log(tasksDueToday);

const today = new Date().toISOString().split('T')[0]; // the current date is kinda wrong (does it use US time?)
console.log(today);