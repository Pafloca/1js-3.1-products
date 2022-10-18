class Product{
    constructor(id, name, category, price, units = 0) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.price = price;
        this.units = units;
    }

    productImport() {
        let num = this.price * this.units;
        return num;
    }

    toString() {
        return this.name + ": " + this.units + " uds. x " + this.price + " €/u = " + this.productImport() + " €";
    }
}

module.exports = Product