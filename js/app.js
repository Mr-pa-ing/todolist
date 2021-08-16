// UI
const form = document.getElementById('task-form');
const taskinput = document.getElementById('task');
const filter = document.getElementById('filter');
const tasklist = document.querySelector('.collection');
const clearbtn = document.querySelector('.clear-tasks');

function addtask(e){
    // console.log("hay");

    // if(taskinput.value === ''){
    //     window.alert("Add a task");
    // }

    if(taskinput.value === ''){
        window.alert("Add a task");
        return;
    }

    // console.log(taskinput.value);

    // create li element
    const li = document.createElement('li');

    // add class
    li.className = "collection-item";

    // create text node append to li
    li.appendChild(document.createTextNode(taskinput.value));

    // create link
    const link = document.createElement('a');

    // add class
    link.className = "delete-item secondary-content";

    // add icon
    link.innerHTML = `<i class="far fa-trash-alt"></i>`;

    // append link to li
    li.appendChild(link);

    // append li to ul
    tasklist.appendChild(li);

    // console.log(link);
    // console.log(li);


    storetaskinlocalstorage(taskinput.value);
    e.preventDefault();

    taskinput.value='';
}

// Remove Task
function removetask(e){
    // console.log(e.target);
    // console.log(e.target.parentElement);

    if(e.target.parentElement.classList.contains('delete-item')){
        // console.log('delete-item');

        if(confirm('Are you sure')){
                // i       a             li
            e.target.parentElement.parentElement.remove();
        }

    }

    // Remove task from localStorage
                                // i       a           li
    removefromlocalstorage(e.target.parentElement.parentElement);

}

// Clear tasks
function cleartasks(){
    // console.log("hay");

    // Method 1
    // tasklist.innerHTML = '';

    // Method 2
    // console.log(tasklist);
    // console.log(tasklist.childElementCount);
    let x= 0;
    while(x < tasklist.childElementCount){
        tasklist.removeChild(tasklist.firstChild);
    }

    // Clear all tasks from localStorage
    clearalldatafromlocalStorage();
}

// Store Task
function storetaskinlocalstorage(task){
    // console.log(task);

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.push(task);

    localStorage.setItem('tasks',JSON.stringify(tasks));
    
}

// Get tasks from localStorage
function gettasks(){
    // console.log("hay");

    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks=[];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task)=>{
        // console.log(task);

        // create li element
        const li = document.createElement('li');

        // add class
        li.className = "collection-item";

        // create textnode and appendChild
        li.appendChild(document.createTextNode(task));

        // create new link Element
        const link = document.createElement('a');

        // add class
        link.className = "delete-item secondary-content";

        // add icon
        link.innerHTML = `<i class="far fa-trash-alt"></i>`;

        // append link to li
        li.appendChild(link);

        // console.log(li);

        // append li to ul
        tasklist.appendChild(li);
    });
}

// Remove task from localStorage
function removefromlocalstorage(taskitem){
    // console.log("hay");
    // console.log(taskitem.textContent);

    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks = [];
    }else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach((task,index)=>{
        // console.log(task);

        if(taskitem.textContent === task){

            tasks.splice(index,1);
        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));

}

// Clear All Data from localStorage
function clearalldatafromlocalStorage(){
    localStorage.clear();
}

// Filter Tasks
function filtertasks(e){
    // console.log('hay');
    // console.log(e.target);
    const inputfilter = e.target.value.toLowerCase();
    // console.log(inputfilter);

    const tasks = document.querySelectorAll('.collection-item');
    // console.log(tasks);

    tasks.forEach((task)=>{
        // console.log(task);

        const item = task.firstChild.textContent.toLowerCase();
        // console.log(item);

        if(item.indexOf(inputfilter) !== -1){
            task.style.display = "block";
        }else{
            task.style.display = "none";
        }

    });
}



// Event Listener
// Add Task
form.addEventListener('submit',addtask);

// Remove task
tasklist.addEventListener('click',removetask);

// Clear tasks
clearbtn.addEventListener('click',cleartasks);

// DOM Load Event
document.addEventListener('DOMContentLoaded',gettasks);

// Filter task event
filter.addEventListener('keyup',filtertasks);