import React from 'react';
import { Link } from 'react-router-dom';
import styles from './navbar.module.css';


export default function NavBar() {
    return (
        <div className={styles.navbar}>
            <nav>
                <ul>
                    <li className={styles.list}>
                        <Link className={styles.home} to="/home" >Home</Link>
                        <Link className={styles.create} to="/create" >Create recipe</Link>
                    </li>
                </ul>
                <div>
                </div>
            </nav>
        </div>
    )
}