import React from "react";
import { Pagination } from "antd";
import "./ui-components.css";
import { useDispatch, useSelector } from "react-redux";

const Paginations = () => {
  const dispatch = useDispatch();
  const totalPage = useSelector((state) => state.totalPage);
  const page = useSelector((state) => state.page);
  return (
    <Pagination
      className="pagination"
      onChange={(p) => dispatch({ type: "CHANGE_PAGE", payload: p })}
      defaultCurrent={page}
      total={totalPage * 10}
      showSizeChanger={false}
    />
  );
};
export default Paginations;
