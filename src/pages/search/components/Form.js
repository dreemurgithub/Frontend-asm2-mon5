import styles from "./Search_list.module.css";

export default function Form() {

    const date1 = new Date();
    const date2 = new Date();
    date2.setDate(date2.getDate() + 2)
    return <form action="">
        <h3>Search</h3>
        <label>Destination</label><br/>
        <select name="" id="">
            <option value="Ha noi">Ha Noi</option>
            <option value="Da Nang">Da Nang</option>
            <option value="Ho Chi Minh">Ho Chi Minh</option>
        </select>
        <br/>
        <label>Check in date</label><br/>
        <input type="text" size='35' value={date1.toLocaleDateString()}/><br/>
        <label>Check out date</label><br/>
        <input type="text" size='35' value={date2.toLocaleDateString()}/><br/>
        <p>Options</p>
        <div className={styles['form-below']}>
            <label htmlFor="">Min price per night</label>
            <input type="text" size='10'/>
        </div>
        <div className={styles['form-below']}>
            <label htmlFor="">Max price per night</label>
            <input type="text" size='10'/>
        </div>
        <div className={styles['form-below']}>
            <label htmlFor="">Adult</label>
            <input type="text" size='10'/>
        </div>
        <div className={styles['form-below']}>
            <label htmlFor="">Children</label>
            <input type="text" size='10'/>
        </div>
        <div className={styles['form-below']}>
            <label htmlFor="">Room</label>
            <input type="text" size='10'/>
        </div>
        <input type="button" value={'Search'} className={styles['form-button']}/>
    </form>
}