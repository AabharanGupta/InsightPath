import {useState, useEffect,useContext} from'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api.js'
import {AuthContext} from '../../context/AuthContext.jsx'
import styles from './ContentDetailPage.module.css'

const ContentDetailPage=()=>{
    const {id}=useParams();
    const {userInfo}=useContext(AuthContext);
    const [data,setdata]=useState({content:null,comments:[]});
    const [newComment,setnewComment]=useState('');
    const [loading,setloading]=useState(true);

    useEffect(()=>{
        const fetchData=async()=>{
            try{
                const {data:responseData}=await axios.get(`/api/content/${id}`);
                setdata(responseData);
            }
            catch(error){
                console.log(`Failed to fetch:${error}`);
            }
            finally{
                setloading(false);
            }
        }
        fetchData();
    },[id]);
    const handleOnSubmit=async (e)=>{
        e.preventDefault();
        try{
            const {data:addedComment}=await axios.post(`/api/content/${id}/comments`, { text: newComment });
            addedComment.author={name:userInfo.name};
            setData({ ...data, comments: [...data.comments, addedComment] });
            setNewComment('');
        }
        catch(error){
            console.log(`On Submit error:${error}`);
        }
    };
    if(loading)
        return <p>Loading Content!!!</p>;
    if(!data.content)
        return <p>Content Not Found!!</p>;
     return (
    <div className={styles.page}>
        <div className={styles.contentHeader}>
            <h1>{data.content.title}</h1>
            <p className={styles.author}>By: {data.content.author?.name || 'Unknown'}</p>
      </div>
      <div className={styles.contentBody}>
        <p>{data.content.description}</p>
      </div>
      <div className={styles.commentsSection}>
        <h3>Comments</h3>
        {data.comments.map((comment) => (
          <div key={comment._id} className={styles.comment}>
            <p className={styles.commentAuthor}>{comment.author?.name || 'User'}</p>
            <p>{comment.text}</p>
          </div>
        ))}
        {userInfo && (
          <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              required
            ></textarea>
            <button type="submit">Post Comment</button>
          </form>
        )}
        </div>
    </div>
    )
};

export default ContentDetailPage;