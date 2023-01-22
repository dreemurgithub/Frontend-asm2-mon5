import {Link} from "react-router-dom";
import styles from './Footer.module.css'
export  default function Footer(){
    const data=[
        {
            "col_number": 1,
            "col_values": [
                "Countries",
                "Regions",
                "Cities",
                "Districts",
                "Airports",
                "Hotels"

            ]
        },
        {
            "col_number": 2,
            "col_values": [
                "Homes",
                "Apartments",
                "Resorts",
                "Villas",
                "Hostels",
                "Guest houses"
           
            ]
        },
        {
            "col_number": 3,
            "col_values": [
                "Unique places to stay",
                "Reviews",
                "Unpacked: Travel articles",
                "Travel communities",
                "Seasonal and holiday deals"
                
                
            ]
        },
        {
            "col_number": 4,
            "col_values": [
                "Car rental",
                "Flight Finder",
                "Restaurant reservations",
                "Travel Agents"
            ]
        },
        {
            "col_number": 5,
            "col_values": [
                "Curtomer Service",
                "Partner Help",
                "Careers",
                "Sustainability",
                "Press center",
                "Safety Resource Center",
                "Investor relations",
                "Terms & conditions"
            ]
        }
    ]

    return (<>
        <div className={styles['sign-up']}>
            <h3>Save time, save money</h3>
            <p>Sign up and we'll send the best deals to your</p>
            <div ><input type="text" size='35' /><button className={styles['sign-up-btn']}>Subscribe</button></div>
            
        </div>
        <div className={styles['footer']}>
        {data.map((obj)=>{
            return <div className={styles['footer-column']}>
                {obj.col_values.map((el)=>{
                    return <p ><Link to='/detail' className={styles['footer-link']}>{el}</Link></p>
                })}
            </div>
        })}   
        </div>
    </>)
}

