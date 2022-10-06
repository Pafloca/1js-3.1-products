const View = require('../view/view.class')
const Store = require('../model/store.class')

class Controller{
    constructor() {
        this.store = new Store(1, "Almacen1");
        this.view = new View();
    }

    addCategoryToStore(payload) {
        try{
            let categoria = this.store.addCategory(payload.name, payload.description);
            this.view.anyadirCategoria(categoria);
        } catch(error) {
            this.view.renderError(error);
        }
    }

    addProductToStore(payload) {
        try {
            let producto = this.store.addProduct(payload);
            this.view.anyadirProducto(producto);
            this.view.total(this.store.totalImport());
        } catch(error) {
            this.view.renderError(error);
        }
        
    }
    
    init() {
        this.store.initDate();
        this.store.categories.forEach((categoria) => this.view.anyadirCategoria(categoria))
        this.store.products.forEach((producto) => this.view.anyadirProducto(producto))
        this.view.total(this.store.totalImport());
    }

    deleteProductFromStore(id) {
    try{
        this.store.delProduct(id);
        this.view.removeProducto(id);
    } catch(error) {
        this.view.renderError(error);
    }
    }

    deleteCategoryFromStore(id) {
        try {
            this.store.delCategory(id);
            this.view.removeCategoria(id);
        } catch(error) {
            this.view.renderError(error);
        }
    }
}

module.exports = Controller