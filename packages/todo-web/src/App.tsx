import "./App.css";
import { Button } from "./components/Button";

const App = () => (
    <div className="App">
        <Button type="button" aria-pressed="true" label="Button" variant="primary" size="lg" onClick={()=>alert("I am a button")}/>
    </div>
);

export default App;
