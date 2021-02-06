import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Provider } from 'react-redux'
import AuthProvider from './components/auth/authProvider';
import store from './redux/store';
import Home from './components/home';

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <Provider store={store}>
      <AuthProvider>
        <div className="container">
          <main>
            <Home />
          </main>
        </div>
      </AuthProvider>
    </Provider>
      </header>
    </div>
  );
}

export default App;
