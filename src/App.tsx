import React, { useState } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import ProductsPage from './app/screens/productsPage';
import UserPage from './app/screens/userPage';
import HomeNavbar from './app/components/headers/HomeNavbar';
import OtherNavbar from './app/components/headers/OtherNavbar';
import useBasket from './app/hooks/useBasket';
import AuthenticationModal from './app/components/auth';
import { sweetErrorHandling, sweetTopSuccessAlert } from './lib/sweetAlert';
import { Messages } from './lib/config';
import MemberService from './app/services/MemberService';
import { useGlobals } from './app/hooks/useGlobals';
import './css/app.css';
import "./css/navbar.css";

function App() {
  const location = useLocation();
  const { setAuthMember } = useGlobals();
  const { cartItems, onAdd, onRemove, onDelete, onDeleteAll
  } = useBasket();
  const [signupOpen, setSignupOpen] = useState<boolean>(false);
  const [loginOpen, setLoginOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  /* HANDLERS */
  const handleSignupClose = () => setSignupOpen(false);
  const handleLoginClose = () => setLoginOpen(false);

  const handleLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseLogout = () => setAnchorEl(null);
  const handleLogoutRequest = async () => {
    try {
      const member = new MemberService();
      await member.logout();

      await sweetTopSuccessAlert("Success", 700);
      setAuthMember(null);
    } catch (err) {
      console.log(err);
      sweetErrorHandling(Messages.error1)
    }
  }

  return (
    <>
      {location.pathname === "/" ?
        <HomeNavbar
          cartItems={cartItems}
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest}

        /> :
        <OtherNavbar
          cartItems={cartItems}
          //@ts-ignore
          onAdd={onAdd}
          onRemove={onRemove}
          onDelete={onDelete}
          onDeleteAll={onDeleteAll}
          setSignupOpen={setSignupOpen}
          setLoginOpen={setLoginOpen}
          anchorEl={anchorEl}
          handleLogoutClick={handleLogoutClick}
          handleCloseLogout={handleCloseLogout}
          handleLogoutRequest={handleLogoutRequest} />}
      <Switch> {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
        <Route path="/products">
          <ProductsPage onAdd={onAdd} /> {/*onAdd={onAdd} => parent dan childga props larni paste qilish uchun */}
        </Route>
        
        <Route path="/member-page">
          <UserPage />
        </Route>
 
      </Switch>

      <AuthenticationModal
        signupOpen={signupOpen}
        loginOpen={loginOpen}
        handleSignupClose={handleSignupClose}
        handleLoginClose={handleLoginClose}
      />
    </>
  )
}




export default App;
