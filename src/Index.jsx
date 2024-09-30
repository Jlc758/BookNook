import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Navigation from "./Navigation.jsx";

const Index = () => {
  return (
    <React.StrictMode>
      <Navigation />
      <App />
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Index />);

export default Index;
