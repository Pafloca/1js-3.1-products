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

  })

  document.getElementById('del-cat').addEventListener('submit', (event) => {
    event.preventDefault()

    myController.deleteCategoryFromStore(document.getElementById('delcat-id').value)      
  })

  document.getElementById('new-cat').addEventListener('submit', (event) => {
    event.preventDefault()
    
    const name = document.getElementById('newcat-name').value
    const desc = document.getElementById('newcat-desc').value 
    
    myController.addCategoryToStore({ name, desc })   
  })

})
