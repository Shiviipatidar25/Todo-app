document.addEventListener('DOMContentLoaded', () => {
    const todoInput =  document.getElementById("todo-input");
    const addTaskButton = document.getElementById("add-task-btn");
   const todoList = document.getElementById("todo-list");
   
   let tasks = JSON.parse(localStorage.getItem("tasks")) || []; //change the data to original with parse from stringify

   tasks.forEach((tasks) => renderTask(tasks));
   
   addTaskButton.addEventListener("click" , ()=>{
       const taskText = todoInput.value.trim();
       if(taskText === "")return; //input empt then return
   
       const newTask = {
           id: Date.now(),
           text: taskText,
           completed: false,   // added to local storage //check in console
   
       };              
   
       tasks.push(newTask);
       saveTask(); //save in local storage
       renderTask(newTask); //to add one by one
       todoInput.value = "";//clear input
       console.log(tasks);
   })
   
   /* as soon  as the page loads read from the local storage,
    grab all the task , store the task inside tasks[]array , 
    then immediately after , then  run the loop  , inside the llop , read all the individual tasks from this array , 
    and call mymthod so that each of task rendertask and  it. 
      Dom loaded
    */
   
    function renderTask(task){
       //console.log(task);//to see the task
       const li = document.createElement("li");
       li.setAttribute("data-id" , task.id);
       if(task.completed) li.classList.add("completed");
       li.innerHTML = `
       <span>${task.text}</span>
       <button>delete</button>`;

       li.addEventListener("click" ,(e) =>{
        if(e.target.tagName === 'BUTTON') return;
        task.completed = !task.completed
        li.classList.toggle('completed')
        saveTask() // after any maaaanipulation save it again in the local storage
       } );

       li.querySelector('button').addEventListener('click',(e) => {
        e.stopPropagation() //prevent toggle from firing
        tasks = tasks.filter( t => t.id !== task.id)
        li.remove();
        saveTask();

       })

       todoList.appendChild(li);

    }
   
                                              
   //setitem used to add thing to local storage
   
   function saveTask(){
       localStorage.setItem("tasks" , JSON.stringify(tasks)); //stringfy to convert in string  //before read from local storage  , we render the task to the dom
   
   }
   
   
})