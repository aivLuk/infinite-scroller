import React from 'react';
import styles from './Image.module.css';

const Image = props => {
    console.log(props.image)
    return <img className={styles.singlePhoto} src={props.image.download_url} alt={props.image.author} />
}

export default Image;