import React from 'react'
import { createMuiTheme } from '@material-ui/core/styles'

import { getCssVariableValue } from '../utils/color'
import isTesting from '../helpers/isTesting'
import AccordionExpandIcon from './AccordionExpandIcon'
import { makePalette } from './makePalette'
import { makeTypography } from './makeTypography'
import { makeShadows } from './makeShadows'
import { makeThemeOverrides } from './makeOverrides'

const themesCommonConfig = {
  shape: {
    borderRadius: 6
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 480,
      md: 768,
      lg: 1023,
      xl: 1200
    }
  },
  zIndex: {
    modal: getCssVariableValue('zIndex-modal')
  },
  props: {
    MuiTabs: {
      textColor: 'primary',
      TabIndicatorProps: { color: 'primary' }
    },
    MuiButton: {
      disableRipple: true
    },
    MuiListItem: {
      disableRipple: true
    },
    MuiTooltip: {
      arrow: true
    },
    MuiAccordionSummary: {
      expandIcon: <AccordionExpandIcon />
    }
  },
  ...(isTesting() && { transitions: { create: () => 'none' } })
}

export const makeTheme = type => {
  const palette = makePalette(type)
  const theme = createMuiTheme({
    ...themesCommonConfig,
    typography: makeTypography(palette),
    palette,
    shadows: makeShadows()
  })
  const overrides = makeThemeOverrides(theme)

  return {
    ...theme,
    overrides
  }
}
