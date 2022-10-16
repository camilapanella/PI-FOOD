import React from 'react';
import {Link} from 'react-router-dom' 
import styles from './landingPage.module.css'


export default function Landing() {
  return (
    <div className={styles.landing}>
    <br></br>
    <br></br>
      <h1 className={styles.h1}>Welcome to your 
      <br/>
      favorite recipe App!</h1>
      <Link to='/home'>
      <br></br>
      <br></br>
        <button className={styles.landingbutton} type="button">¡Enter!</button>  
      </Link>
    </div>
  )
};