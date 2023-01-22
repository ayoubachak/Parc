
import Home from './scenes/home';
import {AuthContext, AuthProvider} from "./hooks/AuthProvider";

function App() {

  return (
      <AuthProvider>
        <Home/>
      </AuthProvider>
  );
}

export default App;
