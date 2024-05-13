import logo from './logo.svg';
import './App.css';
import Create from './components/Create';
import GetAll from './components/GetAll';
import Update from './components/Update';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { format } from 'date-fns';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Create/>}>
            <Route path='/Create' element={<Create />} />
          </Route>
            <Route path='/GetAll' element={<GetAll />} />
            <Route path='/Update/:id' element={<Update />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
