import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./pages/home"
import NotFound from "./pages/notFound"
import Project from "./pages/project"


const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />
  },
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/projects/:id",
    element: <Project />
  }
])

function App() {

  return (
    <div className='container'>
        <RouterProvider router={router} />
    </div>
  )
}

export default App
