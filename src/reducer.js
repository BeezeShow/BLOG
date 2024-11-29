import { createStore } from "redux";

function Reducer(){
    const defaultState = {
        currentArticle: {},
        isLoad: true,
        articles: [],
        page: 1,
        totalPage: 50,
        logIn: false,
        currentUser: { username: "", email: "" },
        error: {},
      };
      
      const reducer = (state = defaultState, action) => {
        switch (action.type) {
          case "ADD_ARTICLES":
            return { ...state, articles: action.payload.articles };
          case "CHANGE_PAGE":
            return { ...state, page: action.payload };
          case "ADD_TOTAL":
            return { ...state, totalPage: action.payload.articlesCount / 5 };
          case "LOG_IN":
            return { ...state, logIn: true };
          case "LOG_OUT":
            return { ...state, logIn: false };
          case "LOAD_CHANGE":
            return { ...state, isLoad: action.payload };
          case "ADD_USER":
            return { ...state, currentUser: action.payload };
          case "ADD_ERROR":
            return { ...state, error: action.payload };
          case "ADD_ARTICLE":
            return { ...state, currentArticle: action.payload };
          default:
            return state;
        }
      };
      
      const store = createStore(reducer);
      return store
}

export default Reducer