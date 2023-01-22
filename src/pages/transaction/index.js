import {useEffect, useState} from "react";

export default function Transaction() {
    const [state,setState] = useState(null)

    useEffect(()=>{
        if (localStorage.getItem('user_id') !== '' && localStorage.getItem('user_id') !== null && localStorage.getItem('user_id') !== undefined)
            fetch(`http://localhost:5000/booking/${localStorage.getItem('user_id')}`, {
                method: 'get', mode: 'cors', credentials: 'include',
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json()).then(data => {setState(data)})
    },[])
    if(state!== null) return <>
        <table>
            <tr>
                <th style={{width:'20em', textAlign:'center'} }>Hotel</th>
                <th style={{width:'10em', textAlign:'center'} }>Room</th>
                <th style={{width:'15em', textAlign:'center'} }>Date</th>
                <th style={{width:'5em', textAlign:'center'} }>Price</th>
                <th style={{width:'10em', textAlign:'center'} }>Payment</th>
                <th style={{width:'5em', textAlign:'center'} }>Status</th>
            </tr>
            {state.map(el => {
                return <tr>
                    <td>{el.hotel.name}</td>
                    <td>{el.roomNumbers.toString()}</td>
                    <td>{new Date(el.dateStart.toString()).toLocaleDateString()} - {new Date(el.dateEnd.toString()).toLocaleDateString()}</td>
                    <td>${el.price}</td>
                    <td>{el.Payment}</td>
                    <td>{el.status}</td>
                </tr>
            })

            }
        </table>
    </>
    if (state===null) return
}