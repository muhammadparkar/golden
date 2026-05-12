import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { routes } from './routes/routes'

export default function App() {
  return (
    <Suspense fallback={<div className="route-loader">Loading...</div>}>
      <Routes>
        {routes.map((route) => (
          <Route key={route.path} path={route.path} element={route.element} />
        ))}
      </Routes>
    </Suspense>
  )
}