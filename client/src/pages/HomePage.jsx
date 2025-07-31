import { useState,useEffect } from "react";
import api from '../services/api.js';
import ContentCard from '../components/ContentCard.jsx';
import styles from './HomePage.module.css';

const HomePage=()=>{
    const [content,setContent]=useState([]);
    const [loading,setLoading]=useState(true);
    useEffect(()=>{
        const API_URL=import.meta.env.VITE_API_URL;
        const fetchContent=async()=>{
            try{
                const {data}=await api.get(`${API_URL}/content`);
                setContent(data);    
            }
            catch(error){
                console.error(`Failed to fetch :${error}`);
            }
            finally{
                setLoading(false);
            }
        };
        fetchContent();
    },[]);

    if(loading)
        return <p>Loading page!!</p>;
    return(
        <div className={styles.homePage}>
            <h1>Latest Content</h1>
            <div className={styles.feed}>
                {content.map((item) => (
                <ContentCard key={item._id} content={item} />
                    ))}
            </div>
        </div>
    );    
};

export default HomePage;