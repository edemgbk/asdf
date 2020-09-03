import React from 'react'
import { CBadge } from '@coreui/react'

const ProBadge = props => {
  return (
    <CBadge 
      href="https://coreui.io/pro/react/" 
      color="danger" 
      target="_blank"
      rel="noreferrer noopener"
      {...props}
    >
      CoreUI Pro Component
    </CBadge>
  )
}

export default React.memo(ProBadge)