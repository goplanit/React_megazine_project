import React from "react";
import styled from "styled-components";

const Button = (props) => {
  const { text, _onClick, is_float, children, margin, width, padding } = props;

  if (is_float) {
    return (
      <React.Fragment>
        <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
      </React.Fragment>
    );
  }

  const styles = {
    margin: margin,
    width: width,
    padding: padding,
  };

  return (
    <React.Fragment>
      <ElButton {...styles} onClick={_onClick}>
        {text ? text : children}
      </ElButton>
    </React.Fragment>
  );
};
Button.defaultProps = {
  text: false,
  children: null,
  _onClick: () => {},
  is_float: false,
  margin: false,
  width: "100%",
  padding: "12px 0px",
};

const ElButton = styled.button`
  width: ${(props) => props.width};
  background-color: #212121;
  color: #fff;
  padding: 12px 0px;
  box-sizing: border-box;
  border: none;
  cursor: pointer;
  padding: ${(props) => props.padding};
  ${(props) => (props.margin ? `margin: ${props.margin};` : "")}
`;

const FloatButton = styled.button`
  width: 50px;
  height: 50px;
  background-color: #212121;
  color: #fff;
  box-sizing: border-box;
  font-size: 36px;
  font-weight: 800;
  position: fixed;
  margin: 0 auto;
  bottom: 50px;
  right: 16px;
  display: flex;
  vertical-align: middle;
  justify-content: center;
  text-align: center;
  border-radius: 50px;
  cursor: pointer;
`;

export default Button;
