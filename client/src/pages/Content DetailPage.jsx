import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import api from '../services/api.js';
import { AuthContext } from '../../context/AuthContext.jsx';
import styles from './ContentDetailPage.module.css';

const ContentDetailPage = () => {
  const { id } = useParams();
  const { userInfo } = useContext(AuthContext);

  const [data, setData] = useState({ content: null, comments: [] });
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);

  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const API_URL =import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: responseData } = await api.get(`${API_URL}/api/content/${id}`);
        setData(responseData);

        // Like state
        if (userInfo && responseData.content.likes.includes(userInfo._id)) {
          setIsLiked(true);
        }
        setLikeCount(responseData.content.likes.length);
      } catch (error) {
        console.error('Failed to fetch content details', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, userInfo]);

  const handleLike = async () => {
    try {
      const { data: updatedContent } = await api.post(`${API_URL}/content/${id}/like`);
      setIsLiked(updatedContent.likes.includes(userInfo._id));
      setLikeCount(updatedContent.likes.length);
    } catch (error) {
      console.error('Failed to like content', error);
    }
  };

  const handleSave = async () => {
    try {
      await api.post(`${API_URL}/content/${id}/save`);
      alert('Content save status updated!');
    } catch (error) {
      console.error('Failed to save content', error);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    try {
      const { data: addedComment } = await api.post(`${API_URL}/content/${id}/comments`, { text: newComment });
      addedComment.author = { name: userInfo.name };
      setData({ ...data, comments: [...data.comments, addedComment] });
      setNewComment('');
    } catch (error) {
      console.error('Failed to post comment', error);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!data.content) return <p>Content not found.</p>;

  return (
    <div className={styles.page}>
      <div className={styles.contentHeader}>
        <h1>{data.content.title}</h1>
        <p className={styles.author}>By: {data.content.author?.name || 'Unknown'}</p>

        {/* --- Like & Save Buttons --- */}
        {userInfo ? (
          <div className={styles.actions}>
            <button onClick={handleLike} className={styles.likeButton}>
              {isLiked ? '❤️ Liked' : '🤍 Like'} ({likeCount})
            </button>
            <button onClick={handleSave} className={styles.saveButton}>
              💾 Save
            </button>
          </div>
        ) : (
          <div className={styles.loginPrompt}>
            <p><Link to="/login">Log in</Link> to like or save this content.</p>
          </div>
        )}
      </div>

      <div className={styles.contentBody}>
        <p>{data.content.description}</p>
        {data.content.url && (
          <a href={data.content.url} target="_blank" rel="noopener noreferrer">View Resource</a>
        )}
      </div>

      {/* --- Comments Form --- */}
      {userInfo ? (
        <form onSubmit={handleCommentSubmit} className={styles.commentForm}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            required
          ></textarea>
          <button
            type="submit"
            disabled={!newComment.trim()}
            className={styles.commentSubmitButton}
          >
            Post Comment
          </button>
        </form>
      ) : (
        <div className={styles.loginPrompt}>
          <p>Please <Link to="/login">log in</Link> to join the discussion.</p>
        </div>
      )}

      {/* You can optionally render comments below */}
    </div>
  );
};

export default ContentDetailPage;
