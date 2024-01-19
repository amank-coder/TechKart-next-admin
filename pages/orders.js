import { useEffect, useState } from "react"
import Layout from "./components/Layout"
import axios from "axios"

export default function OredersPage(){
    
    const [orders, setOrders] = useState([])
    useEffect(()=>{
        axios.get('/api/orders').then(res=>{
            setOrders(res.data)
        })
    },[])
    return(
        <Layout>
            <h1>Orders</h1>
            <table className="w-full shadow-lg">
                <thead>
                    <tr>
                        <th>DATE</th>
                        <th>RECEIPIENT</th>
                        <th>PRODUCTS</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.length>0 && orders.map(order=>(
                        <tr key={order.name}>
                            <td>{(new Date(order.createdAt)).toDateString()}</td>
                            <td>{order.name}  {order.email}<br />
                                {order.city},{order.state}
                            </td>
                            <td>
                                {order.line_items.map(l=>(
                                    <>
                                        {l.price_data.product_data.name}x{l.quantity}
                                    </>
                                ))}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Layout>
    )
}