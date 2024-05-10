import React from "react";
import Header from "../MainLayout/Header/index.jsx";
import logo from '../../assets/images/logos/zent_logo_dark.png'
import {Link} from "react-router-dom";
import styles from './styles.module.scss'

export default function HeaderOnly({children}) {
    return <>
        <div className={'fixed top-0 right-0 left-0 h-[74px] z-10'}>
            <Link to={'/'}>
                <img alt={""} src={logo} className={styles.imgLogo}/>
            </Link>
            <Header/>
        </div>
        <div className={'mt-[74px]'}>{children}</div>
    </>
}