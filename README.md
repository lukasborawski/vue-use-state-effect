## Vue Use State Effect

**CAUTION**: Built and tested with **Nuxt 3.15**.

Fast and lightweight library (composable) that utilizes the native `EffectScope` **Vue 3 API**. It is designed to offer secure and shareable (across the app) state for your local composables and functions. It can serve as a viable replacement or alternative to **Vuex** or **Pinia** state management, particularly if you require a smaller and less extensive solution.

**Check out the Stackblitz Nuxt demo [here](https://stackblitz.com/edit/vue-use-state-effect-demo).** 🚀

### Motivation / Story

---

You can read all about the technical background and all the details in this [article](https://itnext.io/vue-use-state-effect-14f81a6c8d62).

Configuration (docs) and examples can be found [here](https://github.com/lukasborawski/vue-use-state-effect).

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

export const sharedComposable = useStateEffect(
  (...args) => {
    /* your composable logic here */
  },
  { ...config },
)
```

Please check the configuration, all the details and examples [here](https://github.com/lukasborawski/vue-use-state-effect).

---

**Support**: Want to support? [Buy me a coffee](https://www.buymeacoffee.com/lukas.borawski) or [sponsor](https://github.com/sponsors/lukasborawski) me via GitHub.

<a href="https://www.buymeacoffee.com/lukas.borawski" target="__blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me a Coffee"></a>
