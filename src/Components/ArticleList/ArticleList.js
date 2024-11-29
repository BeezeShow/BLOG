/*eslint-disable*/
import { useDispatch, useSelector } from 'react-redux'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Link } from 'react-router-dom'

import Api from '../../Api/Api'
import './ArticleList.css'

import Paginations from '../UI-Component/Pagination'

import Loader from '../UI-Component/Loader'
function ArticleList() {
  const api = new Api()
  const isLoad = useSelector((state) => state.isLoad)
  const articles = useSelector((state) => state.articles)
  const logIn = useSelector((state) => state.logIn)
  const page = useSelector((state) => state.page)
  const dispatch = useDispatch()
  const onLikeClick = (el) => {
    if (!el.favorited) {
      api.addLike(el.slug).then(() => {
        api.getArticles(page).then((articles) => {
          dispatch({ type: 'ADD_ARTICLES', payload: articles })
          dispatch({ type: 'ADD_TOTAL', payload: articles })
        })
      })
    } else {
      api.deleteLike(el.slug).then(() => {
        api.getArticles(page).then((articles) => {
          dispatch({ type: 'ADD_ARTICLES', payload: articles })
          dispatch({ type: 'ADD_TOTAL', payload: articles })
        })
      })
    }
  }
  const articleList = []
  let key = 1
  for (let el of articles) {
    articleList.push(
      <div key={key} className="article">
        <div>
          <Link to={`/articles/${el.slug}`} className="title">
            {el.title.slice(0, 50)}
          </Link>
          {logIn ? (
            <button
              style={{
                border: 'none',
                backgroundColor: 'inherit',
                cursor: 'pointer',
              }}
              onClick={() => onLikeClick(el)}
            >
              {' '}
              {el.favorited ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
              {' ' + el.favoritesCount}
            </button>
          ) : (
            <span>
              {' '}
              {el.favorited ? <HeartFilled style={{ color: 'red' }} /> : <HeartOutlined />}
              {' ' + el.favoritesCount}
            </span>
          )}
        </div>
        <div className="tags">
          {el.tagList.map((tag) => (
            <span className="tag">{tag.slice(0, 50)}</span>
          ))}
        </div>
        <div className="article_description">{el.description.slice(0, 100)}</div>
        <div className="user_info">
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '18px' }}>{el.author.username}</div>
            <div style={{ fontSize: '12px', color: ' gray' }}>{new Date(el.updatedAt).toDateString()}</div>
          </div>
          <img src={el.author.image}></img>
        </div>
      </div>
    )
    key++
  }
  return isLoad ? (
    <Loader />
  ) : (
    <>
      {articleList}
      <Paginations />
    </>
  )
}

export default ArticleList
