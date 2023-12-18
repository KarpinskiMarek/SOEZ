import React from 'react';
import styles from './LinkButton.module.css';

const LinkButton = ({ to, buttonText}) => {
    return (
        <a href={to} className={styles.button}>
            {buttonText}
        </a>
    )
}

export default LinkButton;