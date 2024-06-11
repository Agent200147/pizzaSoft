import styles from './NotFound.module.scss';

const NotFound = () => {
    return (
        <section className={styles.section}>
            <div className={styles.notFoundWrapper}>
                <div className={styles.notFoundInfo}>
                    <span>404</span>
                    <div className={styles.vertical}></div>
                    <span>Страница не найдена</span>
                </div>
            </div>
        </section>
    )
}

export default NotFound