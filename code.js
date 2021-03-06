//variables
const url = 'http://localhost:4000/api/articulos/' 
const contenedor = document.querySelector('tbody')
let = resultados = ''

const modalArticulo = new bootstrap.Modal(document.getElementById('modalArticulo'))
const formArticulo = document.querySelector('form')
const descripcion = document.getElementById('descripcion')
const precio = document.getElementById('precio')
const stock = document.getElementById('stock')
let opcion = ''

btnCrear.addEventListener('click', ()=> {
    descripcion.value = ''
    precio.value = ''
    stock.value = ''
    modalArticulo.show()
    opcion = 'crear'
})

//funcion para mostrar los resultados
const mostrar = (articulos) => {
    articulos.forEach(articulo => {
        resultados +=  `<tr>
                            <td class="text-center">${articulo.id}</td>
                            <td class="text-center">${articulo.descripcion}</td>
                            <td class="text-center">${articulo.precio}</td>
                            <td class="text-center">${articulo.stock}</td>
                            <td class="text-center">
                                <a class="btnEditar btn btn-primary"> Editar </a>
                                <a class="btnBorrar btn btn-danger"> Borrar </a>
                            </td>
                        </tr>
                        `
    })
    
    contenedor.innerHTML = resultados
}

// procedimiento mostrar 
fetch(url)
.then( response => response.json())
.then(data => mostrar(data))
.catch(error => console.log(error))


//emulador jquery PROCEDIMIENTO BORRAR
const on = (element, event, selector, handler) => {
    element.addEventListener(event, e => {
        if(e.target.closest(selector)){
            handler(e)
        }
    })
}
on(document, 'click', '.btnBorrar', e => {
    const fila = e.target.parentNode.parentNode
    const id = fila.firstElementChild.innerHTML
    
    alertify.confirm("Esta seguro que desea borrar?",
    function(){
        fetch(url+id, {
            method: 'DELETE'
        })
        .then (res => res.json())
        .then ( ()=> location.reload() )
    },
    function(){
        alertify.error('Cancelado');
    })
})

//PROCEDIMIENTO EDITAR
let idForm = 0
on(document, 'click', '.btnEditar', e => {
    const fila = e.target.parentNode.parentNode
    idForm = fila.children[0].innerHTML
    const descripcionForm = fila.children[1].innerHTML
    const precioForm = fila.children[2].innerHTML
    const stockForm = fila.children[3].innerHTML
    
    descripcion.value = descripcionForm
    precio.value = precioForm
    stock.value = stockForm
    opcion = 'editar'
    modalArticulo.show()
})

//PROCEDIMIENTO PARA CREAR Y EDITAR
formArticulo.addEventListener('submit', (e) => {
    e.preventDefault()
    if(opcion=='crear'){
        
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value
            })
        })
        .then(response => response.json())
        .then(data =>  {
            const nuevoArticulo = []
            nuevoArticulo.push(data)
            mostrar(nuevoArticulo)
            //location.reload()
        }
        )
        
    }
    if(opcion=='editar'){
        console.log('OPCION EDITAr')
        fetch(url+idForm,{
            method: 'PUT',
            headers: {
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                descripcion:descripcion.value,
                precio:precio.value,
                stock:stock.value
            })
        })
        .then(response => response.json())
        .then(response => location.reload())

    }
    modalArticulo.hide()
})

