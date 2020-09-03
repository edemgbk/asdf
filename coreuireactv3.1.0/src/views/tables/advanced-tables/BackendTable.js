import React from 'react'
import { CCardBody } from '@coreui/react'

const BackendTable = () => {
  return (
    <CCardBody>
      This example simulates data passed lazily from backend.<br></br> 
     
      <iframe src="https://codesandbox.io/embed/react-cdatatable-backend-integration-i6f69?fontsize=14&hidenavigation=1&theme=dark&view=preview"
        style={{ width:'100%', height:'500px', border:'0', borderRadius: '4px', overflow:'hidden' }}
        title="React CDataTable backend integration"
        allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
        sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      ></iframe>
    </CCardBody>

  )
}

export default BackendTable
