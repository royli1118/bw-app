import logo from './logo.svg';
import './App.css';
import { useEffect, useLayoutEffect, useRef, useState, useContext, createContext } from 'react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

function Form() {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  return (
    <div>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder='name'
      ></input>
      <input
        type='number'
        value={age}
        onChange={e => setAge(e.target.value)}
        placeholder='age'
      />
      <p>Name:{name}, Age:{age}</p>
    </div>
  )
}

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8080/api/customer/1') // Use JAVA Springboot microservices.
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => setError(error))
      .finally(() => setLoading(false));
  }, [userId])
  console.log(user)
  if (loading) return <div>Loading.....</div>;
  if (error) return <div>Error: {error.message}</div>

  return <div>{user ? `User: ${user.name}` : `User not found `}</div>
}


function ResponsiveText({ text }) {
  const textRef = useRef(null);
  const [fontSize, setFontSize] = useState(100);

  useLayoutEffect(() => {
    if (textRef.current) {
      const containerWidth =
        textRef.current.parentNode.offsetWidth;
      const textWidth = textRef.current.offsetWidth;
      console.log(containerWidth)
      console.log(textWidth)
      if (textWidth > containerWidth) {
        setFontSize((fontSize) => fontSize * (containerWidth / textWidth));
      }
    }
  }, [text])
  return (
    <div style={{ width: '100%' }}>
      <p ref={textRef} style={{
        fontSize:
          `${fontSize}px`
      }}>
        Text
      </p>
    </div>
  )
}

const ThemeContext = createContext('dark');
function ThemedButton() {
  const theme = useContext(ThemeContext);
  const className = theme === 'dark' ? 'button-dark'
    : 'button-light';
  return <button className={className}>Click
    me</button>;
}
export default ThemedButton;
