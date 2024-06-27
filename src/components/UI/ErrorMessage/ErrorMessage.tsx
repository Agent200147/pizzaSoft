import styles from './ErrorMessage.module.scss';

import type { FC } from "react";

type ErrorMessageProps = {
    errorMessage: string | undefined
}


const ErrorMessage: FC<ErrorMessageProps> = ({ errorMessage }) => {
    return errorMessage && <div data-testid='form-error' className={styles.errorText}>{errorMessage}</div>
}

export default ErrorMessage