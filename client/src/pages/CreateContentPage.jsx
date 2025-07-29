import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api.js'
import styles from './CreateContentPage.module.css'

const CreateContentPage=()=>{
    const [formData,setFormData]=useState({title:'',description:'',url:''});
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        try{
            const {data:newContent}= await api.post('/api/content',formData);
            navigate(`/content/${newContent._id}`);
        }
        catch(error){
            console.log(`Failed to create content:${error}`);
            alert('Unable to upload content! Please retry ');   
        }
    }
    return (
    <div className={styles.page}>
      <h1>Create New Content</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Content Title"
          required
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Content Description"
          rows="10"
          required
        ></textarea>
        <input
          type="url"
          name="url"
          value={formData.url}
          onChange={handleChange}
          placeholder="Link to resource (e.g., https://...)"
        />
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreateContentPage;