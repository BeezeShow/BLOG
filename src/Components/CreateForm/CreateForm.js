import { Button, Checkbox, Form, Input, message } from "antd";
import Api from "../../Api/Api";
import Loader from "../UI-Component/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const CreateForm = () => {
  const api = new Api();
  const isLoad = useSelector((state) => state.isLoad);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [err, setErr] = useState({ username: "", email: "" });
  const onFinish = (values) => {
    dispatch({ type: "LOAD_CHANGE", payload: true });
    api.createUser(values).then((res) => {
      if (res.errors) {
        setErr(res.errors);
        dispatch({ type: "LOAD_CHANGE", payload: false });
      } else {
        setErr(false);
        dispatch({ type: "ADD_USER", payload: res.user });
        dispatch({ type: "LOG_IN" });
        dispatch({ type: "LOAD_CHANGE", payload: false });
        navigate("/");
      }
    });
  };
  return isLoad ? (
    <Loader />
  ) : (
    <Form
      className="login-form"
      form={form}
      name="register"
      onFinish={onFinish}

      scrollToFirstError
    >
      <h1 className="sign-in_title">Create new account</h1>
      Username
      <Form.Item
        name="username"
        tooltip="What do you want others to call you?"

        rules={[
          {
            required: true,
            message: "Please input your nickname!",
            whitespace: true,
          },
          {
            required: true,
            message: "Your username must to be within 3 to 20 characters.",
            whitespace: true,
            min: 3,
            max: 20,
          },
        ]}

      >
        <Input
          style={err.username ? { borderColor: "red" } : null}
          onChange={() => setErr(false)}
          placeholder="Username"
          size="large"
        />
      </Form.Item>
      {err.username ? (
        <div style={{ color: "red", position: "absolute", top: 270 }}>
          {"username is alredy taken"}
        </div>
      ) : null}
      Email address
      <Form.Item
        name="email"
        rules={[
          {
            type: "email",
            message: "The input is not valid E-mail!",
          },
          {
            required: true,
            message: "Please input your E-mail!",
          },
        ]}

      >
        <Input
          style={err.email ? { borderColor: "red" } : null}
          onChange={() => setErr(false)}
          placeholder="Email address"
          size="large"
        />
      </Form.Item>
      {err.email ? (
        <div style={{ color: "red", position: "absolute", top: 350 }}>
          {"email is alredy taken"}
        </div>
      ) : null}
      Password
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!",
          },
          {
            required: true,
            message: "Your password needs to be at least 6 characters.",
            whitespace: true,
            min: 6,
            max: 40,
          },
        ]}

        hasFeedback
      >
        <Input.Password placeholder="Password"
                        size="large" />
      </Form.Item>
      Repeat Password
      <Form.Item
        name="confirm"
        dependencies={["password"]}
        hasFeedback
        rules={[
          {
            required: true,
            message: "Please confirm your password!",
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }
              return Promise.reject(
                new Error("Passwords must match"),
              );
            },
          }),
        ]}

      >
        <Input.Password placeholder="Password"
                        size="large" />
      </Form.Item>
      <Form.Item
        name="agreement"
        valuePropName="checked"
        rules={[
          {
            validator: (_, value) =>
              value
                ? Promise.resolve()
                : Promise.reject(new Error("Should accept agreement")),
          },
        ]}
      >
        <Checkbox>I agree to the processing of my personal
          information </Checkbox>
      </Form.Item>
      <Form.Item>
        <div className="sign-in_buttons">
          <Button  size="large" type="primary" htmlType="submit" block>
           Create
          </Button>
          <span>Already have an account?  <Link to="/sign-in">Sign in.</Link></span>
        </div>
      </Form.Item>
    </Form>
  );
};
export default CreateForm;
