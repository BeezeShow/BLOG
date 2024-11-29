import { useDispatch, useSelector } from "react-redux";
import Api from "../../Api/Api";
import { Button } from "antd";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header() {
  const api = new Api();
  const navigate = useNavigate();
  const logIn = useSelector((state) => state.logIn);
  const page = useSelector((state) => state.page);
  const currentUser = useSelector((state) => state.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    api.getCurrentUser().then((res) => {
      if (res) {
        dispatch({ type: "ADD_USER", payload: res.user });
      }
    });
  }, [logIn]);
  const onLogoClick = () => {
    api.getArticles(page).then((articles) => {
      dispatch({ type: "ADD_ARTICLES", payload: articles });
      dispatch({ type: "ADD_TOTAL", payload: articles });
      navigate("/");
    });
  };
  const logOut = () => {
    dispatch({ type: "LOG_OUT" });
    dispatch({ type: "ADD_USER", payload: { username: "", email: "" } });
    window.localStorage.removeItem("token");
    navigate("/");
  };
  const headerButtons = logIn ? (
    <div className="header_buttons">
      <Link to="/new-article" className="header_button">
        Create Article
      </Link>
      <Link to="/edit-profile" className="userData">
        {currentUser.username}
        <img
          src={
            currentUser.image ||
            `/Rectangle 1.png`
          }
        />
      </Link>
      <button className="header_button" onClick={() => logOut()}>
        Log Out
      </button>
    </div>
  ) : (
    <div className="header_buttons">
      <Link to="/sign-in" className="header_button">
        Sign in
      </Link>
      <Link to="/create-account" className="header_button">
        Sign up
      </Link>
    </div>
  );
  return (
    <div className="header">
      <button className="logo" onClick={() => onLogoClick()}>
        Realworld Blog
      </button>
      {headerButtons}
    </div>
  );
}

export default Header;
