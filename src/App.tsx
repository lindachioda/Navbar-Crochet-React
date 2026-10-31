
import './App.css'
import { Menu } from './components';
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar/>
      <section className="section-center">
        <Menu/>
      </section>
    </div>
  )
}

export default App;
