import React from 'react'
import get from 'lodash/get'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'

import AppIcon from '../AppIcon'
import Badge from '../Badge'
import InfosBadge from '../InfosBadge'
import { nameToColor } from '../Avatar'
import Typography from '../Typography'
import { AppDoctype } from '../proptypes'
import Icon from '../Icon'
import iconPlus from '../Icons/Plus'
import iconOut from '../Icons/LinkOut'

import { mobileIconSize, color } from './constants.json'
import styles from './styles.styl'

const useStyles = makeStyles(theme => ({
  name: {
    color,
    maxWidth: '4.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.188rem',
    marginTop: '0.5rem',
    [theme.breakpoints.down('sm')]: {
      maxWidth: mobileIconSize,
      fontSize: '0.6875rem',
      lineHeight: '1rem',
      marginTop: '0.25rem'
    }
  },
  letter: {
    color,
    margin: 'auto'
  }
}))

export const SquareAppIcon = ({ app, name, variant }) => {
  const classes = useStyles()
  const appName = name || get(app, 'name') || app

  const infoBadgeContent =
    variant === 'shortcut' ? <Icon size="10" icon={iconOut} /> : null
  const ghostAddSharedClass = ['ghost', 'add'].includes(variant)
    ? styles['SquareAppIcon-variant-wrapper']
    : null
  return (
    <div data-testid="square-app-icon">
      <InfosBadge
        badgeContent={infoBadgeContent}
        overlap="rectangle"
        invisible={variant !== 'shortcut'}
      >
        <Badge
          className={classnames(
            styles['SquareAppIcon-icon-wrapper'],
            styles[`SquareAppIcon-${variant}`],
            ghostAddSharedClass
          )}
          badgeContent={variant === 'error' ? '!' : ''}
          color={variant === 'error' ? 'error' : undefined}
          withBorder={false}
          overlap="rectangle"
          style={
            variant === 'shortcut'
              ? { backgroundColor: nameToColor(name) }
              : null
          }
        >
          {variant === 'shortcut' ? (
            <Typography className={classes.letter} variant="h2" align="center">
              {get(appName, '[0]', '')}
            </Typography>
          ) : (
            <div>
              {variant === 'add' ? (
                <Icon icon={iconPlus} className="u-primaryContrastTextColor" />
              ) : (
                <AppIcon app={app} />
              )}
            </div>
          )}
        </Badge>
      </InfosBadge>
      <Typography className={classes.name} variant="h6" align="center" noWrap>
        {appName}
      </Typography>
    </div>
  )
}

SquareAppIcon.propTypes = {
  app: PropTypes.oneOfType([AppDoctype, PropTypes.string]),
  name: PropTypes.string,
  variant: PropTypes.oneOf(['ghost', 'maintenance', 'error', 'add', 'shortcut'])
}

export default SquareAppIcon
