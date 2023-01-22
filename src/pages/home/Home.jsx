import {useContext, useEffect, useMemo, useState} from "react";
// import Footer from "../Navbar/Footer";
// import Navbar from "../Navbar/Navbar";
import {DateRangePicker} from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {Header, City, Property, Hotel} from "./components";//tập trung các component từ 1 file
import {Link} from "react-router-dom";
import styles from "./Home.module.css";
import Form from "../search/components/Form";
import Date_context from "../../context_data/date";

const Home = () => {
    const [count, set_count] = useState({
        Da_nang: 0, Ha_noi: 0, HCM: 0, hotel: 0,
        apartment: 0, resorts: 0, villas: 0, cabins: 0,
    })
    useEffect(() => {
        fetch(`http://localhost:5000/home`, {
            method: 'GET', mode: 'cors', credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json()).then(data => set_count(data))
    }, [])
    return (
        <div>
            {/*<Navbar />*/}
            {/*<Header/>*/}
            <div>
                <SEARCH_BAR/>
            </div>
            <div>

                <City danang={count.Da_nang} hanoi={count.Ha_noi} hcm={count.HCM}/>
                <Property hotel={count.hotel} aparment={count.apartment} villas={count.villas} resorts={count.resorts} cabin={count.cabins}/>
                <Hotel/>
            </div>
            {/*<Footer />*/}
        </div>
    );
};

export function SEARCH_BAR() {
    // const today = new Date();
    // today.setDate(today.getDate() - 1)
    // const [state, setState] = useState([
    //     {
    //         startDate: today,
    //         endDate: today,
    //         key: 'selection'
    //     }
    // ]);
    // const [date_state, setDate_state] = useState([new Date(), new Date()])
    const [state, setState, date_state, setDate_state, people, set_people] = useContext(Date_context)


    return (
        <>
            <div>

                <div className={styles["search-bar"]}>
                    <div className={styles["text-icon"]}>
                        <i className="fa fa-car"></i>
                        <small>{people.city}</small>
                    </div>
                    <div className={styles["text-icon"]}>
                        <i className="fa fa-calendar"></i>
                        <small>
                            {date_state[0].toLocaleDateString()} to {date_state[1].toLocaleDateString()}
                        </small>
                    </div>
                    <div className={styles["text-icon"]}>
                        <i className="fa fa-female"></i>
                        <small>{people.adult} adult - {people.kid} children - {people.room} room</small>
                    </div>
                    <Link to="/search">
                        <button className="btn btn-primary">Search</button>
                    </Link>
                </div>
                <div style={{display: "grid", gridTemplateColumns: '1fr 1fr', gap: '1em'}}>
                    {/*<span></span>*/}

                    < DateRangePicker
                        onChange={(item) => {
                            setState([item.selection])
                        }}
                        showSelectionPreview={true}
                        moveRangeOnFirstSelection={false}
                        months={1}
                        ranges={state}
                        direction="horizontal"
                    />

                    <form action=""><br/>
                        <select name="" id="" value={people.city}
                                onChange={(e) => set_people({...people, city: e.target.value})}>
                            <option value="Ha Noi">Ha Noi</option>
                            <option value="Da Nang">Da Nang</option>
                            <option value="Ho Chi Minh">Ho Chi Minh</option>
                        </select>
                        <label>Destination</label>
                        <br/>
                        <input type="text" value={date_state[0].toLocaleDateString()}/>
                        <label>Check in date</label><br/>
                        <input type="text" value={date_state[1].toLocaleDateString()}/>
                        <label>Check out date</label><br/>
                        <div className={styles['form-below']}>
                            <input type="number" size='10' value={people.min} onChange={(e) => {
                                set_people({...people, min: e.target.value})
                            }}/>
                            <label htmlFor="">Min price per night</label>
                        </div>
                        <div className={styles['form-below']}>
                            <input type="number" size='10' value={people.max} onChange={(e) => {
                                set_people({...people, max: e.target.value})
                            }}/>
                            <label htmlFor="">Max price per night</label>
                        </div>
                        <div className={styles['form-below']}>
                            <input type="number" min='0' value={people.adult} onChange={(e) => {
                                if(e.target.value!==null && e.target.value!==undefined ) set_people({...people, adult: parseInt(e.target.value)})
                            }}/>
                            <label htmlFor="">Adult</label>
                        </div>
                        <div className={styles['form-below']}>
                            <input type="number" min='0' value={people.kid} onChange={(e) => {
                                set_people({...people, kid: parseInt(e.target.value)})
                            }}/>
                            <label htmlFor="">Children</label>
                        </div>
                        <div className={styles['form-below']}>
                            <input type="number" min='0' value={people.room} onChange={(e) => {
                                set_people({...people, room: e.target.value})
                            }}/>
                            <label htmlFor="">Room</label>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
}


export default Home;
