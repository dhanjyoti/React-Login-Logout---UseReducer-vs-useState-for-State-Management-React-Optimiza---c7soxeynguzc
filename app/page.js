// import React from 'react'

// const reducer = (state, action) => {

// }

// function Home() {
//   return (
//     <div id="main">
//       <section className='logout-section'>
//         <h2>Logged in successfully!</h2>
//         <p>Welcome username!</p>
//         <button className='logout-btn'>Logout</button>
//       </section>
//       <form className='login-form'>
//         {/* <p className='invalid-error'>Invalid username or password!</p> */}
//         <section className='username-input'>
//           <label>Username: </label>
//           <input type="text" placeholder='Username' className='username' />
//         </section>
//         <section className='password-input'>
//           <label>Password: </label>
//           <input type="password" placeholder='Password' className='password' />
//         </section>
//         <button className='login-btn'>Login</button>
//       </form>
//     </div>
//   )
// }

// export default Home

"use client"
import React, { useReducer } from 'react';

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USERNAME':
      return { ...state, username: action.payload };
    case 'UPDATE_PASSWORD':
      return { ...state, password: action.payload };
    case 'LOGIN':
      return { ...state, isLoggedIn: true, showError:false };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, showError:false };
    case 'SHOW_ERROR':
      return { ...state, isLoggedIn: false, showError:true };
    default:
      return state;
  }
};

function Home() {
  const [state, dispatch] = useReducer(reducer, {
    username: '',
    password: '',
    isLoggedIn: false,
    showError: false,
  });

  const handleUsernameChange = (e) => {
    dispatch({ type: 'UPDATE_USERNAME', payload: e.target.value });
  };

  const handlePasswordChange = (e) => {
    dispatch({ type: 'UPDATE_PASSWORD', payload: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (state.username && state.password) {
      dispatch({ type: 'LOGIN' });
    } else {
      dispatch({ type: 'SHOW_ERROR' });
    }
  };

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <div id="main">
      {state.isLoggedIn ? (
        <section className='logout-section'>
          <h2>Logged in successfully!</h2>
          <p>Welcome {state.username}!</p>
          <button className='logout-btn' onClick={handleLogout}>
            Logout
          </button>
        </section>
      ) : (
        <form className='login-form' onSubmit={handleLogin}>
          {state.showError && (
            <p className='invalid-error'>Invalid username or password!</p>
          )}
          <section className='username-input'>
            <label>Username: </label>
            <input
              type="text"
              placeholder='Username'
              className='username'
              value={state.username}
              onChange={handleUsernameChange}
            />
          </section>
          <section className='password-input'>
            <label>Password: </label>
            <input
              type="password"
              placeholder='Password'
              className='password'
              value={state.password}
              onChange={handlePasswordChange}
            />
          </section>
          <button type="submit" className='login-btn'>
            Login
          </button>
        </form>
      )}
    </div>
  );
}

export default Home;
