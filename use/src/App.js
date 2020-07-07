import React, {useState, useEffect} from 'react';
import {Route} from 'react-router-dom';
import NavBar from './NavBar';
import SignUp from './SignUp';
import SignIn from './SignIn';
import RenterForm from './RenterForm';
import TechList from "./TechList";
import Product from "./Product";
import Data from "./data";
import axios from "axios";
import './App.css';
function App() {

    // setting up state for main data
    // const[data,setData] = useState();
    // // setting up useEffect
    // useEffect(()=>{
    //     axios
    //     .get("https://usemy-techstuff.herokuapp.com/api/product/find/available")
    //     .then(response =>{
    //         console.log("This is the response", response)
    //         setData(response.data)
    //     })
    //     .catch(error => {
    //         console.log("The data was not returned", error)
    //     })
    // }, [data])

  const[data,setData] = useState(Data);

  const [searchTerm, setSearchTerm] = useState("")

  const handleChange = e => {
    setSearchTerm(e.target.value)
    console.log(searchTerm)
  }

useEffect(() => {
  setData(data);
  const initialArray = data;
  const filteredData = initialArray.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase())
    })
    setData(filteredData);
}, [searchTerm])
  return (
    <div className="App">
      
      <header className="Container">
        <div style={{display:'flex', justifyContent:'space-between'}}>
        {/* <input style={{color: "green", margin:'15px 0 0 8%', padding:'0 100px'}} type="text" name="search" value={searchTerm} onChange={handleChange} placeholder='Search...' /> */}
        <NavBar/>
        </div>
      
        <Route exact path = '/'>
          <TechList products = {data}/>
        </Route>
        <Route path = '/sign-in'>
          <SignIn/>
        </Route>
        <Route path = '/sign-up'>
          <SignUp/>
        </Route>
        <Route path = '/renter-form'>
          <RenterForm/>
        </Route>
        <Route path = '/product/:itemId'>
          <Product product = {data}/>
        </Route>
      </header>
    </div>
  );
}
export default App;

