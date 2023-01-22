
import Home from './scenes/home';
import {AuthProvider} from "./hooks/AuthProvider";
function App() {


  return (
      <AuthProvider>
        <Home/>
      </AuthProvider>
  );
}

export default App;
