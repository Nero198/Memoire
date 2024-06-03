import logo from './logo.svg';
import './App.css';
import PersonCreate from './components/Person/Create';
import PersonGetAll from './components/Person/GetAll';
import PersonUpdate from './components/Person/Update';

import TypeCreate from './components/Type/Create';
import TypeGetAll from './components/Type/GetAll';
import TypeUpdate from './components/Type/Update';
import PublishingHouseCreate from './components/PublishingHouse/Create';
import PublishingHouseGetAll from './components/PublishingHouse/GetAll';
import PublishingHouseUpdate from './components/PublishingHouse/Update';
import BookCreate from './components/Book/Create';
import BookGetAll from './components/Book/GetAll';
import BookUpdate from './components/Book/Update';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { format } from 'date-fns';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PersonCreate/>}>
            <Route path='/Person/Create' element={<PersonCreate />} />
          </Route>
            <Route path='/Person/GetAll' element={<PersonGetAll />} />
            <Route path='/Person/Update/:id' element={<PersonUpdate />} />
            <Route path='/Type/Create' element={<TypeCreate />} />
            <Route path='/Type/GetAll' element={<TypeGetAll />} />
            <Route path='/Type/Update/:id' element={<TypeUpdate />} />
            <Route path='/PublishingHouse/Create' element={<PublishingHouseCreate />} />
            <Route path='/PublishingHouse/GetAll' element={<PublishingHouseGetAll />} />
            <Route path='/PublishingHouse/Update/:id' element={<PublishingHouseUpdate />} />
            <Route path='/Book/Create' element={<BookCreate />} />
            <Route path='/Book/GetAll' element={<BookGetAll />} />
            <Route path='/Book/Update/:id' element={<BookUpdate />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
