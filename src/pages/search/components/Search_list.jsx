import styles from './Search_list.module.css'
import Date_context from "../../../context_data/date";
import {DateRangePicker, DateRange} from "react-date-range";
import {useContext, useMemo, useState} from "react";
import {Link} from "react-router-dom";
import { useEffect } from 'react';

export default function Search_list() {
    const [state, setState, date_state, setDate_state, people, set_people] = useContext(Date_context)
    
    const [search, set_search] = useState([])

    function fetch_context() {
        fetch('http://localhost:5000/search', {
            method: 'POST', mode: 'cors', credentials: 'include',
            headers: {'Content-Type': 'application/json'}
            , body: JSON.stringify({people: people, time: date_state})
        }).then(res => res.json()).then(data => {
            console.log(data)
            set_search(data)
        })
    }
    useEffect(fetch_context,[])

    return <div className={styles['container-search']}>
        <div>
            <h3>Destination</h3>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>

                <select name="" id="" value={people.city}
                        onChange={(e) => set_people({...people, city: e.target.value})}>
                    <option value="Ha Noi">Ha Noi</option>
                    <option value="Da Nang">Da Nang</option>
                    <option value="Ho Chi Minh">Ho Chi Minh</option>
                </select>
                <input type="button" value={'Search'} className="btn btn-primary" onClick={fetch_context}/>
            </div>


            <br/>
            <label>Check in date</label><br/>
            <input type="text" size='35' value={date_state[0].toLocaleDateString()}/><br/>
            <label>Check out date</label><br/>
            <input type="text" size='35' value={date_state[1].toLocaleDateString()}/><br/>
            <DateRange
                editableDateInputs={true}
                onChange={item => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
            />

            <div className={styles['form-below']}>
                <label htmlFor="">Min price per night</label>
                <input type="number" value={people.min} onChange={(e) => {
                    set_people({...people, min: e.target.value})
                }}/>
            </div>
            <div className={styles['form-below']}>
                <label htmlFor="">Max price per night</label>
                <input type="number" value={people.max} onChange={(e) => {
                    set_people({...people, max: e.target.value})
                }}/>
            </div>
            <div className={styles['form-below']}>
                <label htmlFor="">Adult</label>
                <input type="number" min='0' value={people.adult} onChange={(e) => {
                    set_people({...people, adult: parseInt(e.target.value)})
                }}/>
            </div>
            <div className={styles['form-below']}>
                <label htmlFor="">Children</label>
                <input type="number" min='0' value={people.kid} onChange={(e) => {
                    set_people({...people, kid: parseInt(e.target.value)})
                }}/>
            </div>
            <div className={styles['form-below']}>
                <label htmlFor="">Room</label>
                <input type="number" min='0' value={people.room} onChange={(e) => {
                    set_people({...people, room: e.target.value})
                }}/>
            </div>
                <label>Đề cho cheapest Price của Hotel ko chính xác </label><br/>
                <label>nên ảnh hưởng tới min/max giá trong lệnh search</label>


        </div>

        <div>
            {search.map((item) => {
                return <Card img_url={item.photos[0]}
                             name={item.name} distance={item.distance} cheapestPrice={item.cheapestPrice}
                             rate={item.rating} id={item._id} description={item.desc}
                             address={item.address} img_url2={item.photos[1]}

                />
            })}
        </div>
    </div>

}

function Card({img_url, img_url2, name, distance, tag, type, description, address, rate, cheapestPrice, id}) {
    return (
        <div className={styles['grid-card']}>
            <div>
                <img src={img_url} alt="" className={styles['pic-card']}/>
                <h4>{distance}Km from center</h4>
                <p>{address}</p>
            </div>

            <div>
                <h3>{name}</h3>
                <p style={{
                    background: 'green',
                    color: 'white',
                    textAlign: 'center',
                    width: '10em',
                    borderRadius: '1em'
                }}>{tag}</p>
                <p style={{fontWeight: 'bold'}}>{type}</p>
                <p style={{textAlign: 'justify'}}>{description}</p>

            </div>
            <div className={styles['container-1st-text']}>
                <div className={styles['top-text']}>
                    <span>Rating: </span>
                    <p>{rate}</p>
                </div>
                <div className={styles['bottom-text']}>
                    <img src={img_url2} alt="" style={{width: '10em'}}/><br/>
                    <small>Includes taxes and fees</small>
                    <p>${cheapestPrice}</p>
                    <Link to={`/detail/${id}`}>
                        <button class="btn btn-primary">See availability</button>
                    </Link>
                </div>
            </div>
        </div>)
}

