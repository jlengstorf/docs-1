import React, { Fragment, useState } from 'react'
import { styled } from '../stitches.config'
import * as Collapsible from '@radix-ui/react-collapsible'
import * as ScrollArea from '@radix-ui/react-scroll-area'
import { Menu2, Close, ArrowDropRight } from '@styled-icons/remix-line'
import Logo from './Logo'
import meta from '../content/v1/meta.json'

const ConditionalLogoWrapper = styled('div', {
  '@tablet': {
    display: 'none',
  },
})

const _SearchBarContainer = styled('div', {
  position: 'relative',
  paddingBottom: '2em',

  '&:after': {
    position: 'absolute',
    bottom: '0',
    left: '0',
    content: '',
    display: 'block',
    height: '1px',
    width: '100%',
    background:
      'linear-gradient(to right,var(--border-primary),var(--bg-primary))',
  },
})

const _SidenavContainer = styled(ScrollArea.Root, {
  width: '320px',
  position: 'sticky',
  top: '0px',
  height: 'calc(100vh - 90px)',
  transition: 'border-color 100ms linear',
  padding: '2em',
  paddingRight: '0',

  '> [data-radix-scroll-area-viewport-position]::-webkit-scrollbar': {
    appearance: 'none',
    display: 'none',
    width: '0',
    height: '0',
  },

  [`> ${_SearchBarContainer}`]: {
    display: 'none',
  },

  '@tablet': {
    borderRight: 'unset',
    position: 'fixed',
    top: '0',
    left: '-100vw',
    zIndex: '5',
    padding: '2em',
    backgroundColor: 'var(--bg-primary)',
    flexBasis: '100vw',
    width: '90vw',
    height: '100vh',
    transition: 'left 100ms ease-out',

    '&:hover': {
      borderRight: 'unset',
    },

    '&.show': {
      left: '0',
    },
  },

  '@phone': {
    overflow: 'hidden',

    [`> ${_SearchBarContainer}`]: {
      display: 'block',
    },
  },
})

const StyledScrollbarY = styled(ScrollArea.ScrollbarY, {
  zIndex: '2',
  position: 'absolute',
  userSelect: 'none',
  transition: '300ms opacity ease',
  width: '8',
  right: '0',
  top: '0',
  bottom: '0',
})

const StyledScrollTrack = styled(ScrollArea.Track, {
  zIndex: '-1',
  position: 'relative',
  width: '100%',
  height: '100%',
})

const StyledScrollThumb = styled(ScrollArea.Thumb, {
  backgroundColor: 'var(--text-primary)',
  position: 'absolute',
  top: '0',
  left: '0',
  userSelect: 'none',
  borderRadius: '9999',
  width: '1px',
  height: '8px',
  willChange: 'top',
})

const MenuLink = styled('div', {
  display: 'none',

  '@tablet': {
    position: 'fixed',
    bottom: '2em',
    left: '2em',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    backgroundColor: 'var(--bg-tertiary)',
    boxShadow:
      'rgba(0, 0, 0, 0.1) 0px 1px 6px, rgba(0, 0, 0, 0.2) 0px 2px 24px',
    borderRadius: '6px',
    zIndex: '6',
    padding: '1em',
    fontSize: '14px',

    '> svg': {
      width: '14px',
    },
  },
})

const _SidenavList = styled(ScrollArea.Viewport, {
  zIndex: '3',
  position: 'relative',

  '@tablet': {
    padding: '2em 0 6em',
  },
})

const _GroupContainer = styled(Collapsible.Root, {})

const _GroupHeading = styled(Collapsible.Button, {
  fontSize: '12px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  color: 'var(--text-tertiary)',
  backgroundColor: 'unset',
  border: 'unset',
  padding: '0',
  margin: '0',
  marginBottom: '1em',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',

  svg: {
    width: '24px',
    height: '24px',
  },

  '&:active, &:focus': {
    outline: 'unset',
    border: 'unset',
  },

  '&[data-state="open"]': {
    svg: {
      transform: 'rotate(90deg)',
    },
  },
})

const _GroupLinks = styled(Collapsible.Content, {
  padding: '0',
  marginBottom: '3em',
})

const _PageLink = styled('a', {
  fontSize: '14px',
  textDecoration: 'none',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  margin: '0 0 1.5em 0',
  color: 'var(--text-secondary)',
  position: 'relative',

  '&:hover': {
    color: 'var(--link)',
  },

  '&.active': {
    color: 'var(--text-primary)',
    fontWeight: '600',
  },
})

const BackgroundFrozen = styled('div', {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100vw',
  height: '100vh',
  backdropFilter: 'blur(8px)',
  opacity: '0.75',
  backgroundColor: 'var(--gray-600)',
  zIndex: '4',
})

export default function Navigation() {
  const [mobileTOCState, setMobileTOCState] = useState(false)

  const toggleMobileTOC = () => {
    setMobileTOCState(!mobileTOCState)
    document.body.classList.toggle('prevent-scroll')
  }

  return (
    <Fragment>
      <MenuLink onClick={toggleMobileTOC}>
        {mobileTOCState ? <Close /> : <Menu2 />}
      </MenuLink>
      {mobileTOCState && (
        <BackgroundFrozen onClick={toggleMobileTOC}></BackgroundFrozen>
      )}
      <_SidenavContainer className={mobileTOCState ? 'show' : ''}>
        <ConditionalLogoWrapper>
          <Logo version="v1" />
        </ConditionalLogoWrapper>
        <_SidenavList>
          <_PageLink
            onClick={mobileTOCState ? toggleMobileTOC : () => {}}
            href="/v1"
            activeClassName="active"
          >
            PlanetScale overview
          </_PageLink>

          {meta.order.map((category, index) => {
            return (
              <SidenavGroup
                key={index}
                categoryID={category.id}
                category={category.name}
                pages={category.pages}
                onClick={mobileTOCState ? toggleMobileTOC : () => {}}
              ></SidenavGroup>
            )
          })}
        </_SidenavList>

        <StyledScrollbarY>
          <StyledScrollTrack>
            <StyledScrollThumb />
          </StyledScrollTrack>
        </StyledScrollbarY>
      </_SidenavContainer>
    </Fragment>
  )
}

function SidenavGroup({ categoryID, category, pages, onClick }) {
  return (
    <_GroupContainer defaultOpen={true}>
      <_GroupHeading>
        {category} <ArrowDropRight />
      </_GroupHeading>
      <_GroupLinks>
        {pages.map((page, index) => {
          return (
            <div key={index}>
              <_PageLink
                onClick={onClick}
                href={`/v1/${categoryID}/${page['route']}`}
                activeClassName="active"
              >
                {page['display']}
              </_PageLink>
            </div>
          )
        })}
      </_GroupLinks>
    </_GroupContainer>
  )
}
