import { createContext, useCallback, useContext, useState } from 'react'
import RequestModal from '../components/RequestModal.jsx'

const RequestModalContext = createContext(() => {})

export function RequestModalProvider({ children }) {
  const [state, setState] = useState({ open: false, serviceId: '', tier: '' })

  const openRequest = useCallback((opts = {}) => {
    setState({ open: true, serviceId: opts.serviceId ?? '', tier: opts.tier ?? '' })
  }, [])

  const closeRequest = useCallback(() => setState((s) => ({ ...s, open: false })), [])

  return (
    <RequestModalContext.Provider value={openRequest}>
      {children}
      {state.open && (
        <RequestModal initialService={state.serviceId} initialTier={state.tier} onClose={closeRequest} />
      )}
    </RequestModalContext.Provider>
  )
}

export function useRequestModal() {
  return useContext(RequestModalContext)
}
