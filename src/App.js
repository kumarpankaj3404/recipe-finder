import Fav from "./components/Fav.jsx";
import Footer from "./components/Footer.jsx";
import Navigation from "./components/Navigation";
import Search from "./components/Search.jsx";
import Categories from "./components/Categories.jsx";
import LandingPage from "./components/LandingPage.jsx";
import CategoryDetails from "./components/CategoryDetails.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="min-h-[calc(100vh-64px-100px)]"> {/* Adjust based on nav and footer height */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/fav" element={<Fav />} />
          <Route path="/Categories" element={<Categories />} />
          <Route path="/category/:category" element={<CategoryDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
