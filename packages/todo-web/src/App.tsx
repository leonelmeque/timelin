import "./App.css";
import {Button, Input} from "@todo/ui/platform-web"

const App = () => (
    <div className="App">
        <Button
            type="button"
            aria-pressed="true"
            label="Button"
            variant="primary"
            size="lg"
            onClick={() => alert("I am a button")}
        />

        <Input  />
    </div>
);

export default App;
