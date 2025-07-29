import { useState, useEffect } from "react";
import api from '../services/api.js';
import styles from './DashboardPage.module.css';

const DashboardPage=()=>{
    const [data,setData]=useState({saved:[],liked:[],commented:[]});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const [savedRes, likedRes, commentedRes]= await Promise.all([
                    api.get('/api/users/profile/saved'),
                    api.get('/api/users/profile/liked'),
                    api.get('/api/users/profile/commented'),
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
        <div className="styles.dashboard">
            <h1> Your dashboard </h1>
            <div className="styles.grid">
                <div className="styles.list">
                    <h2>Saved Content</h2>
                    {data.saved.length>0?(
                        data.saved.map((item)=><div key={item._id} className={styles.contentItem}>{item.title}</div>)
                    ):(
                        <p> No saved video</p>
                    )}
                </div>
                <div className="styles.list">
                    <h2>Liked Content</h2>
                    {data.liked.length>0?(
                        data.liked.map((item)=><div key={item._id} className={styles.contentItem}>{item.title}</div>)
                    ):(
                        <p>No liked videos</p>
                    )}
                </div>
                <div className="styles.list">
                    <h2>Commented Content</h2>
                    {data.commented.length>0?(
                        data.commented.map((item)=><div key={item._id} className={styles.contentItem}>{item.title}</div>)
                    ):(
                        <p>No commented videos</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;