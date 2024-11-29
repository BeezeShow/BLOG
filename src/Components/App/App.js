import Header from "../Header/Header";
import ArticleList from "../ArticleList/ArticleList";
import Article from "../Article/Article";
import SignIn from "../SignIn/SignIn";
import CreateArticle from "../CreateArticle/CreateArticle";
import EditProfileForm from "../EditProfileForm/EditProfile";
import Api from "../../Api/Api";
import EditArticleForm from "../EditArticleForm/EditArticleForm";
import ErrorPage from "../ErrorPage/ErrorPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import CreateForm from "../CreateForm/CreateForm";

function App() {
  const api = new Api();
  const logIn = useSelector((state) => state.logIn);
  const dispatch = useDispatch();
  const page = useSelector((state) => state.page);
  useEffect(() => {
    dispatch({ type: "LOAD_CHANGE", payload: true });
    api.getArticles(page).then((articles) => {
      dispatch({ type: "ADD_ARTICLES", payload: articles });
      dispatch({ type: "ADD_TOTAL", payload: articles });
      dispatch({ type: "LOAD_CHANGE", payload: false });
    });
  }, [page]);

  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      dispatch({ type: "LOG_IN" });
    }
  });

  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" Component={ArticleList}/>
          <Route path="/articles/:slug" Component={Article} />
          <Route path="/sign-in" Component={SignIn} />
          <Route path="/create-account" Component={CreateForm} />
          <Route path="/new-article" Component={logIn ? CreateArticle : SignIn} />
          <Route path="/:slug/edit-article" Component={logIn ? EditArticleForm : SignIn} />
          <Route path="/edit-profile" Component={logIn ? EditProfileForm : SignIn} />
          <Route path="*" Component={ErrorPage}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
