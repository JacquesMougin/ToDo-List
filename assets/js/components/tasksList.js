console.log('%c' + 'tasksList.js chargé', 'color: #f0f; font-size: 1rem; background-color:#fff');


const tasksList = {
  initializeTasksFromDom: function (){
    console.log('%c' + 'Methode initializeTasksFromDom executée depuis module tasksList', 'color: #f0f; font-size: 1rem; background-color:#fff');
     
    let taskElementsList = document.querySelectorAll('.tasks .task');

    for(let taskElement of taskElementsList){
      task.addAllEventListeners(taskElement)
    }
  },

  addTaskInDOM : function(taskElement){
    let taskListElement = document.querySelector('.tasks');
    taskListElement.prepend(taskElement);
  },

  loadTasksFromAPI: function(){
    const url = 'http://localhost:8080/tasks';


    let fetchOptions = 
     {
      mode: 'cors',
     };
    fetch(url, fetchOptions)
      .then(tasksList.convertFromJson)
      .then(tasksList.displayTasks); 
  },

  convertFromJson(response){
    return response.json();
  },

  displayTasks: function(tasksListing){

      for(let taskData of tasksListing){

        let taskName = taskData.title;
        let categoryName = taskData.category.name;

        let taskElement = task.createDOMElement(taskName, categoryName);
        console.log(taskData.id);

        if(taskData.status == 2){
          task.setStatus(taskElement, 'archive');
        }
        else if(taskData.status == 1 && taskData.completion == 100){
          task.setStatus(taskElement, 'complete');
        }

        task.setCompletion(taskElement, taskData.completion);
        task.setId(taskElement, taskData.id);

        tasksList.addTaskInDOM(taskElement)




      }

  }

  







}