export class Task {
    #description;
    #dueDate;

    constructor(description, dueDate) {
        this.#description = description;
        // default date, can be overriden
        this.#dueDate = "No Date";
        this.#dueDate = dueDate;
        
        
    }

    getDescription() {
        return this.#description;
    }
    
    getDueDate() {
        return this.#dueDate;
    }
}

export class Project {
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

export class MainProject {
    #projects;
    constructor() {
        const taskNoProject = new Project("All tasks");
        this.#projects = [];
        this.#projects.push(taskNoProject);
    }

    addTaskToProject(projectName, task) {
        // Find the project with the matching name
        let project;

        project = this.getProjectUsingName(projectName);
        project.addTask(task);

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

    getProjectUsingName(projectName) {
        const project = this.#projects.find(project => project.getProjectName() === projectName);        
        return project || -1;
    }

    getProjects() {
        return this.#projects;
        // return this.#projects.map(project => project.getProjectName());
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

    removeProject(projectName) {
        const projectToRemove = this.#projects.find(project => project.getProjectName() === projectName);

        if (projectToRemove) {
            const index = this.#projects.indexOf(projectToRemove);
            this.#projects.splice(index, 1);
        } else {
            alert(`Project '${projectName}' not found`);
        }
    }

    removeTaskFromProject(projectName, taskDescription) {
        const project = this.getProjectUsingName(projectName);

        if (project !== -1) {
            const taskToRemove = project.getTasks().find(task => task.getDescription() === taskDescription);

            if (taskToRemove) {
                project.removeTask(taskToRemove);
            } else {
                alert(`Task '${taskDescription}' not found in project '${projectName}'`);
            }
        } else {
            alert(`Project '${projectName}' not found`);
        }
    }
}