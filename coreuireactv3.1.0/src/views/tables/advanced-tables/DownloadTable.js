import React, { useState } from 'react'
import {
  CCardBody,
  CButton,
  CDataTable
} from '@coreui/react'
import usersData from '../../users/UsersData.js'

const DemoTable = () => {
  const [currentItems, setCurrentItems] = useState(usersData)

  const csvContent = currentItems.map(item => Object.values(item).join(',')).join('\n')
    
  const csvCode = 'data:text/csv;charset=utf-8,SEP=,%0A' + encodeURIComponent(csvContent)

  return (
    <CCardBody>
      <CButton
        color="primary"
        className="mb-2"
        href={csvCode} 
        download="coreui-table-data.csv"
        target="_blank"
      >
        Download current items (.csv)
      </CButton>
      <CDataTable
        items={usersData}
        columnFilter
        itemsPerPage={5}
        hover
        sorter
        onFilteredItemsChange={setCurrentItems}
      />    
    </CCardBody>
  )
}

export default DemoTable
