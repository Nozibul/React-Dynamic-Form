import { useState } from "react";
import InputGroup from '../components/shared/forms/InputGroup'
import Button from "../components/ui/buttons/Button";


const init = {
  title:{
    values:"",
    errors:"",
    focus: false,
  },
  bio:{
    values:"",
    errors:"",
    focus: false,
  },
  skill:{
    values:"",
    errors:"",
    focus: false,
  },
}

const App = () => {
  const stateToValues =(state)=>{
     // console.log(Object.keys(state));// ['title', 'bio', 'skill']
    // Object.keys(state).reduce((acc, cur)=>console.log(state[cur], cur));//{values: 'sdfg', errors: '', focus: false} 'bio'
   
   return Object.keys(state).reduce((acc, cur)=>{
      acc[cur] = state[cur].values; // { title: "", bio:"", skill:''}
       return acc ;
    },{})
  }

 
 const [state, setState]= useState({...init})
 const [hasError, setHasError]= useState(false)

 
  const handleChange=(e)=>{
   const {name:key, value} = e.target;
   const oldState = JSON.parse(JSON.stringify(state));
   const values = stateToValues(oldState)
   const {error} = checkValidity(values);
    // console.log(oldState);//{title: {…}, bio: {…}, skill: {…}}
   
   oldState[key].values = value;
   
   if(oldState[key].focus && error[key]){
    oldState[key].errors = error[key];
  }else{
    oldState[key].errors = '' ;
  } 
   setState(oldState) 

  }

  const handleSubmit = (e)=>{
    e.preventDefault();
    const values = stateToValues(state)
    // console.log(values);//{title: 'vv', bio: 'vb', skill: 'rd'}

    const {error, isValid} = checkValidity(values);
    if(isValid){
      console.log(state)
    }else{
     const oldState = JSON.parse(JSON.stringify(state));
     Object.keys(error).forEach((key)=>{
       oldState[key].errors = error[key]
     })

     setState(oldState)
    }
  };


  const handleFocus = (e) =>{
    const oldState = JSON.parse(JSON.stringify(state));
    oldState[e.target.name].focus = true;
    setState(oldState) 
  } 

  const handleBlur = (e) =>{
    const key = e.target.name; // title, bio, skill
    const values = stateToValues(state);// {title: 'vv', bio: 'vb', skill: 'rd'}
    const {error} = checkValidity(values);
    const oldState = JSON.parse(JSON.stringify(state));
    
    if(oldState[key].focus && error[key]){
      oldState[key].errors = error[key];
    }else{
      oldState[key].errors = '' ;
    } 

    setState(oldState)
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
            value={state.title.values}
            label={'Title'}
            name={'title'}
            placeholder={'Software Engineer'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={state.title.errors}
          />
          <InputGroup 
            value={state.bio.values}
            label={'Bio'}
            name={'bio'}
            placeholder={'I am a Software Engineer...'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={state.bio.errors}
          />
          <InputGroup 
            value={state.skill.values}
            label={'Skill'}
            name={'skill'}
            placeholder={'javascript, react'}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            error={state.skill.errors}
          />
          <Button disabled={hasError} type="submit">submit</Button>
       </form>
    </div>
  )
}

export default App  