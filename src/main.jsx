import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store';
import ApolloProviderWrapper from './apolloClient';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <div>
    <Provider store={store}>
      <ApolloProviderWrapper>
        <App />
      </ApolloProviderWrapper>
    </Provider>
  </div>
);
