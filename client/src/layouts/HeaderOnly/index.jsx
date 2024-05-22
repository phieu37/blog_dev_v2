import React from "react";
import Header from "../MainLayout/Header/index.jsx";
import logo from '../../assets/images/logo/logo_blog_h20.png'
import { Link } from "react-router-dom";
import styles from './styles.module.scss'

export default function HeaderOnly({ children }) {
    return <>
        <div className={'fixed top-0 right-0 left-0 h-[74px] z-10'}>
        <div className={styles.wapper}>
            <Link to={'/'}>
                    <img alt={""} src={logo} className={styles.imgLogo} />
            </Link>
            <Header />
        </div>
        </div>
        <div className={'mt-[74px]'}>{children}</div>
    </>
}