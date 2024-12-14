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
          <Route path="/cabapp/test" element={<Test/>}/> {/*for testing */}
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </>
  )
}

export default App
