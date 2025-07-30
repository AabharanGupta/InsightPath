import { useState } from "react"; 
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Input from "../components/Inputs.jsx";
import styles from '../components/Form.module.css';

const RegisterPage=()=>{
    const [formData,setFormData]=useState({
        name:'',
        email:'',
        password:'',
    });
    const [error,setError]=useState('');
    const navigate=useNavigate();
    const handleChange=(e)=>{
       setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setError('');
        try{
            const response=await axios.post('/api/auth/register',formData);
            console.log('Registration Info:',response.data);
            navigate('/login');
        }
        catch(error){
            setError(err.response?.data?.message||'Registration failed. Please try again')
        }
    };
    return(
        <div className={styles.formContainer}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                <Input
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                <Input
                    label="Password"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {error &&<p style={{color:'red'}}>{error}</p>}
                <button type="submit" className={styles.formButton}>
                    Register
                </button>
            </form>
        </div>
    )
};

export default RegisterPage;