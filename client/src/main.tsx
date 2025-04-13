import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add custom CSS for fonts
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  body {
    font-family: 'Raleway', sans-serif;
    color: #333333;
    background-color: #F7F3E9;
  }
  h1, h2, h3, h4 {
    font-family: 'Playfair Display', serif;
  }
  .text-accent {
    font-family: 'Cormorant Garamond', serif;
  }
`;
document.head.appendChild(styleSheet);

createRoot(document.getElementById("root")!).render(<App />);
