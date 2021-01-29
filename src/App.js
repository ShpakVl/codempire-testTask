import logo from './logo.svg';
import './App.css';
import Container from "./components/Container";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                <Container/>
                <Footer/>
            </div>
        </div>
    );
}

export default App;
