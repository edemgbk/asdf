import React, { useState } from 'react'
import {
  CDataTable,
  CCardBody,
  CInputCheckbox,
  CFormGroup,
  CLabel
} from '@coreui/react'
import data from '../../users/UsersData.js'

const SelectTable = () => {
  const [selected, setSelected] = useState([2, 3])
  const usersData = data.map((item, id) => {
    const _selected = selected.includes(id)
    return {
      ...item,
      id,
      _selected,
      _classes: [item._classes, _selected && "table-selected"]
    }
  })

  const check = (e, id) => {
    if (e.target.checked) {
      setSelected([...selected, id]);
    } else {
      setSelected(selected.filter(itemId => itemId !== id));
    }
  }


  return (
    <CCardBody>
      Selected: {JSON.stringify(selected)}
      <CDataTable
        items={usersData}
        fields={[
          { key: 'select', label: '', filter: false },
          'name',
          'registered',
          'role',
          'status'
        ]}
        itemsPerPage={5}
        columnFilter
        sorter
        hover
        pagination
        scopedSlots={{
          select: item => {
            return (
              <td>
                <CFormGroup variant="custom-checkbox">
                  <CInputCheckbox
                    custom
                    id={`checkbox${item.id}`}
                    checked={item._selected}
                    onChange={e => check(e, item.id)}
                  />
                  <CLabel
                    variant="custom-checkbox"
                    htmlFor={`checkbox${item.id}`}
                  />
                </CFormGroup>
              </td>
            )
          }
        }}
        tableFilter
        cleaner
      />
    </CCardBody>
  )
}

export default SelectTable
