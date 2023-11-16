import Layout from '@/components/Layout'
import Devtool from '@/components/Devtool'
import ErrorBoundary from '@/components/ErrorBoundary'
import useIsMobile from '@/hooks/useIsMobile'
import LayoutMobile from '@/components/LayoutMobile'
import ScrollRestoration from '@/components/ScrollRestoration'
import Toaster from './components/Toaster'

import useApplyKeyboardShortcuts from './hooks/useApplyKeyboardShortcuts'
import { initEnv } from './utils/env'
const App = () => {
  useApplyKeyboardShortcuts()

  const isMobile = useIsMobile()
  initEnv()

  return (
    <ErrorBoundary>
      {isMobile ? <LayoutMobile /> : <Layout />}
      <Toaster />
      {/* What's this for */}
      <ScrollRestoration />
      <Devtool />
    </ErrorBoundary>
  )
}

export default App
