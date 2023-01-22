import styles from './Header.module.css'
export default function Header(){
    return <div className={styles['header-title']}>
        <h1 style={{color:'white'}}>A life time of discounts? It's Genius</h1>
        <p style={{color:'white'}}>Get reward four your travels - unlock instant saving of 
            10% or more with a free acount
        </p>
        <button style={{fontSize:'1.2em'}}>Sign in/Register</button>
    </div>
}