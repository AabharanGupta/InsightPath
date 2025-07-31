import {Link} from 'react-router-dom'
import styles from './ContentCard.module.css'

const ContentCard=({content})=>{
    const API_URL =import.meta.env.VITE_API_URL;
    return(
        <Link to={`${API_URL}/content/${content._id}`} className={styles.card}>
        console.log(`${process.env.REACT_APP_API_URL}/api/content`);

        <h3>{content.title}</h3>
        <p>{content.description.substring(0,100)}</p>
        <p className={styles.author}>By: {content.author?.name || 'Anonymous'}</p>
        </Link>
    )
};

export default ContentCard;