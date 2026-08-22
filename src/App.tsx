import { lazy } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from '@/components/layout/Layout'
import { SiteMeta } from '@/components/SiteMeta'
import { ErrorBoundary } from '@/components/system/ErrorBoundary'

const Home = lazy(() => import('@/pages/Home'))
const Projects = lazy(() => import('@/pages/Projects'))
const ProjectDetail = lazy(() => import('@/pages/ProjectDetail'))
const NotFound = lazy(() => import('@/pages/NotFound'))

function AppRoutes() {
  const location = useLocation()

  return (
    <ErrorBoundary key={location.pathname}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <SiteMeta />
      <AppRoutes />
    </BrowserRouter>
  )
}
