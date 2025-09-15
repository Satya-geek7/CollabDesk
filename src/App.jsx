// App.jsx
import { BrowserRouter, RouterProvider } from "react-router-dom";
import Router from "./routes/index.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-right" reverseOrder={false} />
        <Router />
      </BrowserRouter>
    </>
  );
}

export default App;
