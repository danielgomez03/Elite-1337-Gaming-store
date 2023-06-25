import { Provider } from 'react-redux';
import store from '../redux/store';
import Index from "./index.js";

export default function App() {
  return (
    <Provider store={store}>
      <Index />
    </Provider>
  )
}



