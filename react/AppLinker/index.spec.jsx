import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  isMobileApp,
  isMobile,
  openDeeplinkOrRedirect,
  startApp,
  isAndroid,
  checkApp
} from 'cozy-device-helper'

import AppLinker from './index'
import { generateUniversalLink } from './native'
jest.useFakeTimers()

const setup = ({ app, onAppSwitch }) => {
  return {
    user: userEvent.setup({ delay: null }),
    ...render(
      <AppLinker onAppSwitch={onAppSwitch} href={'https://fake.link'} app={app}>
        {({ onClick, href, name }) => (
          <div>
            <a href={href} onClick={onClick}>
              Open {name}
            </a>
          </div>
        )}
      </AppLinker>
    )
  }
}

jest.mock('./native', () => ({
  ...jest.requireActual('./native'),
  generateUniversalLink: jest.fn()
}))

jest.mock('cozy-device-helper', () => ({
  ...jest.requireActual('cozy-device-helper'),
  isMobileApp: jest.fn(),
  isMobile: jest.fn(),
  openDeeplinkOrRedirect: jest.fn(),
  startApp: jest.fn().mockResolvedValue(),
  isAndroid: jest.fn(),
  checkApp: jest.fn()
}))

const app = {
  slug: 'drive',
  name: 'Drive'
}

describe('app icon', () => {
  let spyConsoleError, appSwitchMock

  beforeEach(() => {
    isMobileApp.mockReturnValue(false)
    spyConsoleError = jest.spyOn(console, 'error')
    spyConsoleError.mockImplementation(message => {
      if (message.lastIndexOf('Warning: Failed prop type:') === 0) {
        throw new Error(message)
      }
    })
    isMobileApp.mockReturnValue(false)
    isMobile.mockReturnValue(false)
    isAndroid.mockReturnValue(false)
    appSwitchMock = jest.fn()
  })

  afterEach(() => {
    spyConsoleError.mockRestore()
    jest.restoreAllMocks()
  })

  it('should render correctly', () => {
    const { container } = setup({ app })
    expect(container).toMatchSnapshot()
  })

  it('should work for web -> web', async () => {
    isMobileApp.mockReturnValue(false)
    const { container, user } = setup({ app, onAppSwitch: appSwitchMock })
    const link = container.querySelector('a')
    await user.click(link)
    expect(appSwitchMock).not.toHaveBeenCalled()
    expect(startApp).not.toHaveBeenCalled()
  })

  it('should work for native -> native', async () => {
    isMobileApp.mockReturnValue(true)
    checkApp.mockResolvedValue(true)
    const { container, user } = setup({ app, onAppSwitch: appSwitchMock })
    const link = container.querySelector('a')
    await user.click(link)
    expect(startApp).toHaveBeenCalledWith({
      appId: 'io.cozy.drive.mobile',
      name: 'Cozy Drive',
      uri: 'cozydrive://'
    })
    expect(appSwitchMock).toHaveBeenCalled()
  })

  it('should work for web -> native for Android (custom schema) ', async () => {
    isMobile.mockReturnValue(true)
    isAndroid.mockResolvedValue(true)
    const { container, user } = setup({ app, onAppSwitch: appSwitchMock })
    const link = container.querySelector('a')
    await user.click(link)
    expect(openDeeplinkOrRedirect).toHaveBeenCalledWith(
      'cozydrive://',
      expect.any(Function)
    )
    expect(appSwitchMock).toHaveBeenCalled()
  })

  it('should work for web -> native for iOS (universal link)', async () => {
    isMobile.mockReturnValue(true)
    const { container, user } = setup({ app, onAppSwitch: appSwitchMock })
    const link = container.querySelector('a')
    await user.click(link)

    expect(generateUniversalLink).toHaveBeenCalled()
  })

  it('should work for native -> web', async () => {
    isMobileApp.mockReturnValue(true)
    const { container, user } = setup({ app, onAppSwitch: appSwitchMock })
    const link = container.querySelector('a')
    await user.click(link)
    expect(appSwitchMock).toHaveBeenCalled()
  })

  it('should not crash if no href', () => {
    isMobileApp.mockReturnValue(true)
    spyConsoleError.mockImplementation(() => {})
    const { container } = render(
      <AppLinker onAppSwitch={appSwitchMock} app={app}>
        {({ onClick, href, name }) => {
          return (
            <div>
              <a href={href} onClick={onClick}>
                Open {name}
              </a>
            </div>
          )
        }}
      </AppLinker>
    )
    expect(container).toMatchSnapshot()
  })
})
