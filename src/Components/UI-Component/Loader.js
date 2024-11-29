import React from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 74,
    }}
    spin
  />
);
const Loader = () => <Spin className="loader" indicator={antIcon} />;
export default Loader;
