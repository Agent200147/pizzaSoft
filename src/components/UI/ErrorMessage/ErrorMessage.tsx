import styles from './ErrorMessage.module.scss';

import type { FC } from "react";

type ErrorMessageProps = {
    errorMessage: string | undefined
}


const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage }) => {
    return errorMessage && <div className={styles.errorText}>{errorMessage}</div>
}

export default ErrorMessage