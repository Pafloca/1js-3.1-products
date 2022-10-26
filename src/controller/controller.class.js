const View = require('../view/view.class')
const Store = require('../model/store.class')

class Controller{
    constructor() {
        this.store = new Store(1, "Almacen1");
        this.view = new View();
    }


    listenersValidator() {
        const nombre = document.getElementById('newprod-name');
        nombre.addEventListener('blur', () => {
            if (this.store.encontrarNombre(nombre.value)) {
                nombre.setCustomValidity("Ese producto ya existe");
            } else {
                nombre.setCustomValidity(""); 
            }
            nombre.nextElementSibling.textContent = nombre.validationMessage;
        })

        const categoria = document.getElementById('newprod-cat');
        categoria.addEventListener('blur', () => {
            categoria.nextElementSibling.textContent = categoria.validationMessage;
        })

        const precio = document.getElementById('newprod-price');
        precio.addEventListener('blur', () => {
            precio.nextElementSibling.textContent = precio.validationMessage;
        })

        const unidad = document.getElementById('newprod-units');
        unidad.addEventListener('blur', () => {
            unidad.nextElementSibling.textContent = unidad.validationMessage;
        })

        const form = document.getElementById("new-prod");
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            nombre.nextElementSibling.textContent = nombre.validationMessage;
            categoria.nextElementSibling.textContent = categoria.validationMessage;
            precio.nextElementSibling.textContent = precio.validationMessage;
            unidad.nextElementSibling.textContent = unidad.validationMessage;
        })
    }
    
    addCategoryToStore(payload) {
        try{
            let categoria = this.store.addCategory(payload.name, payload.desc);
            this.view.anyadirCategoria(categoria);
            this.view.vistaCategorias();
        } catch(error) {
            this.view.renderError(error);
        }
    }

    addProductToStore(payload) {
        if (document.getElementById("new-prod").checkValidity()) {
            try {
                if(payload.id) {
                    this.modificarProducto(payload);
                } else {
                    let producto = this.store.addProduct(payload);
                    this.view.anyadirProducto(producto, this.deleteProductFromStore.bind(this), this.sumarProducto.bind(this), this.restarProducto.bind(this), this.editarProducto.bind(this));
                    this.view.total(this.store.totalImport());
                    this.view.vistaProductos();
                }  
            } catch(error) {
                this.view.renderError(error);
            }
        }
    }

    modificarProducto(payload) {
        try{
            let producto = this.store.modProduct(payload);
            this.view.modProduct(producto);
            this.view.total(this.store.totalImport());
            this.view.cambiarTituloAnyadir();
            this.view.vistaProductos();
        } catch(error) {
            this.view.renderError(error);
        }
    }
    
    init() {
        this.store.initDate();
        this.store.categories.forEach((categoria) => this.view.anyadirCategoria(categoria))
        this.store.products.forEach((producto) => this.view.anyadirProducto(producto, this.deleteProductFromStore.bind(this), this.sumarProducto.bind(this), this.restarProducto.bind(this), this.editarProducto.bind(this)))
        this.view.total(this.store.totalImport());
        this.iniciarMenu();
        this.view.vistaProductos();
        this.listenersValidator();
    }

    iniciarMenu() {
        document.getElementById('productosList').addEventListener('click', () => {
            this.view.vistaProductos();
           })   
           document.getElementById('categoriasList').addEventListener('click', () => {
            this.view.vistaCategorias();
           })
           document.getElementById('anyadirProductos').addEventListener('click', () => {
            this.view.vistaAnyadirProductos();
           })
           document.getElementById('anyadirCategorias').addEventListener('click', () => {
            this.view.vistaAnyadirCategorias();
           })   
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

    sumarProducto(payload) {
        let producto = this.store.masUds(payload);
        this.view.units(producto);
        this.view.total(this.store.totalImport());
    }

    restarProducto(payload) {
        try{
           let producto = this.store.menUds(payload);
            this.view.units(producto);
            this.view.total(this.store.totalImport());
        } catch(error) {
            this.view.renderError(error);
        }
    }

    editarProducto(payload) {
        let producto = this.store.getProductById(payload.id);
        this.view.editar(producto);
        this.view.vistaAnyadirProductos();
    }
}

module.exports = Controller