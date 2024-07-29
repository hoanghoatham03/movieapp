import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './routes/index'

import { store } from './store/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>

  // </React.StrictMode>
)
