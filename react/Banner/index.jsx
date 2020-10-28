import React from 'react'
import PropTypes from 'prop-types'

import { unstable_Box as MUIBox } from '@material-ui/core/Box'

import Paper from '../Paper'
import Grid from '../MuiCozyTheme/Grid'
import { CardDivider } from '../MuiCozyTheme/Divider'
import Typography from '../Typography'

/**
 * A banner displays a prominent message and related optional actions.
 */
const Banner = ({ icon, bgcolor, text, buttonOne, buttonTwo, inline }) => {
  const position = {
    row: [8, 4],
    column: [12, 12]
  }
  const size = inline ? position.row : position.column

  return (
    <>
      <Paper elevation={0} square>
        <MUIBox pt={2} pr={1} pb={2} pl={2} bgcolor={bgcolor}>
          <Grid container justify="space-between">
            <Grid
              container
              item
              xs={12}
              lg={size[0]}
              spacing={16}
              alignItems="center"
              wrap="nowrap"
            >
              {icon && (
                <Grid item>
                  <MUIBox width={40} height={40}>
                    {icon}
                  </MUIBox>
                </Grid>
              )}
              <Grid item>
                <Typography variant="body1">{text}</Typography>
              </Grid>
            </Grid>
            {(buttonOne || buttonTwo) && (
              <Grid
                container
                item
                xs={12}
                lg={size[1]}
                justify="flex-end"
                spacing={8}
              >
                <Grid item>
                  {buttonOne && buttonOne}
                  {buttonTwo && buttonTwo}
                </Grid>
              </Grid>
            )}
          </Grid>
        </MUIBox>
      </Paper>
      <CardDivider />
    </>
  )
}

Banner.propTypes = {
  /** Image to the left of the row */
  icon: PropTypes.node,
  /** Custom background color */
  bgcolor: PropTypes.string,
  /** Text inside the banner */
  text: PropTypes.node,
  /** Button to be displayed first, the left one */
  buttonOne: PropTypes.node,
  /** Button to be displayed in second, the right one */
  buttonTwo: PropTypes.node,
  /** Show banner on one line (only desktop) */
  inline: PropTypes.bool
}

export default Banner