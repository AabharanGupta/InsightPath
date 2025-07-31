import { useState, useEffect } from "react";
import api from '../services/api.js';
import styles from './DashboardPage.module.css';
import ContentCard from '../components/ContentCard.jsx'
const DashboardPage=()=>{
    const [data,setData]=useState({saved:[],liked:[],commented:[]});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const [savedRes, likedRes, commentedRes]= await Promise.all([
                    api.get(`/users/profile/saved`),
                    api.get(`/users/profile/liked`),
                    api.get(`/users/profile/commented`),
                ]);
                setData({
                    saved: savedRes.data,
                    liked: likedRes.data,
                    commented:commentedRes.data,
                });
            }
            catch(error){
                `Error in fecthing data: ${error}`;
            }
            finally{
                setLoading(false);
            }
        };
        fetchData();
    },[]);

    if(loading)
        return <p>The page is currently being loaded.....</p>
    if(error)
        return <p style={{color:'red'}}>Error in loading</p>

     return (
    <div className={styles.dashboard}>
      <div className={styles.header}>
        <h1>Your Dashboard</h1>
        <p>An overview of your activity and saved content.</p>
      </div>

      <div className={styles.section}>
        <h2>Saved Content</h2>
        {data.saved.length > 0 ? (
          <div className={styles.grid}>
            {data.saved.map((item) => <ContentCard key={item._id} content={item} />)}
          </div>
        ) : (
          <p className={styles.emptyState}>You haven't saved any content yet. Browse the feed to find something interesting!</p>
        )}
      </div>

      <div className={styles.section}>
        <h2>Liked Content</h2>
        {data.liked.length > 0 ? (
          <div className={styles.grid}>
            {data.liked.map((item) => <ContentCard key={item._id} content={item} />)}
          </div>
        ) : (
          <p className={styles.emptyState}>You haven't liked any content yet.</p>
        )}
      </div>
      
      <div className={styles.section}>
        <h2>Commented On</h2>
        {data.commented.length > 0 ? (
          <div className={styles.grid}>
            {data.commented.map((item) => <ContentCard key={item._id} content={item} />)}
          </div>
        ) : (
          <p className={styles.emptyState}>You haven't commented on any content.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;