

import { BrowserRouter} from 'react-router-dom'
import './App.css';
import { Provider } from 'react-redux'
import AppRoutes from './routes/AppRoutes.jsx'
import store from './redux/store.js'

function App() {
 

  return (
    <>
    <Provider store={store}>
     <BrowserRouter>
     <AppRoutes/>
     </BrowserRouter>
     </Provider>
    </>
  )
}

export default App
