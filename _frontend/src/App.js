import React, { useReducer, useEffect, useState } from 'react';
import './App.css'
import Header from './Header'
import Buttons from './Buttons'
import Form from './Form'

import { Hub, Auth } from 'aws-amplify'
import { FaSignOutAlt } from 'react-icons/fa'

const initialUserState = { user: null, loading: true }

function App() {
  const [userState, dispatch] = useReducer(reducer, initialUserState)
  const [formState, updateFormState] = useState('base')

  useEffect(() => {
    // set listener for auth events
    Hub.listen('auth', (data) => {
      const { payload } = data
      if (payload.event === 'signIn') {
        setImmediate(() => dispatch({ type: 'setUser', user: payload.data }))
        setImmediate(() => window.history.pushState({}, null, 'https://www.amplifyauth.dev/'))
        updateFormState('base')
      }
      // this listener is needed for form sign ups since the OAuth will redirect & reload
      if (payload.event === 'signOut') {
        setTimeout(() => dispatch({ type: 'setUser', user: null }), 350)
      }
    })
    // we check for the current user unless there is a redirect to ?signedIn=true 
    if (!window.location.search.includes('?signedin=true')) {
      checkUser(dispatch)
    }
  }, [])

  // This renders the custom form
  if (formState === 'email') {
    return (
      <div style={styles.appContainer}>
        <Header updateFormState={updateFormState} />
        <Form />
      </div>
      )
  }

  return (
    <div style={styles.appContainer}>
      <Header updateFormState={updateFormState} />
      {
        userState.loading && (
          <div style={styles.body}>
            <p>Loading...</p>
          </div>
        )
      }
      {
        !userState.user && !userState.loading && (
          <Buttons
            updateFormState={updateFormState}
          />
        )
      }
      {
        userState.user && userState.user.signInUserSession && (
          <div style={styles.body}>
            <h4>
              Welcome {userState.user.signInUserSession.idToken.payload.email}
            </h4>
            <button
              style={{ ...styles.button, ...styles.signOut }}
              onClick={signOut}
            >
              <FaSignOutAlt color='white' />
              <p style={{...styles.text}}>Sign Out</p>
            </button>
          </div>
        )
      }
      <Footer />
    </div>
  )
}

function reducer (state, action) {
  switch(action.type) {
    case 'setUser':  
      return { ...state, user: action.user, loading: false }
    case 'loaded':
      return { ...state, loading: false }
    default:
      return state
  }
}

async function checkUser(dispatch) {
  try {
    const user = await Auth.currentAuthenticatedUser()
    console.log('user: ', user)
    dispatch({ type: 'setUser', user })
  } catch (err) {
    console.log('err: ', err)
    dispatch({ type: 'loaded' })
  }
}

function signOut() {
  Auth.signOut()
    .then(data => {
      console.log('signed out: ', data)
    })
    .catch(err => console.log(err));
}

function Footer () {
  return (
    <div>
      <p style={styles.footer}>To view the code for this app, click <a
        href='https://github.com/dabit3/amplify-auth-demo' target="_blank" rel="noopener noreferrer"
      style={styles.anchor}>here</a>. To learn more about AWS Amplify, click <a
        href='https://aws-amplify.github.io/' target="_blank" rel="noopener noreferrer"
      style={styles.anchor}>here.</a></p>
    </div>
  )
}

const styles = {
  appContainer: {
    paddingTop: 85,
  },
  loading: {
    
  },
  button: {
    marginTop: 15,
    width: '100%', 
    maxWidth: 250,
    marginBottom: 10,
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '0px 16px',
    borderRadius: 2,
    boxShadow: '0px 1px 3px rgba(0, 0, 0, .3)',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    minHeight: 40
  },
  text: {
    color: 'white',
    fontSize: 14,
    marginLeft: 10,
    fontWeight: 'bold'
  },
  signOut: {
    backgroundColor: 'black'
  },
  footer: {
    fontWeight: '600',
    padding: '0px 25px',
    textAlign: 'right',
    color: 'rgba(0, 0, 0, 0.6)'
  },
  anchor: {
    color: 'rgb(255, 153, 0)',
    textDecoration: 'none'
  },
  body: {
    padding: '0px 30px',
    height: '78vh'
  }
}

export default App
// // src/App.js

// // import useEffect hook
// import React, { useEffect } from 'react';
// import logo from './logo.svg';
// import './App.css';

// // import Hub
// import { Auth, Hub } from 'aws-amplify'

// function checkUser() {
//   Auth.currentAuthenticatedUser()
//     .then(user => console.log({ user }))
//     .catch(err => console.log(err));
// }

// function signOut() {
//   Auth.signOut()
//     .then(data => console.log(data))
//     .catch(err => console.log(err));
// }

// function App(props) {
//   // in useEffect, we create the listener
//   useEffect(() => {
//     Hub.listen('auth', (data) => {
//       const { payload } = data
//       console.log('A new auth event has happened: ', data)
//        if (payload.event === 'signIn') {
//          console.log('a user has signed in!')
//        }
//        if (payload.event === 'signOut') {
//          console.log('a user has signed out!')
//        }
//     })
//   }, [])
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <button onClick={() => Auth.federatedSignIn()}>Sign In</button>
//         <button onClick={checkUser}>Check User</button>
//         <button onClick={signOut}>Sign Out</button>
//         <button onClick={() => Auth.federatedSignIn({provider: 'Facebook'})}>Sign In with Facebook</button>
//         <button onClick={() => Auth.federatedSignIn({provider: 'Google'})}>Sign In with Google</button>

//       </header>
//     </div>
//   );
// }

// export default App
