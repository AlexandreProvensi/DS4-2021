import { createTheme, ThemeProvider } from '@material-ui/core';
import { createContext, useState } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import { Home } from './pages/Home';
import { SignIn } from './pages/Signin';
import { SignUp } from './pages/SignUp';

const theme = createTheme({
  palette: {
    primary: {
      light: '#8079f3',
      main: '#6158F0',
      dark: '#433da8',
    }
  }
});

export type ErrorType = {
  type: string;
  message: string;
}

export type User = {
  id: number,

}

export const AuthContext = createContext({} as any);

function App() {

  const [user, setUser] = useState<User>();

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthContext.Provider value={{user, setUser}} />
          <Route path="/" exact component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/home" component={Home} />
          </AuthContext.Provider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
