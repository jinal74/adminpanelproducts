import './App.css';
import Layout from './components/Layout/Layout';
import DashBoard from './containers/DashBoard/DashBoard';
import Table from './containers/Products/Table';
import Categories from './containers/Categories/Categories';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/" component={DashBoard}/>
          <Route path="/table" component={Table}/>
          <Route path="/categories" component={Categories}/>
        </Switch>
      </Layout>
    </>
  );
}

export default App;
