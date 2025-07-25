const Input=({label,type='text',name,value,onChange})=>{
    return (<div style={{marginBottom:'1rem'}}> 
    <label htmlFor="name" style={{display:'block',marginBottom:'0.5rem'}}>
        {label};
    </label>
    <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}>
    </input>    
    </div>
    );
};

export default Input;