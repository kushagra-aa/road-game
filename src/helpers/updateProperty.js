export const getCustomProperty = (element, prop) => {
  return parseFloat(getComputedStyle(element).getPropertyValue(prop)) || 0;
};
export const setCustomProperty = (element, prop, val) => {
  console.log("element :>> ", element);
  element.style.setProperty(prop, val);
};
export const incrementCustomProperty = (element, prop, val) => {
  setCustomProperty(element, prop, getCustomProperty(element, prop) + val);
};
