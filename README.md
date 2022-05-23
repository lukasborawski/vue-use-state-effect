## Vue Use State Effect

<a href="https://badge.fury.io/js/vue-use-state-effect"><img src="https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&type=6e&v=0.1.0&x2=0" alt="npm version" height="18"></a>

**CAUTION**: Built and tested for/with **Vue 3** and/or **Nuxt 3**.

Fast and small library, built on top of the native `scopeEffect` **Vue 3 API** that will provide safe and sharable (across the app) state for your local composables and functions. It might be a good replacement for **Vuex** or **Pinia** state management, if you need smaller and less extensive solution.

#### Check out the **Stackblitz** Nuxt 3 demo [here](https://stackblitz.com/edit/vue-use-state-effect-demo). 🚀

### Motivation / Story

---

You can read all about the technical background and all the details in this [article](https://itnext.io/vue-use-state-effect-14f81a6c8d62).

### Install

---

Install the package:

```bash
$ npm i vue-use-state-effect --save
# or
$ yarn add vue-use-state-effect
```

### Usage

---

Create local composable with some state and pass it to the `useStateEffect`.

```javascript
import { useStateEffect } from 'vue-use-state-effect'

const composable = () => {
  /* your composable logic here */
}

export const useSharedComposable = useStateEffect(composable)
```

Interface (**TypeScript**).

```typescript
interface UseStateEffectConfig {
  readonly name?: string | null
  readonly destroy?: boolean
  readonly debug?: boolean
}

export function useStateEffect<T extends (...args: any[]) => any>(composable: T, config?: UseStateEffectConfig): () => {
  [keyof in string | 'state']: ReturnType<T>
}
```

Please check the configuration, all the details and examples [here](https://github.com/lukasborawski/vue-use-state-effect).

---

**Support**: Want to support? [Buy me a coffee](https://www.buymeacoffee.com/lukas.borawski) or [sponsor](https://github.com/sponsors/lukasborawski) me via GitHub.

<a href="https://www.buymeacoffee.com/lukas.borawski" target="__blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me a Coffee"></a>
