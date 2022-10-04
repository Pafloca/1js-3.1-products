const View = require('../view/view.class')
const Store = require('../model/store.class')

class Controller{
    constructor() {
        this.store = new Store(1, "Almacen1");
        this.view = new View();
    }
}

function addCategoryToStore(payload) {
    this.store.addCategory(payload.name, payload.description);
    this.view.anyadirCategoria();
}

function init() {
    
}