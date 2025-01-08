import { ComputedRef, ExtractPropTypes, Ref } from 'vue'

/**
 * Type definition for a function.
 */
export type Function = (...args: any[]) => any

/**
 * Interface for the configuration of the useStateEffect composable.
 */
export interface Config {
  readonly name?: string | null
  readonly destroy?: boolean | 'custom'
  readonly debug?: boolean
}

/**
 * Type definition for the return value of the useStateEffect composable.
 */
type ComposableEffectValue = Ref | ComputedRef | Function
type ComposableEffect = Record<string, ComposableEffectValue>

/**
 * Type definition for the options of the useStateEffect composable.
 */
export type Options<Addons = ComposableEffect> = Partial<{
  readonly destroyLabels: string[]
  readonly props: ExtractPropTypes<{ stateEffectDestroyLabel: string }>
  readonly addons: Addons
}>

/**
 * Type definition for the arguments of the useStateEffect composable.
 */
export type ComposableArgs<Addons extends ComposableEffect> = Options<Addons>[]

/**
 * Type definition for the useStateEffect composable.
 */
export type UseStateEffect = (args: Options) => Ref<null> | { [x: string]: Ref<null> | Signature }

/**
 * Type definition for the signature of the useStateEffect composable.
 */
export type Signature = { _syg: string; _uid: number }

/**
 * Class definition for the StateEffect.
 */
export class StateEffect<State = Function> {
  private state: State
  private _syg: string
  private _uid: number
  constructor(state: State, uid: number) {
    this.state = state
    this._syg = `${uid}`
    this._uid = uid
  }
}

/**
 * Function definition for the useStateEffect composable.
 */
export declare function useStateEffect<
  Extend extends ComposableEffect,
  Effect extends Extend extends undefined ? unknown : Record<string, ComposableEffectValue>,
>(
  composable: (
    ...args: ComposableArgs<Extend>
  ) => Effect extends undefined ? Record<string, ComposableEffectValue> : Effect,
  config?: Config,
): (options?: Options<Extend>) => {
  [key: string | 'state']: unknown extends Effect ? ReturnType<typeof composable> : Effect
}
