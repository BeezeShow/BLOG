import React, { useState } from "react";
import "./SignIn.css";
import Api from "../../Api/Api";
import Loader from "../UI-Component/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Form, Input } from "antd";
const SignIn = () => {
  const [err, setErr] = useState();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const api = new Api();
  const isLoad = useSelector((state) => state.isLoad);
  const onFinish = (values) => {
    dispatch({ type: "LOAD_CHANGE", payload: true });
    api.logIn(values).then((res) => {
      if (res.errors) {
        setErr(true);
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
      name="normal_login"
      form={form}
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <h1 className="sign-in_title">Sign In</h1>
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
            placeholder="Email address"
          style={err ? { borderColor: "red" } : null}
          onChange={() => setErr(false)}
        />
      </Form.Item>
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
        <Input.Password
            placeholder="Password"
          style={err ? { borderColor: "red" } : null}
          onChange={() => setErr(false)}
        />
      </Form.Item>
      {err ? (
        <div
          style={{
            color: "red",
            display: "flex",
            justifyContent: "center",
            marginLeft: "-20px",
          }}
        >
          email or password is invalid
        </div>
      ) : null}
      <div className="sign-in_buttons">
        <Button size ="large" block type="primary" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        <span>Don’t have an account?  <Link to="/create-account">Sign Up.</Link></span>
      </div>
    </Form>
  );
};
export default SignIn;
