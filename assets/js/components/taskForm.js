console.log('%c' + 'taskForm.js chargé', 'color: #f0f; font-size: 1rem; background-color:#fff');
const taskForm = {

  addAllEventListeners: function(){
    let formElement = document.querySelector('.task--add form')
    formElement.addEventListener('submit', taskForm.handleFormSubmit);
  },

  handleFormSubmit: function(event){
    event.preventDefault();
    let taskNewNameElement = document.querySelector('.task__name-edit');
    let taskNewName = taskNewNameElement.value;

    let selectCategoriesElement = document.querySelector('.task__category select')
    let categoryId = selectCategoriesElement.value;

    taskForm.saveNewTaskIntoAPI(taskNewName, categoryId);
  },

  saveNewTaskIntoAPI : function(taskName, categoryId){
      let dataForAPI = {
        'title': taskName,
        'categoryId': categoryId,
        'completion': 0,
        'status': 1
      }

      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      let fetchOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(dataForAPI)
      }

      const url = 'http://localhost:8080/tasks';
      fetch(url, fetchOptions)
        .then(
          function(reponse){
          if(reponse.status == 201){
            return reponse.json();
          }else{
            alert('PEPIN');
          }
        })
        .then(
          function(newTaskData){
          
          let categoryData = categoriesList.findById(newTaskData.category_id);
          console.log('DANS FETCH CATEGORY DATA : ');

          let taskElement = task.createDOMElement(newTaskData.title, categoryData.name);

          task.setId(taskElement, newTaskData.id);
          tasksList.addTaskInDOM(taskElement);
        });
  }





}