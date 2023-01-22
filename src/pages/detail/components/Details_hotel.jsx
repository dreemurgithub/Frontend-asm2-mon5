import styles from './Detail_page.module.css'
import LoadRoom from "./loadroom";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Detail_page() {
    const {id} = useParams()

    const [obj, setobj] = useState()
    useEffect(() => {
        fetch(`http://localhost:5000/hotel_list/${id}`, {
            method: 'GET', mode: 'cors',credentials:'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json()).then(data => setobj(data))
    }, [id])
    if (obj === null || obj === undefined) return null;
    if (obj !== null && obj !== undefined) return <div>
        <div>

            <h1>{obj.name}</h1>
            <i className="fa fa-map-marker" aria-hidden="true"></i>{obj.address}
            <p>Excellent location - {obj.distance}m from center</p>
            <p>Book a stay over ${obj.cheapestPrice} at this property and get a free airport taxi</p>

            <div className={styles['gallery-container']}>
                <div className={styles['gallery-box']}>
                    {obj.photos.map((el) => {
                        return <img src={el} alt="" style={{maxWidth: '20em', width: '60%'}}/>
                    })}
                </div>
        </div>
            <div className={styles['foot']}>
                <div className={styles['description-box']}>
                    <h3>{obj.title}</h3>
                    <p>{obj.desc}</p>
                </div>
                {/*<div className={styles['register-box']}>*/}
                {/*    <b>${obj.cheapestPrice} (1 night)</b>*/}
                {/*    <button className={styles['register-button']}>Reserve or Book Now</button>*/}
                {/*</div>*/}
                <LoadRoom obj={obj}  />
            </div>

        </div>


    </div>
}