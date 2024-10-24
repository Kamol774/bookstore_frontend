import React from 'react';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { Link, Route, Switch, useLocation } from 'react-router-dom';
import { HomePage } from './app/screens/homePage';
import { ProductsPage } from './app/screens/productsPage';
import { UserPage } from './app/screens/userPage';
import { OrdersPage } from './app/screens/ordersPage';
import { HomeNavbar } from './app/components/headers/HomeNavbar';
import { OtherNavbar } from './app/components/headers/OtherNavbar';
import { Footer } from './app/components/footer';
import './css/app.css';
import "./css/navbar.css";
import { HelpPage } from './app/screens/helpPage';

function App() {
  const location = useLocation();
  console.log("location", location)
  return (
    <>
      {location.pathname === "/" ? <HomeNavbar /> : <OtherNavbar />}

      <Switch> {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
        <Route path="/products">
          <ProductsPage />
        </Route>
        <Route path="/orders">
          <OrdersPage />
        </Route>
        <Route path="/member-page">
          <UserPage />
        </Route>
        <Route path="/help">
          <HelpPage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
      <Footer />
    </>
  )
}




export default App;
