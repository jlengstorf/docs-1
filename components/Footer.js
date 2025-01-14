import React from 'react'
import { styled } from '../stitches.config'
import { Hyperlink } from './Hyperlink'
import Toggler from './Toggler'

const FooterWrapper = styled('div', {
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '32px 0',

  '&:after': {
    position: 'absolute',
    top: '0',
    left: '0',
    content: '',
    display: 'block',
    height: '1px',
    width: '100%',
    background: 'linear-gradient(to right, $borderPrimary, $bgPrimary)',
  },

  '@phone': {
    padding: '2em',
    borderTop: '1px solid $borderPrimary',

    '&:after': {
      content: 'unset',
    },
  },
})

const FooterConstrain = styled('div', {
  maxWidth: '80rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',

  '@phone': {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
})

const LeftContainer = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  '> a': {
    marginRight: '8px',
  },

  '@phone': {
    marginBottom: '1em',
  },
})

const Copyright = styled('div', {
  fontSize: '12px',
  color: '$textSecondary',
})

export default function Footer() {
  return (
    <FooterWrapper>
      <FooterConstrain>
        <LeftContainer>
          <Hyperlink
            type="secondary"
            href="https://www.planetscale.com/legal/privacy"
          >
            Privacy
          </Hyperlink>
          <Hyperlink
            type="secondary"
            href="https://www.planetscale.com/legal/siteterms"
          >
            Terms
          </Hyperlink>
          <Copyright>© 2021 PlanetScale Inc.</Copyright>
        </LeftContainer>
        <Toggler />
      </FooterConstrain>
    </FooterWrapper>
  )
}
