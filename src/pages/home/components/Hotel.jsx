import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

export default function Hotel() {

    const [data, setdata] = useState([])
    useEffect(() => {
        fetch('http://localhost:5000/hotel_list', {
            method: 'GET', mode: 'cors',credentials:'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json()).then(data => setdata(data))
    }, [])
    if (data.length > 0) return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "20em 20em 20em 20em",
                gridTemplateRows:"auto auto",
                margin: 'auto 0 auto 0',
                width: '60%'
            }}
        >
            {data.map((obj) => {
                return (
                    <HOTEL_RETURN
                        price={obj.cheapestPrice}
                        city={obj.city}
                        image_url={obj.photos[0]}
                        type={obj.type}
                        id={obj._id}
                        rating = {obj.rating}
                        // rate={obj.rate}
                    />
                );
            })}
        </div>
    );
    if (data.length === 0) return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                margin: 'auto 0 auto 0'
            }}
        >

        </div>
    );
}

function HOTEL_RETURN(props) {
    let price_text = `Starting from ${props.price}`;
    return (
        <Link to={`/detail/${props.id}`}>
            <img src={props.image_url} alt="" style={{
                maxWidth: '18em',
                height: '18em'
            }}/>
            <h3>{props.name}</h3>
            <p>City: {props.city} - Rating: {props.rating}</p>
            <h3>{price_text}</h3>
            <div style={{display: 'grid', gridTemplateColumns: '2em auto'}}>
                {/*<span style={{border:'solid 2px',background:'black',color:'white',textAlign:'center'}}>{props.rate}</span>*/}
                <p>{props.type}</p>
            </div>

        </Link>
    );
}
