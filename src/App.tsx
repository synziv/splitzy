import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Provider } from 'react-redux'
import AuthProvider from './components/auth/AuthProvider';
import store from './redux/store';
import Home from './components/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ItemList from './components/itemList/ItemList';
import Login from './components/auth/Login';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Provider store={store}>
            <AuthProvider>
              <div className="container">
                <Switch>
                  <Route path="/items/:id">
                    <ItemList />
                  </Route>
                  <Route path="/auth">
                    <Login />
                  </Route>
                  <Route path="/">
                    <Home />
                  </Route>
                </Switch>
              </div>
            </AuthProvider>
          </Provider>
        </header>
      </div>
    </Router>
  );
}

export default App;
