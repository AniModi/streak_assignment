import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LiveContextProvider } from "./contexts/LiveContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <LiveContextProvider>
    <App />
  </LiveContextProvider>,
);
