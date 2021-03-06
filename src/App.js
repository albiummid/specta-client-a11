import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import AddAdmin from './components/Dashboard/AddAdmin/AddAdmin';
import AddFeature from './components/Dashboard/AddFeature/AddFeature';
import AddReview from './components/Dashboard/AddReview/AddReview';
import AddService from './components/Dashboard/AddService/AddService';
import ManageOrder from './components/Dashboard/ManageOrder/ManageOrder';
import Order from './components/Dashboard/Order/Order';
import OrderList from './components/Dashboard/OrderList/OrderList';
import Home from './components/Home/Home/Home';
import Login from './components/Login/Login';
import NotMatched from './components/NotMatched/NotMatched';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import Footer from './components/Shared/Footer/Footer';
import Navbar from './components/Shared/Navbar/Navbar';import AuthProvider from './context/AuthProvider';
function App() {


  return (
    <AuthProvider>
      <Router>
        <ScrollToTop>

          <Navbar />
          <Switch>
            <PrivateRoute path="/dashboard/order-list">
              <OrderList />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/add-feature" >
              <AddFeature />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/add-review" >
              <AddReview />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/add-service" >
              <AddService />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/order/:id" >
              <Order />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/order" >
              <Order />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/add-admin" >
              <AddAdmin />
            </PrivateRoute>
            <PrivateRoute path="/dashboard/manage-order" >
              <ManageOrder />
            </PrivateRoute>
            <Route path="/login" >
              <Login />
            </Route>
            <Route path="/home">
              <Redirect to='/' />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="*" >
              <NotMatched />
            </Route>
          </Switch>
          <Footer />
        </ScrollToTop>
      </Router>
    </AuthProvider>
  )
}

export default App;
