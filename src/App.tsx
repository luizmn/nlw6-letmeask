import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { NewRoom } from './pages/NewRoom';

import { AuthContextProvider } from './contexts/AuthContext';

//export const TestContext = createContext({} as any); // as any = hack to force not to type the info

function App() {

  return (
      <BrowserRouter>
        <AuthContextProvider>
          <Route path="/" exact={true} component={Home} />
          <Route path="/rooms/new" component={NewRoom} />
        </AuthContextProvider>
      </BrowserRouter>
  );
}

export default App;
