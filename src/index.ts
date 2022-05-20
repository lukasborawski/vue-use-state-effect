import type { EffectScope, Ref } from 'vue'
import { effectScope, getCurrentInstance, getCurrentScope, onBeforeUnmount, ref } from 'vue'
import { Function, UseStateEffectConfig, UseStateEffect, UseStateEffectSignature } from './types'

export function useStateEffect(composable: Function, config: UseStateEffectConfig): UseStateEffect | Ref<null> {
  const signature: string = 'useStateEffect'
  /* Composable definition (body|type) check. */
  if (typeof composable !== 'function') {
    console.warn(`[${signature}] You need to provide composable function.`)
    return ref<null>(null)
  }
  /* Default Config */
  let subscribers = 0
  let state: any, scope: EffectScope | null
  const { name, destroy, debug }: UseStateEffectConfig = { name: null, destroy: false, debug: false, ...config }
  /*
   * Destroy State Effect class.
   * @type {function}
   * @name scopeDestroy
   * @function
   * */
  const scopeDestroy = (): void => {
    if (scope && subscribers > 0) {
      state.off()
      subscribers = 0
      state = scope = null
      if (debug) {
        console.debug(`${name || 'composable'} state destroyed:`, {
          composable,
        })
      }
    }
  }
  /*
   * Create State Effect class.
   * @param {function} state - current state [ReactiveEffect]
   * @type {Class} StateEffect
   * @name StateEffect
   * @class
   * */
  class StateEffect {
    constructor(state: Function) {
      ;(this as any)._syg = `${name || 'StateEffect'}`
      Object.assign(this, state)
    }
  }
  /*
   * Create State Effect Object.
   * @param|@arg {Array} args - composable arguments
   * @type {function}
   * @function
   * */
  return (...args) => {
    subscribers++
    if (!state) {
      scope = effectScope(true)
      state = scope
      state.on()
      // @ts-ignore: unable to import callable class interface
      state.effects.push(new StateEffect(composable(...args)) as Function)
      state = getCurrentScope()
    }
    /* Current Vue instance | State check. */
    if (!state || !getCurrentInstance()) {
      if (!state) console.warn(`[${signature}] Unable to record new state.`)
      if (!getCurrentInstance()) console.warn(`[${signature}] Unable to read current instance.`)
      return ref<null>(null)
    }
    if (debug) {
      console.debug(`${name || 'composable'} state created:`, {
        state,
      })
    }
    /* Hook listener initialize. */
    if (state && destroy && getCurrentInstance()) {
      onBeforeUnmount(() => scopeDestroy())
    }
    /*
     * Get current State Effect.
     * @type {function|null}
     * @name recordState
     * */
    const recordState: UseStateEffectSignature | null | undefined = state
      ? (state.effects as UseStateEffectSignature[]).find((effect) => effect.hasOwnProperty('_syg'))
      : null
    return {
      [name || 'state']:
        ((recordState as UseStateEffectSignature)?._syg === (name || 'StateEffect') && recordState) || ref<null>(null),
    }
  }
}
