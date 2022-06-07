import Layout from './components/Layout/Layout';
import DashBoard from './containers/DashBoard/DashBoard';
import Table from './containers/Products/Table';
import Categories from './containers/Categories/Categories';
import { Provider } from "react-redux";
import { Route, Switch } from "react-router-dom";
import configureStore from './redux/store'

function App() {
  const store = configureStore();
  return (
    <>
      <Provider store={store}>
        <Layout>
          <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route path="/table" component={Table} />
            <Route path="/categories" component={Categories} />
          </Switch>
        </Layout>
      </Provider>
    </>
  );
}

export default App;
