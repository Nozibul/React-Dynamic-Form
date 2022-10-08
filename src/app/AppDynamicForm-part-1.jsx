import { useState } from "react";
import InputGroup from '../components/shared/forms/InputGroup'
import Button from "../components/ui/buttons/Button";

const init ={
  title:'',
  bio:"",
  skill: '',
}

const App = () => {

  const [values, setValues] = useState({...init});
  const [errors, setErrors ]= useState({...init})
  const [focus, setFocus] = useState({
    title: false,
    bio: false,
    skill: false
  })

 
  const handleChange=(e)=>{
    const key = e.target.name; // title, bio, skill
    setValues((prev)=>({
      ...prev,
      [key]:e.target.value,
      
    }))
    
    const {error} = checkValidity(values)
    if(error[key]){
      setErrors((prev)=>({
        ...prev,
        [key]: ""
      }))
    }
  }

  
  const handleSubmit = (event)=>{
    event.preventDefault();
    const {error, isValid} = checkValidity(values);
    if(isValid){
       console.log(values)
       setErrors({...error})
    }else{
     setErrors({...error})
    }
  }


  const handleFocus = (e) =>{
    setFocus((prev)=>({
      ...prev, 
      [e.target.name]: true
    }))
  } 

  const handleBlur = (e) =>{
    const key = e.target.name; // title, bio, skill
    const {error} = checkValidity(values);
    if(error[key] && focus[key]){
      setErrors((prev)=>({
        ...prev,
        [key]: error[key]
      }))
    }else{
      setErrors((prev)=>({
        ...prev,
        [key]: ""
      }))
    }
  }


  const checkValidity=(value)=>{
      const error = {}
      const {title, bio, skill} = value;
      if(!title){
        error.title = 'Invalid Title'
      }
      if(!bio){
        error.bio = 'Invalid Bio'
      }
      if(!skill){
        error.skill = 'Invalid Skill'
      }
      return {
        error,
        isValid: Object.keys(error).length === 0 
      }
  }


  return (
    <div className='root'>Folder Structure for React <br /> <br />
       <form onSubmit={handleSubmit}>
          <InputGroup 
            value={values.title}
            label={'Title'}
            name={'title'}
            placeholder={'Software Engineer'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={errors.title}
          />
          <InputGroup 
            value={values.bio}
            label={'Bio'}
            name={'bio'}
            placeholder={'I am a Software Engineer...'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={errors.bio}
          />
          <InputGroup 
            value={values.skill}
            label={'Skill'}
            name={'skill'}
            placeholder={'javascript, react'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={errors.skill}
          />
          <Button type="submit">submit</Button>
       </form>
    </div>
  )
}

export default App  