import { Navigate } from 'react-router'
import { Routes } from '@/routes'

export default function Index() {
  return <Navigate to={`/${Routes.INTRO}`} replace />
}
