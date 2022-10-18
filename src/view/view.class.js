class View {
    anyadirCategoria(payload) {
        let categoria = document.getElementById("newprod-cat");
        var option = document.createElement("option");
        option.setAttribute('value', payload.id);
        option.setAttribute('id', 'cat-' + payload.id);
        option.text = payload.name;
        categoria.add(option);
        
    }

    anyadirProducto(payload, funcionDel, funcionSum, funcionRest, funcionEdit) {
        let tabla = document.querySelector("#almacen tbody");
        var producto = document.createElement("tr");
        producto.setAttribute('id', 'prod-' + payload.id);
        producto.setAttribute('class', 'text-center');
        producto.innerHTML = `
        <td>${payload.id}</td>
        <td>${payload.name}</td>
        <td>${payload.category}</td>
        <td id="units-${payload.id}">${payload.units}</td>
        <td>${payload.price}</td>
        <td id="import-${payload.id}">${payload.productImport()}</td>
        <td>
        <button class="btn btn-primary" id="rest-${payload.id}">
        <span class="material-icons">expand_more</span>
        </button>

        <button class="btn btn-primary" id="sum-${payload.id}">
        <span class="material-icons">expand_less</span>
        </button>

        <button class="btn btn-success" id="edit-${payload.id}">
        <span class="material-icons">draw</span>
        </button>

        <button class="btn btn-danger" id="del-${payload.id}">
        <span class="material-icons">delete</span>
        </button>
        
        </td>`;
        tabla.appendChild(producto);
        document.getElementById('del-' + payload.id).addEventListener('click', () => {
            let mensaje = confirm("Seguro que quieres borrar este producto?!");
            if (mensaje) {
                funcionDel(payload.id);
            }
           })

        document.getElementById('sum-' + payload.id).addEventListener('click', () => {
            funcionSum(payload);
           })

        document.getElementById('rest-' + payload.id).addEventListener('click', () => {
            funcionRest(payload);
           })   

        document.getElementById('edit-' + payload.id).addEventListener('click', () => {
            funcionEdit(payload);
           })     
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
        setInterval(function () {tabla.remove()}, 3000);
    }

    total(suma) {
        let tabla = document.getElementById("importe");
        tabla.textContent = `${suma} €`
    }

    units(payload) {
        let tabla = document.getElementById("units-" + payload.id);
        tabla.textContent = payload.units;
        let importe = document.getElementById("import-" + payload.id);
        importe.textContent = payload.productImport().toFixed(2);
    }

    editar(payload) {
        document.getElementById("newprod-id").value = payload.id;
        document.getElementById("newprod-name").value = payload.name;
        document.getElementById("newprod-cat").value = payload.category;
        document.getElementById("newprod-units").value = payload.units;
        document.getElementById("newprod-price").value = payload.price;
    }

    modProduct(payload) {
        let producto = document.getElementById("prod-" + payload.id).children;
        producto[1].textContent = payload.name;
        producto[2].textContent = payload.category;
        producto[3].textContent = payload.units;
        producto[4].textContent = payload.price;
        producto[5].textContent = payload.productImport().toFixed(2);

    }
}

module.exports = View