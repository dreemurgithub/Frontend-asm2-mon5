import {useState, useContext} from "react";
import Login_context from "../../context_data/user";

function User() {
    const set_user_login = useContext(Login_context)
    const [login, set_login] = useState(true)
    if (login) return <>
        <h3>Login</h3>
        <label htmlFor="">Email</label><br/><input type="email"/><br/>
        <label htmlFor="">Password</label><br/><input type="password"/><br/>
        <button type="button" className="btn btn-primary" onClick={() => {
            fetch('http://localhost:5000/userlogin', {
                method: 'POST', mode: 'cors',credentials:'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify( {
                    email: document.querySelectorAll('input')[0].value,
                    password: document.querySelectorAll('input')[1].value
                })
            }).then(res => res.json()).then(data => {
                if (data === null || data === undefined || data==='') return
                localStorage.setItem('username', data.email)
                set_user_login(localStorage.getItem('username'))
                localStorage.setItem('user_id',data._id)
            })
        }}>Login
        </button>
        <button type="button" className="btn btn-secondary" onClick={() => set_login(false)}>Signup Here</button>
        <>
            <></>
        </>

    </>
    if (!login) return <>
        <h3>Sign up</h3>
        <label htmlFor="">Email</label><br/><input type="email"/><br/>
        <label htmlFor="">Password</label><br/><input type="password"/><br/>
        <label htmlFor="">Full name</label><br/><input type="text"/><br/>
        <label htmlFor="">Phone Number</label><br/><input type="text"/><br/>
        <button type="button" className="btn btn-primary" onClick={() => {
            fetch('http://localhost:5000/user', {
                method: 'POST', mode: 'cors',
                headers: {'Content-Type': 'application/json'},
                body:JSON.stringify( {
                    email: document.querySelectorAll('input')[0].value,
                    password: document.querySelectorAll('input')[1].value,
                    fullname: document.querySelectorAll('input')[2].value,
                    phone: document.querySelectorAll('input')[3].value
                })
            }).then(res=>res.json()).then(data=>alert(data.message))
        } }>
            Sign
            Up < /button>
            <button type="button" className="btn btn-secondary" onClick={() => set_login(true)}>Login Here</button>

        </>

        }

            export  default User