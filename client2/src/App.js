import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./Components/Header/NavBar";
import Main from "./Components/Main/Main";

function App() {
    return (
        <div className="App">
            <header>
                <NavBar />
            </header>
            <main>
                <Main />
            </main>
            <footer>

            </footer>
        </div>
    );
}

export default App;
