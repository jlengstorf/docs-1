import React, { useContext, useState, useEffect } from 'react'
import { styled } from '../stitches.config'
import { ButtonSecondary } from './Buttons'
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons'
import { ThemeContext } from './themeContext'
import Highlight, { defaultProps } from 'prism-react-renderer'
import Prism from 'prism-react-renderer/prism'

const CodeBlockContainer = styled('div', {
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid $borderPrimary',
  borderRadius: '6px',
  margin: '3em 0',
  backgroundColor: '$bgSecondary',

  '> code:not(:last-of-type)': {
    borderBottom: '1px solid $borderPrimary',
  },
})

const CopyButton = styled(ButtonSecondary, {
  fontSize: '12px',
  padding: '1em',
  border: 'unset',
  borderLeft: '1px solid $borderPrimary',
  backgroundColor: '$bgSecondary',
  borderRadius: 'unset',
  borderTopRightRadius: '6px',
  color: '$textSecondary',

  '& svg': {
    width: '14px',
    marginRight: '8px',
  },

  '&:hover': {
    backgroundColor: '$textBlueTranslucent',
    color: '$textBlue',

    '& svg': {
      color: '$textBlue',
    },
  },

  '&.disabled': {
    pointerEvents: 'none',
  },
})

const CopyButtonText = styled('span', {})

const CodeBlockHeader = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  padding: '0 0 0 1em',
  width: 'calc(100%)',
  borderBottom: '1px solid $borderPrimary',
})

const CodeType = styled('div', {
  fontFamily: '$mono',
  fontSize: '12px',
  textTransform: 'lowercase',
  color: '$textSecondary',
})

const CodeBlockContent = styled('code', {
  margin: '0',
  padding: '1em',
  overflow: 'scroll',
  fontFamily: '$mono',
  fontSize: '14px',
  borderBottomLeftRadius: '6px',
  borderBottomRightRadius: '6px',
  backgroundColor: 'unset !important',

  variants: {
    command: {
      true: {
        borderRadius: '0',
      },
    },
  },
})

export default function CodeBlock({ className, children }) {
  const themeContext = useContext(ThemeContext)
  const [codeLanguage, setCodeLanguage] = useState('')
  const [internalCodeLanguage, setInternalCodeLanguage] = useState('')
  const [splitOutput, setSplitOutput] = useState([])
  const [copyButtonState, setCopyButtonState] = useState(false)
  const [customTheme, setCustomTheme] = useState(
    themeContext.getActiveMode().codeTheme
  )

  useEffect(() => {
    ;(typeof global !== 'undefined' ? global : window).Prism = Prism
    require('prismjs/components/prism-ruby.min')
    require('prismjs/components/prism-bash.min')

    if (className) {
      const codeLanguage = className.split('-')[1]
      if (codeLanguage === 'zsh') {
        setInternalCodeLanguage('bash')
      } else {
        setInternalCodeLanguage(codeLanguage)
      }
      setCodeLanguage(codeLanguage)
    }

    if (children.split('------').length === 2) {
      // this is a cmd + output block
      setSplitOutput(children.split('------'))
    }

    setCustomTheme(themeContext.getActiveMode().codeTheme)
  }, [themeContext])

  const copyCode = (e) => {
    setCopyButtonState(true)
    setTimeout(() => {
      setCopyButtonState(false)
    }, 3000)

    navigator.clipboard.writeText(
      splitOutput.length === 2 ? splitOutput[0].trim() : children
    )
  }

  return (
    <CodeBlockContainer>
      <CodeBlockHeader>
        <CodeType>{codeLanguage}</CodeType>
        <CopyButton
          onClick={copyCode}
          className={copyButtonState ? 'disabled' : ''}
        >
          {copyButtonState ? <CheckIcon /> : <CopyIcon />}
          <CopyButtonText>
            {copyButtonState ? 'Copied!' : 'Copy'}
          </CopyButtonText>
        </CopyButton>
      </CodeBlockHeader>
      {splitOutput.length === 2 && (
        <Highlight
          {...defaultProps}
          theme={customTheme}
          code={splitOutput[0].trim()}
          language={internalCodeLanguage}
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <CodeBlockContent command className={className} style={style}>
              {tokens.map((line, i) => (
                <div {...getLineProps({ line, key: i })}>
                  {line.map((token, key) => (
                    <span {...getTokenProps({ token, key })} />
                  ))}
                </div>
              ))}
            </CodeBlockContent>
          )}
        </Highlight>
      )}
      <Highlight
        {...defaultProps}
        theme={customTheme}
        code={
          splitOutput.length === 2 ? splitOutput[1].trim() : children.trim()
        }
        language={internalCodeLanguage}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <CodeBlockContent className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </CodeBlockContent>
        )}
      </Highlight>
    </CodeBlockContainer>
  )
}
