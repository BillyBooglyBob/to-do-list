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
*/

import './style.css';