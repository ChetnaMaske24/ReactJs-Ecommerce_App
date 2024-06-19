import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/header/header";
import Home from "./pages/Home/index";
import Footer from "./components/footer/footer";

function App() {
  return (
    <>
      <Header />
      <Home />
      <Footer />
    </>
  );
}

export default App;
