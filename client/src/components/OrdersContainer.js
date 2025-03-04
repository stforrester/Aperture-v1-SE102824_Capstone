import { useState, useEffect } from 'react'

import OrdersList from './OrdersList.js'

function OrdersContainer() {

    const [orders, setOrders] = useState()
    const [error, setError] = useState()

    useEffect(() => {
        fetch('/placed_orders')
        .then(response => {
            if(response.ok){
                response.json()
                .then(data => {
                    setOrders(data)
                })
            }
            else {
                response.json()
                .then(error => setError(error))
            }
        })
    }, [])

    if(!orders) return <div>Loading Order History...</div>

    return (
        <div>
            <OrdersList orders={orders} />
        </div>
    )
}

export default OrdersContainer