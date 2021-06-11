console.log('task.js chargé');

const task = {

  addAllEventListeners: function(taskElement){

    let taskNameElement = taskElement.querySelector('.task__name-display');
    taskNameElement.addEventListener('click', task.handleClickOnTaskName);

    let taskEditButtonElement = taskElement.querySelector('.task__button--modify');
    taskEditButtonElement.addEventListener('click', task.handleClickOnEditButton);

    let taskInputNameElement =  taskElement.querySelector('.task__name-edit');
    taskInputNameElement.addEventListener('blur', task.handleBlurOnTaskInputName);

    taskInputNameElement.addEventListener('keyup', task.handleKeyUpOnTaskInputName);
    
    let validateButtonElement = taskElement.querySelector('.task__button--validate');
    validateButtonElement.addEventListener('click', task.handleClickOnValidateButtonElement);
  
    let incompleteButtonElement = taskElement.querySelector('.task__button--incomplete');
    incompleteButtonElement.addEventListener('click', task.handleClickOnIncompleteButtonElement);
  
  
  },

  handleClickOnValidateButtonElement : function(event){
    let validateButtonElement = event.currentTarget;
    let taskElement = validateButtonElement.closest('.task');

    taskElement.classList.add('task--complete');
    taskElement.classList.remove('task--todo');

    task.setCompletion(taskElement, 100);

    const taskId = taskElement.dataset.taskId;

      let dataForAPI = {
        'completion' : 100,
      }

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let fetchOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify(dataForAPI)
      }

      const url = 'http://localhost:8080/tasks/' + taskId;
      fetch(url, fetchOptions)
        .then(
          function(reponse){
          return reponse.json()
        })
        .then(
          function(data){
          console.log(data)
        });
  },

  handleClickOnIncompleteButtonElement : function(event){
    let incompleteButtonElement = event.currentTarget;
    let taskElement = incompleteButtonElement.closest('.task');

    taskElement.classList.add('task--todo');
    taskElement.classList.remove('task--complete');

    task.setCompletion(taskElement, 0);

    const taskId = taskElement.dataset.taskId;

      let dataForAPI = {
        'completion' : 0,
      }

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let fetchOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify(dataForAPI)
      }

      const url = 'http://localhost:8080/tasks/' + taskId;
      fetch(url, fetchOptions)
        .then(
          function(reponse){
          return reponse.json()
        })
        .then(
          function(data){
          console.log(data)
        });
  },

  handleClickOnTaskName: function(event){

    let taskNameElement = event.currentTarget;
    console.log(taskNameElement);

    let taskElement = taskNameElement.closest('.task');
    taskElement.classList.add('task--edit');

    let taskNameInputElement = taskElement.querySelector('.task__name-edit');
    taskNameInputElement.focus();

    let length = taskNameInputElement.value.length;
    taskNameInputElement.setSelectionRange(length, length);
  },

  handleClickOnEditButton: function(event){
    task.handleClickOnTaskName(event);
  },

  handleBlurOnTaskInputName: function(event){
    let taskInputNameElement = event.currentTarget;
    let taskNewName = taskInputNameElement.value;

    let taskElement = taskInputNameElement.closest('.task');

    let taskNameElement = taskElement.querySelector('.task__name-display');
    taskNameElement.textContent = taskNewName;

    taskElement.classList.remove('task--edit');

    const taskId = task.getId(taskElement);
  

      let dataForAPI = {
        'title' : taskNewName, 
      };

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let fetchOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: JSON.stringify(dataForAPI)
      }

      const url = 'http://localhost:8080/tasks/' + taskId;
      fetch(url, fetchOptions)
        .then(
          function(reponse){
          return reponse.json()
        })
        .then(
          function(data){
          console.log(data)
        });
  },

  handleKeyUpOnTaskInputName: function(event){
    console.log(event.key);
    if(event.key === 'Enter'){
      task.handleBlurOnTaskInputName(event);
    }
    
  },

  createDOMElement : function(taskName, taskCategoryName){
    let template = document.getElementById('task-template');

    let templateForNewTask = template.content.cloneNode(true);

    templateForNewTask.querySelector('.task').dataset.category = taskCategoryName;
    templateForNewTask.querySelector('.task__category p').textContent = taskCategoryName;

    templateForNewTask.querySelector('.task__name-display').textContent = taskName;

    templateForNewTask.querySelector('.task__name-edit').setAttribute('value', taskName);

    task.addAllEventListeners(templateForNewTask);

    return templateForNewTask;
  },

  setStatus: function(taskElement, status){
    taskElement.querySelector('.task').classList.replace('task--todo', 'task--' + status);
  },

  setCompletion: function(taskElement, completion){
    let progressBar = taskElement.querySelector('.progress-bar__level');
    progressBar.style.width = completion + '%';
    return taskElement;
  },

  setId: function(taskElement, id){
    taskElement.querySelector('.task').dataset.taskId = id;
    return taskElement;
  },

  getId: function(taskElement){
    return taskElement.dataset.taskId;
  }







}