import styles from './Header.module.scss'

import { Link } from "react-router-dom";
import logoImg from '@/assets/logo.jpeg'

const Header = () => {
    return (
        <header className={styles.header}>
            <div className={styles.wrapper}>
                <Link to='/' className={styles.logo}>
                    <div className={styles.logoImg}>
                        <img src={logoImg} alt="Лого"/>
                    </div>

                    <div className={styles.logoText}>
                        ПиццаСофт
                    </div>
                </Link>
            </div>
        </header>
    )
}

export default Header