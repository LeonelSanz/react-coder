//Función auxiliar para generar la orden.
const ordenGenerada = (nombre, apellido, telefono, email, email2, terms, cart, total) => {
    return {
        buyer: {
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
        },
        items: cart
        ,
        total: total,
        createdAt: new Date().toLocaleString()
    }
}

export default ordenGenerada;