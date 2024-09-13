export const Button = ({ text, classes }) => {
  const button = document.createElement("button");
  button.textContent = text;
  button.classList.add(...classes);
  return button;
};
