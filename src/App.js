import React, { useEffect, useState } from 'react';

const App = () => {
  const [users, setUser] = useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/user')
    .then(res => res.json())
    .then(data => setUser(data))
  },[])

  const handleOnsubmit = event => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const total = {name,email}

    fetch('http://localhost:5000/user',{
      method:'POST',
      headers:{
        'content-type': 'application/json'
      },
      body:JSON.stringify(total)
    })
    .then(res => res.json())
    .then(data => {
      const newUser = [...users, data]
      setUser(newUser)
    })

  }
  return (
    <div>
      <h1 className='text-3xl text-center font-mono font-bold mt-4'>Now I'm practice node js</h1>

      <div className='flex justify-center my-4'>
        <form onSubmit={handleOnsubmit} className='space-x-4 border border-pink-500 rounded shadow-md p-4'>
          <input className='w-72 h-10 border border-green-300 rounded px-4' type="text" placeholder='Enter your name' name='name' />

          <input className='w-72 h-10 border border-blue-300 rounded px-4' type="text" placeholder='Enter your name' name='email' />

          <input className='border cursor-pointer border-orange-300 rounded py-2 px-4 bg-gray-100 hover:bg-orange-200' type="submit" value="Post" />
        </form>
      </div>

      <div>
        <h1 className='text-center font-bold my-4 text-pink-400 text-2xl underline'>Found total user: {users.length}</h1>
      </div>

      <div className='grid grid-cols-5 gap-2 mx-6 border-pink-400 rounded shadow p-3 border-2'>
        {
          users.map(user => <div
          className='border-amber-400 border p-2 rounded shadow' 
          key={user.id}>

          Name: {user.name} <br />
          email: {user.email}
          </div> )
        }
      </div>
    </div>
  );
};

export default App;