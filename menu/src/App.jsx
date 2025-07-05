
import './App.css'
import About from './components/About';
import Career from './components/Career';
import FoodListing from './components/FoodListing'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Orders from './components/Orders'
import {Routes,Route} from 'react-router-dom';


function App() {

  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/order' element={<Orders/>} />
      <Route path='/addfood' element={<FoodListing/>} />
       <Route path='/about' element={<About/>} />
        <Route path='/career' element={<Career/>} />
    </Routes>
  
  
     
    
  
    </>
  )
}

export default App

