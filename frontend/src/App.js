import logo from './logo.svg';
import './App.css';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Formget from './components/Formget';
import Formupdate from './components/Formupdate';
import First from './components/First';

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
      <Route path="/"element={<First/>}></Route>
      <Route path="/get" element={<Formget/>}></Route>
      <Route path="/updateget/:id" element={<Formupdate/>}></Route>
      </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App;
