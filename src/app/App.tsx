import './reset.css'
import './App.scss'

import { RouterProvider } from "react-router-dom";
import { router } from "@/app/router/router";
import MainProvider from "./provider/index";

function App() {
  return (
      <MainProvider>
          <RouterProvider router={router}/>
      </MainProvider>
  )
}

export default App
