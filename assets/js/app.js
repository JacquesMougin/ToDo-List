const app = {

  init: function() {
    console.log('%c' + 'Methode init executée', 'color: #f0f; font-size: 1rem; background-color:#fff');

    tasksList.loadTasksFromAPI();

    taskForm.addAllEventListeners();

    categoriesList.loadCategoriesFromAPI();

    
  }
};

document.addEventListener('DOMContentLoaded', app.init);

console.log('%c' + 'Scrip.js chargé', 'color: #f0f; font-size: 1rem; background-color:#fff');