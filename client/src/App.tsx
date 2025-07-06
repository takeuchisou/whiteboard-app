import React from 'react';
import Whiteboard from './components/Whiteboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>オンライン ホワイトボード</h1>
      </header>
      <main>
        <Whiteboard />
      </main>
    </div>
  );
}

export default App;
