import ReactDOM from "react-dom";

export const getCustomProperty = (element, prop) => {
  let elm = ReactDOM.findDOMNode(element);
  return parseFloat(getComputedStyle(elm).getPropertyValue(prop)) || 0;
};
export const setCustomProperty = (element, prop, val) => {
  let elm = ReactDOM.findDOMNode(element);
  elm.style.setProperty(prop, val);
};
export const incrementCustomProperty = (element, prop, val) => {
  setCustomProperty(element, prop, getCustomProperty(element, prop) + val);
};
