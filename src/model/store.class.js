const Category = require('./category.class');
const Product = require('./product.class');

class Store{
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.products = new Array();
        this.categories = new Array();
    }

    getCategoryById(id) {
        let getCategory = this.categories.find(category => category.id === id);
        if(!getCategory) {
            throw 'La id no existe'
        }
        return getCategory;
    }

    getCategoryByName(name) {
        let getCategory = this.categories.find(category => category.name.toLocaleUpperCase() === name.toLocaleUpperCase());
        if(!getCategory) {
            throw 'El nombre no existe'
        }
        return getCategory;
    }

    getProductById(id) {
        let getProduct = this.products.find(product => product.id === id);
        if(!getProduct) {
            throw 'El id no existe'
        }
        return getProduct;
    }

    
    getProductsByCategory(id) {
        return this.products.filter(producto => producto.category === id)
    }

    addCategory(name, descripcion) {
        if(!name) {
            throw 'Debes de poner un nombre'
        }
        try {
            this.getCategoryByName(name)  
        } catch(error) {
            let maximoId;
            if(this.categories.length === 0) {
                maximoId = 1;
            } else {
                maximoId = this.categories[(this.categories.length) - 1].id + 1;
            }
            let category = new Category(maximoId, name, descripcion);
            this.categories.push(category);
            return category;
        }
        throw 'Ya existe la categoria'
    }

    

    addProduct(payload) {
        if(!payload.name) {
            throw 'Debes de poner un nombre'
        }
        if(!payload.category) {
            throw 'Debes de poner una categoria'
        }

        this.getCategoryById(payload.category);

        if(!payload.price || payload.price < 0 || typeof payload.price !== 'number') {
            throw 'Debes de poner un precio'
        }
        if(payload.units) {
            if (payload.units <= 0 || isNaN(payload.units) || !Number.isInteger(payload.units)) {
                throw 'Debes de poner una unidad'
            }
        }

        let maximoId;
            if(this.products.length === 0) {
                maximoId = 1;
            } else {
                maximoId = this.products[(this.products.length) - 1].id + 1;
            }

        let product = new Product (maximoId, payload.name, payload.category, payload.price, payload.units);

        this.products.push(product);
        return product;
    }

    delCategory(id) {
        let getCategory = this.getCategoryById(id);
        let prod = this.getProductsByCategory(id);
        if (prod.length > 0) {
            throw 'La categoria contiene productos';
        }
        let index = this.categories.indexOf(getCategory);
        this.categories.splice(index, 1);
        return getCategory;
    }

    delProduct(id) {
        let getProduct = this.getProductById(id);
        if(!getProduct) {
            throw 'La id no existe'
        }
        if(getProduct.units) {
            throw 'Este producto tiene unidades'
        }
        let index = this.products.indexOf(getProduct);
        this.products.splice(index, 1);
        return getProduct;
    }

    totalImport() {
        let importe = this.products.reduce((total, imp) => total += imp.productImport(), 0);
        return importe;
    }

    orderByUnitsDesc() {
        let unidades = this.products.sort((prod1, prod2) => prod2.units - prod1.units);
        return unidades;
    }

    orderByName() {
        return this.products.sort((nom1, nom2) => nom1.name.localeCompare(nom2.name));
    }

    underStock(units) {
        let arrayStock = this.products.filter(unidad => unidad.units < units);
        return arrayStock;
    }

    toString() {
        this.name + " => " + this.products.length + " productos: " + this.totalImport() +
        this.products.forEach((producto) => {
            producto.toString;
        })
    }

}

module.exports = Store

