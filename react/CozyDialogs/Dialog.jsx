import React from 'react'
import cx from 'classnames'

import useCozyDialog from './useCozyDialog'
import MUIDialog, { DialogTitle, DialogActions, DialogContent } from '../Dialog'
import Divider from '../MuiCozyTheme/Divider'

import dialogPropTypes from './dialogPropTypes'
import DialogBackButton from './DialogBackButton'
import DialogCloseButton from './DialogCloseButton'

const Dialog = props => {
  const {
    onClose,
    title,
    content,
    actions,
    actionsLayout,
    titleOptions
  } = props
  const {
    dialogProps,
    dialogTitleProps,
    dialogContentProps,
    fullScreen,
    id,
    dialogActionsProps
  } = useCozyDialog(props)

  return (
    <MUIDialog {...dialogProps}>
      {!fullScreen && onClose && (
        <DialogCloseButton
          onClick={onClose}
          data-test-id={`modal-close-button-${id}`}
        />
      )}
      <DialogTitle
        {...dialogTitleProps}
        className={cx('u-ellipsis', {
          dialogTitleFull: !onClose,
          ['u-flex u-flex-justify-between']: titleOptions
        })}
      >
        {titleOptions ? (
          <>
            <div>
              {fullScreen && onClose && <DialogBackButton onClick={onClose} />}
              {title}
            </div>
            {titleOptions}
          </>
        ) : (
          <>
            {fullScreen && onClose && <DialogBackButton onClick={onClose} />}
            {title}
          </>
        )}
      </DialogTitle>
      <Divider />
      <DialogContent {...dialogContentProps}>
        <div className="dialogContentInner">{content}</div>
      </DialogContent>
      <DialogActions
        {...dialogActionsProps}
        disableSpacing
        className={cx({
          columnLayout: actionsLayout == 'column'
        })}
      >
        {actions}
      </DialogActions>
    </MUIDialog>
  )
}

Dialog.propTypes = dialogPropTypes

export default Dialog
