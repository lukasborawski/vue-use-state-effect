import type { Ref } from 'vue'

type ObjectRecord = { [keyof in string | 'state']: any }

export type Function = (...args: any) => {
  name: string
}
export interface UseStateConfig {
  readonly name?: string | null
  readonly destroy?: boolean
  readonly debug?: boolean
}
export type UseStateEffect = (composable: Function, config?: UseStateConfig) => ObjectRecord
export type UseStateEffectSignature = { _syg: string | 'StateEffect' }

export class StateEffect<T = Function> {
  [state: 'StateEffect']: T
  _syg: string | 'StateEffect'
  constructor(state: T): state
}
export function useStateEffect<T>(composable: T, config?: UseStateConfig): ObjectRecord | Ref<null>
