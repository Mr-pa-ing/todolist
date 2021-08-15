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

// Event Listener
// Add Task
form.addEventListener('submit',addtask);

// Remove task
tasklist.addEventListener('click',removetask);

// Clear tasks
clearbtn.addEventListener('click',cleartasks);