import { BrowserRouter, Route, Routes } from "react-router-dom"
import {CabApp} from "./pages/cabapp"
import { Home } from "./pages/home"
import {Test} from "./pages/test"
import toast, { Toaster } from 'react-hot-toast';
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/cabapp" element={<CabApp/>}/>
          <Route path="/cabapp/home" element={<Home/>}/>
          <Route path="/cabapp/Test" element={<Test/>}/> {/*for testing */}
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </>
  )
}
//add feature in your profile rides - map green red people emoji there onclick->display passenger details 
//add ticket id in bookedride and your profile rides for users 
//add onclick event for in bookedrides to show info of the captain 
export default App
