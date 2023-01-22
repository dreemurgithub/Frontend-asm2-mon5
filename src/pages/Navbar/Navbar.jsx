import styles from './Navbar.module.css'
import {Link} from 'react-router-dom'
import {useContext, useEffect} from "react";
import Login_context from "../../context_data/user";

export default function Header() {
    const [user_login, set_user_login] = useContext(Login_context)
    useEffect(() => {
        set_user_login(localStorage.getItem('username'))
    }, [])
    const data = [
        {
            "type": "Home",
            "icon": "fa-bed",
            "active": true,
            'path': '/'
        },
        {
            "type": "Search",
            "icon": "fa-plane",
            "active": false,
            'path': '/search'
        },
        // {
        //     "type": "Admin",
        //     "icon": "fa-car",
        //     "active": false,
        //     'path': '/admin'
        // },
        // {
        //     "type": "Attractions",
        //     "icon": "fa-bed",
        //     "active": false,
        //     'path': '/'
        // },
        {
            "type": "Transaction",
            "icon": "fa-taxi",
            "active": false,
            'path': '/transaction'
        }
    ]
    const path = window.location.pathname;
    data.forEach((obj) => {
        if (obj.path === path) obj.active = true;
        if (obj.path !== path) obj.active = false;
    })

    return (
        <nav className={styles["header-container"]}>
            <div style={{display: 'flex', alignContent: 'space-between'}}>
                <div className={styles["header-icon"]}>
                    {data.map((el) => {
                        let border_style = el.active === true ? "solid 1px" : "none";
                        return (
                            <>
                                <Link to={el.path} id={`${el.type}_link`}>
                                    <p style={{color: "black"}}>
                                        <i className={[el.icon, "fa"].join(" ")}>{el.type}</i>
                                    </p>
                                </Link>
                            </>
                        );
                    })}
                </div>

                <div>
                    {/*    For user context sign out*/}
                    <span>{user_login}</span>
                    <button type="button" className="btn btn-dark" onClick={() => {
                        fetch('http://localhost:5000/userlogin', {
                            method: 'Get', mode: 'cors', credentials: 'include',
                            headers: {'Content-Type': 'application/json'}
                        }).then(() => {  set_user_login('')
                            localStorage.setItem('username', '')  })
                            localStorage.setItem('user_id','')
                    }}>Signout
                        </button>
                        </div>
                <Link to='/user'>
                    <button type="button" className="btn btn-secondary">Login/Sign Up</button>
                </Link>
                        </div>

                    {/*<div className={styles["header-icon"]}>*/}
                    {/*  {data.map((el) => {*/}
                    {/*    let border_style = el.active === true ? "solid 1px" : "none";*/}
                    {/*    return (*/}
                    {/*      <>*/}
                    {/*        <Link to={el.path}>*/}
                    {/*          <p style={{ color: "white", border: border_style ,borderRadius:'0.5em'}}>*/}
                    {/*            <i className={[el.icon, "fa"].join(" ")}>{el.type}</i>*/}
                    {/*          </p>*/}
                    {/*        </Link>*/}
                    {/*      </>*/}
                    {/*    );*/}
                    {/*  })}*/}
                    {/*</div>*/}
                    {/*<span>[Home,search,details] == [Stays+Attraction+Airport,Flight,Car rentals]</span>*/}
                        </nav>

                        );
                    }