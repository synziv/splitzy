import Head from 'next/head'
import Link from 'next/link'
import { Provider } from 'react-redux'
import store from '../redux/store/index'
import 'fontsource-roboto';
import Login from '../pages/auth/login';
import AuthProvider from '../components/auth/authProvider';
import Home from './home';
export default function Index() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <div className="container">
          <Head>
            <title>Create Next App</title>
            <link rel="icon" href="/favicon.ico" />
          </Head>

          <main>
            <Home />
          </main>


        </div>
      </AuthProvider>
    </Provider>

    
  )
}
