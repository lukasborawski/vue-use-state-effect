import { useStateEffect } from '~/lib/index.cjs'
import { ref, getCurrentInstance } from 'vue'

const config = {
  name: 'sharedState',
  instance: true,
}

jest.mock('vue', () => ({
  ref: jest.requireActual('vue').ref,
  getCurrentInstance: config.instance
    ? jest.fn(() => {
        return { instance: true }
      })
    : null,
  getCurrentScope: jest.requireActual('vue').getCurrentScope,
  effectScope: jest.requireActual('vue').effectScope,
  // lint-disable-next-line
  onBeforeUnmount: jest.fn((fn) => fn()),
}))

describe('vue-use-state-effect', () => {
  getCurrentInstance.mockImplementation(() => true)
  global.console = { debug: jest.fn(), warn: jest.fn() }

  const { name } = config
  const stateMock = ref({ test: '🚀 Initial state value.' })
  const stateUpdateMock = jest.fn(() => {
    stateMock.value = {
      test: '🌝 Updated state value.',
    }
  })
  const composableMock = () => {
    return {
      state: stateMock,
    }
  }
  const composableFullMock = () => {
    return {
      state: stateMock,
      updateState: stateUpdateMock,
    }
  }
  /* StateEffect Class mock */
  class StateEffect {
    constructor(state, signature) {
      this._syg = signature || 'StateEffect'
      Object.assign(this, state)
    }
  }

  describe('was invoked without config and', () => {
    const state = new StateEffect({ state: ref({ test: '🚀 Initial state value.' }) })
    it('returns state', () => {
      const receivedState = useStateEffect(composableMock)()
      const expectState = { state }
      expect(receivedState).toEqual(expectState)
    })
    it('returns state with method', () => {
      const receivedState = useStateEffect(composableFullMock)()
      const expectState = {
        state: { ...state, updateState: stateUpdateMock },
      }
      expect(receivedState).toEqual(expectState)
    })
    it('returns state with signature', () => {
      const receivedState = useStateEffect(composableMock)()
      expect(JSON.stringify(receivedState)).toMatch('_syg')
    })
  })

  describe('was invoked with config and', () => {
    const state = new StateEffect({ state: ref({ test: '🚀 Initial state value.' }) }, name)
    it('has custom state object name', () => {
      const receivedState = useStateEffect(composableMock, { name })()
      const expectState = { sharedState: state }
      expect(receivedState).toEqual(expectState)
    })
    it('destroys state', () => {
      const receivedState = useStateEffect(composableMock, { name, destroy: true })()
      expect(receivedState).toEqual({ [name]: ref(null) })
    })
    it('destroys state with debug enabled', () => {
      const receivedState = useStateEffect(composableMock, { name, destroy: true, debug: true })()
      expect(receivedState).toEqual({ [name]: ref(null) })
      expect(console.debug).toBeCalledTimes(2)
    })
  })

  describe('will fail when', () => {
    it('composable is not a function', () => {
      const receivedState = useStateEffect('test', { debug: true })
      expect(receivedState).toStrictEqual(ref(null))
      expect(console.warn).toBeCalledTimes(1)
    })
    it('instance is not defined', () => {
      getCurrentInstance.mockImplementation(() => false)
      const receivedState = useStateEffect(composableMock, { debug: true })()
      expect(receivedState).toStrictEqual(ref(null))
      expect(console.warn).toBeCalledTimes(2)
    })
  })
})
