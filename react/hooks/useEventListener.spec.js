import useEventListener from './useEventListener'
import { renderHook, cleanup } from '@testing-library/react-hooks'

const triggerEvent = (element, eventType) => {
  const event = new Event(eventType)
  element.dispatchEvent(event)
}

describe('useEventListener', () => {
  it('should subscribe to the given event on the given element', async () => {
    const cb = jest.fn()
    renderHook(() => useEventListener(document, 'click', cb))
    triggerEvent(document, 'click')

    expect(cb).toHaveBeenCalledTimes(1)

    await cleanup()

    triggerEvent(document, 'click')
    expect(cb).toHaveBeenCalledTimes(1)
  })

  it('should not subscribe for an undefined element', async () => {
    const cb = jest.fn()
    const { result } = renderHook(() =>
      useEventListener(undefined, 'click', cb)
    )
    expect(result.error).not.toBeDefined()

    await cleanup()
  })

  it('should not subscribe for an undefined event', async () => {
    const cb = jest.fn()
    const { result } = renderHook(() => useEventListener(window, undefined, cb))
    expect(result.error).not.toBeDefined()

    await cleanup()
  })

  it('should not subscribe for an undefined callback', async () => {
    const { result } = renderHook(() =>
      useEventListener(window, 'click', undefined)
    )
    expect(result.error).not.toBeDefined()

    await cleanup()
  })
})
