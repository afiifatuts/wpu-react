/* eslint-disable react/prop-types */
import { useState } from 'react';
import Header from './components/Header';




function App() {
 
  const students =['Sandika','Doddy','Erik'];

  const [like,setLike] = useState(0);

  function handleClick() {
      setLike(like+1);
  }

  return (
      <> 
      <Header name="Pak Dika"/>
      <ul>
          {
              students.map((student)=>(
                  <li key={student}>{student}</li>
              ))
          }
      </ul>

      <button onClick={handleClick}>Like ({like})</button>
      </>
  )
}

export default App
