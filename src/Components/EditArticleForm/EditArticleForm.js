import { Input, Button, Form } from "antd";
import Api from "../../Api/Api";
import Loader from "../UI-Component/Loader";
import styles from "./createArticle.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function EditArticleForm() {
  const api = new Api();
  const { slug } = useParams();
  const currentArticle = useSelector((state) => state.currentArticle);
  const page = useSelector((state) => state.page);
  const isLoad = useSelector(state => state.isLoad)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { TextArea } = Input;
  const onFinish = (values) => {
    dispatch({type: "LOAD_CHANGE", payload: true})
    api.editArticle(values, slug).then(() => {
      api.getArticles(page).then((articles) => {
        dispatch({ type: "ADD_ARTICLES", payload: articles });
        dispatch({type: "LOAD_CHANGE", payload: false})
        navigate(`/articles/${slug}`);
      });
    });
  };

  return (
    isLoad ? <Loader/> :
    <Form
      name="basic"
      className={styles.new_article}
      onFinish={onFinish}
      initialValues={{
        remember: true,
        title: currentArticle.title,
        description: currentArticle.description,
        body: currentArticle.body,
        tagList: currentArticle.tagList,
      }}
    >
      <h2 className={styles.articleTitle}> Edit Article</h2>
      Title
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
            message: "Title field is required",
          },
        ]}
      >
        <Input placeholder="title" />
      </Form.Item>
      Short description
      <Form.Item
        name="description"
        rules={[
          {
            required: true,
            message: "Description field is required",
          },
        ]}
      >
        <Input placeholder="short description" />
      </Form.Item>
      Text
      <Form.Item
        name="body"
        rules={[
          {
            required: true,
            message: "Text field is required",
          },
        ]}
      >
        <TextArea placeholder="text" rows={5} />
      </Form.Item>
      Tags
      <Form.List
        name="tagList"
        rules={[
          {
            validator: async (_, names) => {
              if (!names || names.length < 1) {
                return Promise.reject(new Error("You shoult add tag"));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item required={false} key={field.key}>
                <Form.Item
                  {...field}
                  validateTrigger={["onChange", "onBlur"]}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: "Please input tag or delete this field",
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="tag name"
                    style={{
                      width: "30%",
                    }}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <Button
                    onClick={() => remove(field.name)}
                    style={{
                      marginLeft: "10px",
                      color: "red",
                      borderColor: "red",
                    }}
                  >
                    Delete{" "}
                  </Button>
                ) : null}
              </Form.Item>
            ))}
            <Form.Item>
              <Button
                onClick={() => add()}
                style={{
                  width: "30%",
                  color: "blue",
                  borderColor: "blue",
                }}
              >
                Add tegs
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit" className={styles.button}>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
}

export default EditArticleForm;
