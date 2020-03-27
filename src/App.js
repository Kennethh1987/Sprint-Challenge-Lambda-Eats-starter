import React from "react";
import {Route, Link, Switch } from "react-router-dom";
import Pizza from "./components/Pizza";

const App = () => {
  return (
    <>
      <h1>Lambda Eats</h1>
      <img
        className="home-image"
        src="https://en.wikipedia.org/wiki/Pizza#/media/File:Eq_it-na_pizza-margherita_sep2005_sml.jpg"
        alt="Pizza"
      />
      <Link to="/">Home</Link>
          <Link to="/pizza">Order</Link>
      <Switch>
        <Route path="/pizza">
          <Pizza />
        </Route>
        <Route path="/">
         
        </Route>
      </Switch>
    </>
  );
};
export default App;
