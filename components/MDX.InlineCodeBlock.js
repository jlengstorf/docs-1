import React, { useState } from 'react'
import { Check } from '@styled-icons/remix-line'
import { styled } from '../stitches.config'

const InlineCodeBlockContainer = styled('code', {
  background: '$bgSecondary',
  padding: '4px 8px',
  margin: '0 4px',
  borderRadius: '4px',
  lineHeight: '28px',

  '&:hover': {
    cursor: 'pointer',
    color: '$bgPrimary',
    background: '$textBlue',
  },
})

const CopiedState = styled('code', {
  '> svg': {
    width: '12px',
  },
})

export default function InlineCodeBlock({ children }) {
  const [content, setContent] = useState(children)

  const copyToClipboard = (e) => {
    navigator.clipboard.writeText(children)
    setContent(
      <CopiedState>
        <Check /> Copied!
      </CopiedState>
    )
    setTimeout(() => {
      setContent(children)
    }, 1000)
  }

  return (
    <InlineCodeBlockContainer onClick={copyToClipboard}>
      {content}
    </InlineCodeBlockContainer>
  )
}
