'use strict'

// Aquí importaremos la clase del controlador e instanciaremos uno
const Controller = require('./controller/controller.class')

const myController = new Controller()
myController.init()

// A continuación crearemos una función manejadora para cada formulario
window.addEventListener('load', () => {

  // función manejadora del formulario 'new-prod'
  document.getElementById('new-prod').addEventListener('submit', (event) => {
    event.preventDefault()

    const id = document.getElementById('newprod-id').value
    const name = document.getElementById('newprod-name').value
    const price = document.getElementById('newprod-price').value 
    const category = document.getElementById('newprod-cat').value
    const units = document.getElementById('newprod-units').value

    myController.addProductToStore({ id, name, category, price, units })
    document.getElementById('new-prod').reset();

  })

  document.getElementById('del-cat').addEventListener('submit', (event) => {
    event.preventDefault()

    myController.deleteCategoryFromStore(document.getElementById('delcat-id').value)      
  })

  document.getElementById('new-cat').addEventListener('submit', (event) => {
    event.preventDefault()
    
    const name = document.getElementById('newcat-name').value
    let desc = document.getElementById('newcat-desc').value 

    if (desc == "") {
      let undefined;
      desc = undefined;
    }
    
    myController.addCategoryToStore({ name, desc })   

    document.getElementById('new-cat').reset();
  })

})
