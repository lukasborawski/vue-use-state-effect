import { ComputedRef, ExtractPropTypes, Ref } from 'vue'

/**
 * Type definition for a function.
 */
export type Function = (...args: any[]) => any

/**
 * Interface for the configuration of the useStateEffect composable.
 */
export interface UseStateEffectConfig {
  readonly name?: string | null
  readonly destroy?: boolean | 'custom'
  readonly debug?: boolean
}

/**
 * Type definition for the return value of the useStateEffect composable.
 */
type ComposableReturnValue = Ref | ComputedRef | Function
type UseStateEffectComposableReturn = Record<string, ComposableReturnValue>

/**
 * Type definition for the options of the useStateEffect composable.
 */
export type UseStateEffectOptions<Addons = UseStateEffectComposableReturn> = Partial<{
  readonly destroyLabels: string[]
  readonly props: ExtractPropTypes<{ stateEffectDestroyLabel: string }>
  readonly addons: Addons
}>

/**
 * Type definition for the arguments of the useStateEffect composable.
 */
export type UseStateEffectComposableArgs<Addons extends UseStateEffectComposableReturn> =
  UseStateEffectOptions<Addons>[]

/**
 * Type definition for the useStateEffect composable.
 */
export type UseStateEffect = (
  args: UseStateEffectOptions,
) => Ref<null> | { [x: string]: Ref<null> | UseStateEffectSignature }

/**
 * Type definition for the signature of the useStateEffect composable.
 */
export type UseStateEffectSignature = { _syg: string; _uid: number }

/**
 * Class definition for the StateEffect.
 */
export class StateEffect<T = Function> {
  private state: T
  private _syg: string
  private _uid: number
  constructor(state: T, uid: number) {
    this.state = state
    this._syg = `${uid}`
    this._uid = uid
  }
}

/**
 * Function definition for the useStateEffect composable.
 */
export declare function useStateEffect<
  ComposableExtend extends UseStateEffectComposableReturn,
  ComposableReturn extends ComposableExtend extends undefined ? unknown : Record<string, ComposableReturnValue>,
>(
  composable: (
    ...args: UseStateEffectComposableArgs<ComposableExtend>
  ) => ComposableReturn extends undefined ? Record<string, ComposableReturnValue> : ComposableReturn,
  config?: UseStateEffectConfig,
): (options?: UseStateEffectOptions<ComposableExtend>) => {
  [key: string | 'state']: unknown extends ComposableReturn ? ReturnType<typeof composable> : ComposableReturn
}
