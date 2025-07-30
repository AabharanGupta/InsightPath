import { useState, useEffect,useContext } from "react";
import io from 'socket.io-client';
import {AuthContext} from '../../context/AuthContext.jsx';
import styles from './QnAPage.module.css';

const socket = io('http://localhost:5001');

const QnAPage=()=>{
    const {userInfo}=useContext(AuthContext);
    const [questions,setQuestions]=useState([]);
    const [newQuestion,setNewQuestion]=useState('');

    useEffect(()=>{
        socket.on('load_questions',(loadedQuestions)=>{
            setQuestions(loadedQuestions);
        });
        socket.on('question_created',(createdQuestions)=>{
            setQuestions((prevQuestions)=>[createdQuestions, ...prevQuestions]);
        });
        return()=>{
            socket.off('load_questions');
            socket.off('question_created');
        };
    },[]);
    const handleSubmit = (e) => {
    e.preventDefault();
    if (!newQuestion.trim() || !userInfo) return;

    // Send the new question to the server
    socket.emit('new_question', {
      text: newQuestion,
      authorId: userInfo._id,
    });

    setNewQuestion('');
  };
  return (
    <div className={styles.page}>
      <h1>Q&A Forum</h1>
      {userInfo ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="Ask a question..."
            style={{ width: '80%', padding: '0.5rem' }}
          />
          <button type="submit" style={{ padding: '0.5rem' }}>Submit</button>
        </form>
      ) : (
        <p>Please log in to ask a question.</p>
      )}

      <div className={styles.questionList}>
        {questions.map((q) => (
          <div key={q._id} className={styles.question}>
            <p className={styles.questionAuthor}>{q.author?.name || 'User'}</p>
            <p className={styles.questionText}>{q.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QnAPage;