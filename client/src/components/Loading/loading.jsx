import React from "react";
import styles from './loading.module.css'

export default function Loading(){
    return(
        <div className={styles.loadingCont}>
            <h1 className={styles.loading}>Loading...</h1>
        </div>
    )
}