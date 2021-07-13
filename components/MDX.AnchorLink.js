import * as React from 'react'
import { styled } from '../stitches.config'
import { Links } from '@styled-icons/remix-line'

const AnchorIcon = styled('a', {
  marginLeft: '0.5em',

  '> svg': {
    width: '16px',
  },

  '&:hover': {
    border: 'unset !important',
  },
})

const AnchorHeading = styled('div', {
  fontWeight: '$2',
  fontSize: '1.563em',
  margin: '3em 0 1em',

  [`& ${AnchorIcon}`]: {
    visibility: 'hidden',
    height: '1.563em',
  },

  '&:target:before': {
    content: '',
    display: 'block',
    height: '120px',
    margin: '-120px 0 0',
  },

  '&:hover': {
    [`& ${AnchorIcon}`]: {
      visibility: 'visible',
    },
  },

  '@tablet': {
    [`& ${AnchorIcon}`]: {
      visibility: 'unset',
      height: '1.563em',
    },
  },
})

class AnchorLink extends React.Component {
  createKebabCase = (text) => {
    let kebabText = ''

    if (text && text.toLowerCase) {
      kebabText = text
        .toLowerCase()
        .split(':')
        .join('')
        .split('.')
        .join('')
        .split('(')
        .join('')
        .split(' ')
        .join('-')
    }

    return kebabText
  }

  render() {
    const { children, heading, category } = this.props

    return category !== 'api' ? (
      <AnchorHeading as={heading} id={`${this.createKebabCase(children)}`}>
        {children}
        <AnchorIcon href={`#${this.createKebabCase(children)}`}>
          <Links />
        </AnchorIcon>
      </AnchorHeading>
    ) : (
      <AnchorHeading as={heading}>
        {children}
        <AnchorIcon>
          <Links />
        </AnchorIcon>
      </AnchorHeading>
    )
  }
}

export default AnchorLink
