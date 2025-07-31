import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from '../services/api.js'
import styles from './CreateContentPage.module.css'

const CreateContentPage=()=>{
    const [formData,setFormData]=useState({title:'',description:'',url:''});
    const [file,setFile]=useState(null);
    const [uploading,setUploading]=useState(false);
    const navigate=useNavigate();

    const handleFileChange=(e)=>{
      setFile(e.target.files[0]);
    };
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      setUploading(true);

      let fileUrl = '';
      if (file) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', file);
        try {
          const { data } = await api.post('/uploads', uploadFormData); 
          fileUrl = data.url;
        } catch (error) {
          console.log(`File upload failed: ${error}`);
          alert('File upload unsuccessful');
          setUploading(false);
          return;
        }
      }

      try {
        const contentData = {
          title: formData.title,
          description: formData.description,
          url: fileUrl || formData.url,
        };
        const { data: newContent } = await api.post('/content', contentData);
        navigate(`/content/${newContent._id}`);
      } catch (error) {
        console.log(`Failed to create content: ${error}`);
        alert('Unable to upload content! Please retry');
      } finally {
        setUploading(false);
      }
    };

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
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          style={{display: 'block', marginTop:'0.5rem'}}
        />
        <button type="submit" disabled={uploading}>Create</button>
          {uploading?'Uploading....':'Create'};
      </form>
    </div>
  );
};

export default CreateContentPage;