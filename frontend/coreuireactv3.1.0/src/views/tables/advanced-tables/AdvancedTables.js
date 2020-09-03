import React from 'react'
import {
  CCard,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import DemoTable from './DemoTable'
import SelectTable from './SelectTable'
import BackendTable from './BackendTable'
import DownloadTable from './DownloadTable'
import { DocsLink } from 'src/reusable'

const AdvancedTables = () => {
  return (
    <CRow>
      <CCol sm="12">
        <CCard>
          <CCardHeader>
            <CIcon name="cil-grid"/> Advanced CDataTable application
            <DocsLink name="CDataTable"/>
          </CCardHeader>
          <DemoTable/>
        </CCard>

        <CCard>
          <CCardHeader>
            Backend integration example
          </CCardHeader>
          <BackendTable/>
        </CCard>

        <CCard>
          <CCardHeader>
            Table with selectable rows
          </CCardHeader>
          <SelectTable/>
        </CCard>

        <CCard>
          <CCardHeader>
            Current table items download to xlsx/csv table
          </CCardHeader>
          <DownloadTable/>
        </CCard>

      </CCol>
    </CRow>
  )
}

export default AdvancedTables
