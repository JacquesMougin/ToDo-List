const categoriesList = {
  categoriesListing : {},


  loadCategoriesFromAPI : function(){
    const url = 'http://localhost:8080/categories';

    fetch(url)
      .then(categoriesList.convertFromJson) 
      .then(categoriesList.registerCategoriesListing)
      .then(categoriesList.displayCategoriesInHeader)
      .then(categoriesList.displayCategoriesInTaskForm);
     
  },

  convertFromJson: function(response){
    return response.json();
  },

  registerCategoriesListing: function(categoriesListing){

      for(let categoryData of categoriesListing){
        let categoryId = categoryData.id;
        categoriesList.categoriesListing[categoryId] = categoryData;
      }

    return categoriesListing;
  },

  //-------------------------------------------------------------
  // methodes couche "VIEW"
  //--------------------------------------------------------------
  displayCategoriesInHeader: function(categoriesListing){
    let selectElement = document.querySelector('select.filters__choice')
    categoriesList.displayCategoriesInSelectElement(selectElement, categoriesListing);
    return categoriesListing;
  },

  displayCategoriesInTaskForm: function(categoriesListing){
    console.log(categoriesListing);
    let selectElement = document.querySelector('.task--add select');
    categoriesList.displayCategoriesInSelectElement(selectElement, categoriesListing);
  },

  displayCategoriesInSelectElement: function(selectElement, categoriesListing){
    for(let categoryData of categoriesListing){
      let optionElement = document.createElement('option');
      optionElement.textContent = categoryData.name;
      optionElement.setAttribute('value', categoryData.id);
      selectElement.appendChild(optionElement);
    }
  },

  //=========================================================
  // méthodes "Models"
  //=========================================================
  findById: function(categoryId){
    return categoriesList.categoriesListing[categoryId];
  },












}