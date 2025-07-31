import  {createContext, useState, useEffect} from 'react';
import axios from 'axios';

export const AuthContext=createContext();

export const AuthProvider=({children})=>{
    const [userInfo,setUserInfo]=useState(null);

    useEffect(()=>{
        const storedUserInfo=localStorage.getItem('UserInfo');
        if(storedUserInfo){
            setUserInfo(JSON.parse(storedUserInfo));
        }
    },[]);

    const login=async(email,password)=>{
        const {data}=await api.post('/api/auth/login',{email,password});
        localStorage.setItem('userInfo',JSON.stringify(data));
        setUserInfo(data);
    }

    const logout=()=>{
        localStorage.removeItem('userInfo');
        setUserInfo(null);
    }
    return(
        <AuthContext.Provider value={{userInfo,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}