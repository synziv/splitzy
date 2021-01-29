import Head from 'next/head'
import Link from 'next/link'
import { Provider } from 'react-redux'
import store from '../redux/store/index'
import 'fontsource-roboto';
import ItemList from '../components/itemList/itemList'
import Login from '../pages/auth/login'
export default function Home() {
  return (
    <Provider store={store}>
      <div className="container">
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main>
          <ItemList/>
          <Login/>
        </main>

        
      </div>
    </Provider>
    
  )
}
