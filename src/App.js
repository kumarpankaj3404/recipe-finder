import Fav from "./components/Fav.jsx";
import Footer from "./components/Footer.jsx";
import Navigation from "./components/Navigation";
import Serch from "./components/Serch.jsx";
import { BrowserRouter as Router, Routes,Route, } from "react-router";
function App() {
  
  return (
    <Router >
      <Navigation />
      <Routes classname="min-h-svh">
        <Route path="/" element={
          <>
            <Serch />
          </>
        } />
        <Route path="/fav" element={
          <>
            <Fav />
          </>
        } />
      </Routes>
      <Footer  />
    </Router>

  )
}

export default App;
