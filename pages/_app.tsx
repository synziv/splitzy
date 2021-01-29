import type, { AppProps /*, AppContext */ } from 'next/app'
import { AuthProvider } from '../components/auth/authProvider';

function App({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}
export default App;