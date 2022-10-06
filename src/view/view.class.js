class View {
    anyadirCategoria(payload) {
        let categoria = document.getElementById("newprod-cat");
        var option = document.createElement("option");
        option.setAttribute('value', payload.id);
        option.setAttribute('id', 'cat-' + payload.id);
        option.text = payload.name;
        categoria.add(option);
        
    }

    anyadirProducto(payload) {
        let tabla = document.querySelector("#almacen tbody");
        var producto = document.createElement("tr");
        producto.setAttribute('id', 'prod-' + payload.id);
        producto.innerHTML = `
        <td>${payload.id}</td>
        <td>${payload.name}</td>
        <td>${payload.category}</td>
        <td>${payload.units}</td>
        <td>${payload.price}</td>
        <td>${payload.productImport()}</td>
        <td></td>`;
        tabla.appendChild(producto);

    }

    removeProducto(id) {
        let producto = document.getElementById("prod-" + id);
        producto.remove();
    }

    removeCategoria(id) {
        let categoria = document.getElementById("cat-" + id);
        categoria.remove();
    }

    renderError(error) {
        let tabla = document.getElementById("messages");
        var producto = document.createElement("div");
        producto.setAttribute('class', 'alert alert-danger alert-dismissible');
        producto.setAttribute('role', 'alert');
        producto.innerHTML = `${error} 
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" onclick="this.parentElement.remove()"></button>`;
        tabla.appendChild(producto);
    }

    total(suma) {
        let tabla = document.getElementById("importe");
        tabla.textContent = `${suma} €`
    }
}

module.exports = View