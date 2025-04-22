import { useState,useCallback,useEffect, useRef} from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed,setNumberAllowed]=useState(false)
  const [charAllowed,setCharAllowed]=useState(false)
  const [password,setPassword]=useState('')

  const passwordRef=useRef(null)

  const generatePassword=useCallback(()=>{
    let pass=""
    let str=
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"


    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*()_+"

    for (let i = 0; i < length; i++) {
      const char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    
    
    setPassword(pass)
  },[ length,numberAllowed,charAllowed])

    const copyPasswordToClipboard=()=>{
     window.navigator.clipboard.writeText(password) 
     passwordRef.current?.select()
     //passwordRef.current?.setSelectRange(0,99999)
    }

  useEffect(()=>{
    generatePassword()
  },[length,numberAllowed,charAllowed])



  return (
    <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 bg-gray-800 text-orange'>
      <h1 className='text-white text-center my-3 text-2xl'>Password Generator</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-6'>
        <input 
        type="text" 
        value={password}
        className='outline-none py-1 px-3 w-full'
        placeholder='Password'
        readOnly
        ref={passwordRef}
         />
         <button 
         onClick={copyPasswordToClipboard}
         className='outline-none text-white bg-pink-500 px-4 py-2 font-semibold'>Copy</button>
      </div>
      <div
      className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setLength(e.target.value)} 
          name=""
          id=""
          />
          <label className='text-white' htmlFor="Length">Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          onChange={()=>{
            setNumberAllowed((prev)=>!prev)
          }}
          name="Number"
           id="" 
           />
           <label className='text-white' htmlFor="Number">Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input type="checkbox" 
          defaultChecked={charAllowed}
          onChange={()=>{
            setCharAllowed((prev)=>!prev)
          }}
          name=""
           id="" 
           />
           <label className='text-white' htmlFor="Symbols">Symbols</label>
        </div>
      </div>
    </div>
  )
}

export default App
