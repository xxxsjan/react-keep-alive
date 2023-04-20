import { useState } from "react";

function Home () {
  const [ title, setTitle ] = useState('Home');

  return (
    <div className="Home">
      <h1>{ title }</h1>
      <button onClick={ () => setTitle('首页') }>SET</button>
    </div>
  );
}

export default Home;