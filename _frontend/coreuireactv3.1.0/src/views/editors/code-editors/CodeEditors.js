import React from 'react'
import {
  CCard,
  CCardHeader,
  CCardBody,
} from '@coreui/react'
import { ProBadge, DocsLink } from 'src/reusable'

import { Controlled as CodeMirror } from 'react-codemirror2'

import 'codemirror/lib/codemirror.css'
// import 'codemirror/theme/material.css'
import 'codemirror/theme/eclipse.css'
// import 'codemirror/mode/markdown/markdown'
// import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/xml/xml'

import sampleCode from './_examples'


const CodeEditors = () => {
  const [content, setContent] = React.useState(sampleCode.xml)

  const options = {
    lineNumbers: true,
    mode: 'xml',
    theme: 'eclipse',
    autofocus: true
  }

  return (
    <CCard>
      <CCardHeader>
        Code Editor - CodeMirror{' '}
        <ProBadge/>
        <DocsLink href="https://github.com/scniro/react-codemirror2"/>
      </CCardHeader>
      <CCardBody>
        <CodeMirror
          value={content}
          options={options}
          onBeforeChange={(editor, data, value) => setContent(value)}
        />
      </CCardBody>
    </CCard>
  )
}

export default CodeEditors
