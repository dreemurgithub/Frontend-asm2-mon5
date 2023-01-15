import styles from './Detail_page.module.css'
import {DateRangePicker} from "react-date-range";
import {Link, useNavigate} from "react-router-dom";
import {useState, useMemo, useEffect} from "react";

export default function LoadRoom({obj}) {
    const navigate = useNavigate()

    function cal_total() {
        const days = (date_state[1] - date_state[0]) / (1000 * 60 * 60 * 24) + 1
        const all_room = {}
        obj.rooms.forEach(el => {
            all_room[el] = JSON.parse(localStorage.getItem(el))
        })
        let total = 0;
        obj.rooms.forEach(el => {
            total += all_room[el].price * all_room[el].room_list.length
        })
        document.querySelector('#total').textContent = total * days
    }

    function transcation() {
        const days = (date_state[1] - date_state[0]) / (1000 * 60 * 60 * 24) + 1
        const all_room = {}
        obj.rooms.forEach(el => {
            all_room[el] = JSON.parse(localStorage.getItem(el))
        })
        fetch('http://localhost:5000/booking', {
            method: 'POST', mode: 'cors', credentials: 'include',
            headers: {'Content-Type': 'application/json'}
            , body: JSON.stringify({
                    all_room: all_room,
                    dateStart: date_state[0],
                    dateEnd: date_state[1],
                    hotel: obj,
                    user: [document.querySelectorAll('form>input')[0].value, document.querySelectorAll('form>input')[1].value, document.querySelectorAll('form>input')[2].value, document.querySelectorAll('form>input')[3].value],
                    user_id: localStorage.getItem('user_id'),
                    Payment: document.querySelector('#payment').value
                }
            )
        }).then(() => document.querySelector('#Transaction_link').click())
    }

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);
    const [date_state, setDate_state] = useState([new Date(), new Date()])
    // lấy datediff của date_state[1] và date_state[0] tính số ngày nhân giá phòng
    useMemo(() => {//đổi ngày bắt đầu trong input
        setDate_state((date_state) => {
            date_state.map(el => el);
            date_state[0] = state[0].startDate
            return date_state;
        })
    }, [state[0].startDate])
    useMemo(() => {//đổi ngày end trong input
        setDate_state((date_state) => {
            date_state.map(el => el);
            date_state[1] = state[0].endDate
            return date_state;
        })
    }, [state[0].endDate])
    return <>
        <div className={styles['register-box']}>
            <b>${obj.cheapestPrice} (1 night)</b>
            <button className={styles['register-button']} onClick={transcation}>Reserve or Book Now</button>
        </div>
        <div style={{marginLeft: '5em'}}>
            <form>
                <h3>Reserve Infor</h3>
                <label htmlFor="">Your full name</label><br/>
                <input type="text" size='40'/><br/>
                <label htmlFor="">Your Email</label><br/>
                <input type="text" size='40'/><br/>
                <label htmlFor="">Your phone number</label><br/>
                <input type="text" size='40'/><br/>
                <label htmlFor="">Your ID card</label><br/>
                <input type="text" size='40'/><br/>
                <h3>Total Bills: $<span id='total'></span></h3>
                {/*// use context*/}
                <select name="" id="payment">
                    <option value="">Select Payment Method</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                </select> <br/>

            </form>
            <button className="btn btn-primary" onClick={transcation}>Reserve Now</button>
            <button type="button" className="btn btn-secondary" onClick={cal_total}>Calculate total
            </button>

            <h3>Select Room</h3>
        </div>

        <Date_picker date_state={date_state} setDate_state={setDate_state}
                     state={state} setState={setState}
        />
        {
            obj.rooms.map(el => <Room id={el}/>)
        }

    </>
}

function Date_picker({state, setState, date_state, setDate_state}) {
    return (
        <>
            <div>
                <div style={{display: 'flex'}}>
                    <input type="text" value={date_state[0].toLocaleDateString()}
                           style={{width: '17em', textAlign: 'center'}}/>
                    <input type="text" value={date_state[1].toLocaleDateString()}
                           style={{width: '17em', textAlign: 'center'}}/>
                </div>
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
            </div>

        </>
    );
}

function Room({id}) {
    const [room_list, set_list] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/hotel_room/${id}`, {
            method: 'GET', mode: 'cors', credentials: 'include',
            headers: {'Content-Type': 'application/json'}
        })
            .then(res => res.json()).then(data => setroom(data))
    }, [])
    const [room, setroom] = useState(null)
    useEffect(() => {
        if (room !== null) localStorage.setItem(room._id, JSON.stringify({
            price: room.price,
            room_list: room_list
        }))
    })
    if (room === null) return;
    if (room !== null) return <>
        <div style={{marginLeft: '5em'}} id={room._id}>
            <div style={{display: 'flex', gap: '0.5em'}}>

                <h3>{room.title}: </h3><h3>${room.price * room_list.length}/per day</h3>
            </div>
            <div style={{display: 'flex', gap: '1em'}}>
                <div>
                    <p>Pay nothing until {room.updatedAt.toString().slice(0, 10)}</p>
                    <p>max people: {room.maxPeople}</p>

                </div>
                <div style={{display: 'flex', gap: '0.5em'}}>
                    {room.roomNumbers.map(el => <div
                        style={{
                            display: 'grid',
                            gridTemplateRows: '1fr 1fr',
                            gridTemplateColumns: '1fr'
                        }}>
                        <label htmlFor="">{el}</label>
                        <input type="checkbox" onChange={(e) => {
                            if (e.target.checked === true) {
                                set_list((room_list) => {
                                    if (room_list.includes(el) === false) room_list.push(el)
                                    return room_list.map(el => el)
                                })
                            }
                            if (e.target.checked === false) {
                                set_list((room_list) => {
                                    let index = room_list.indexOf(el)
                                    return room_list.splice(index, 1)
                                })
                            }
                        }}/>

                    </div>)}

                </div>

            </div>
            <h3>${room.price}</h3>
        </div>

    </>
}