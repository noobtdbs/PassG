import { useState, useCallback, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {


  const [length, setLength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  const  passwordRef = useRef(null)

  const passwordGenerator = useCallback(()=>{
    let pass=''
    let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

    if(numberAllowed) str+='0123456789'
    if(charAllowed) str+='!@#$%^&*()_+{}|~`:"<,>.?/[]'

    for (let i = 1; i < length; i++) {
      let index = Math.floor(Math.random()*str.length +1)
      pass+=str.charAt(index)
      
    }

    setPassword(pass)

  },[length, numberAllowed, charAllowed, setPassword]) 

  const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,100)
    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{passwordGenerator()}, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
    
    <div
    className='w-full max-w-md mx-auto shadow-md rounded-xl px-4 py-3 my-8 text-orange-500 bg-gradient-to-r from-orange-500 to--500 mt-52'>
      
      <h1 className='text-4xl font-bold text-white text-center my-3 mb-10'>Password Generator</h1>
      <div
        className='flex shadow rounded-xl overflow-hidden mb-5'>
        <input 
        type="text" 
        value={password}
        className='outline-none w-full py-1 px-3 rounded-xl'
        placeholder='password'
        readOnly
        ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipBoard}
        className='outline-none bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white px-3 py-0.5  hover:bg-blue-600 active:bg-black-700 focus:outline-none focus:ring focus:ring-black-300 ml-1 mr-1 rounded-xl'>Copy</button>

      </div>
      <div
        className='flex text-sm gap-x-2'>
        <div
        className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>setLength(e.target.value)}
          />
          <label >Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox" 
            defaultChecked={numberAllowed}
            id='numberInput'
            onChange={()=>{
              setnumberAllowed((prev)=>!prev)
            }}
            className='cursor-pointer '
          
          />
          <label htmlFor="numberInput" >Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input 
            type="checkbox" 
            defaultChecked={charAllowed}
            id='characterInput'
            onChange={()=>{
              setCharAllowed((prev)=>!prev)
            }}
            className='cursor-pointer '
          
          />
          <label htmlFor="characterInput" >Characters</label>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
