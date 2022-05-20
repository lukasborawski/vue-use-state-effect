## Vue Use State Effect

<a href="https://badge.fury.io/js/vue-use-state-effect"><img src="https://img.shields.io/github/workflow/status/lukasborawski/vue-use-state-effect/CI" alt="npm version" height="18"></a>
<a href="https://badge.fury.io/js/vue-use-state-effect"><img src="https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&type=6e&v=0.1.0&x2=0" alt="npm version" height="18"></a>
<a href="https://badge.fury.io/js/vue-use-state-effect"><img src="https://img.shields.io/bundlephobia/min/vue-use-state-effect" alt="npm version" height="18"></a>

**CAUTION**: Built and tested for/with **Vue 3** and/or **Nuxt 3**.

Fast and small library (composable), built on top of the native `EffectScope` **Vue 3 API** that will provide safe and sharable (across the app) state for your local composables and functions. It might be a good replacement / alternative for **Vuex** or **Pinia** state management, if you need smaller and less extensive solution.

#### Check out the **Stackblitz** Nuxt 3 demo [here](https://stackblitz.com/edit/vue-use-state-effect-demo). 🚀

### Motivation / Story

---

You can read all about the technical background and all the details in this [article](https://lukasborawski.medium.com/vue-use-state-effect-14f81a6c8d62).

Check out below how to use it, provided examples and demos where you can see it in action. Any questions, problems, errors? Please 
check out the [Q&A](#questions) section first, then if you still will be unhappy add a new [Issue](https://github.com/lukasborawski/vue-use-state-effect/issues). Thanks and Enjoy!

### Installation

---

Install the package:

```bash
$ npm i vue-use-state-effect --save
# or
$ yarn add vue-use-state-effect
```

### Usage

---

Create your local composable with some state and pass it to the `useStateEffect`.

```javascript
import { useStateEffect } from 'vue-use-state-effect'

const composable = () => {
  /* your composable logic here */
}

export const useSharedComposable = useStateEffect(composable)
```

Interface (**TypeScript**).

```typescript
type ObjectRecord = { [keyof in string | 'state']: any }

interface UseStateEffectConfig {
  readonly name?: string | null
  readonly destroy?: boolean
  readonly debug?: boolean
}

function useStateEffect<T>(composable: T, config?: UseStateEffectConfig): ObjectRecord | Ref<null>
```

Please check the [example](#example) for some wider perspective.

### Configuration (API)

---

You can use some options to define your usage preferences.

### `name`

- **type:** `String | 'state'`

- **default**: `state`

- **description**: name of composable state object that you'll be referring to inside your components, if not defined by default your state object will get `state` key, please note that it's not read automatically and that's because of application build mode functions name-spaces formatting

### `debug`

- **type**: `Boolean`

- **default**: `false`

- **description**: if set to `true` it will turn on the debug mode, you will be able to see the shared composable body

- **tip**: you can turn it on for the development mode
   
    ```json
    { debug: process.env.NODE_ENV === 'development' }
    ```` 

### `destroy`

- **type**: `Boolean`

- **default**: `false`

- **description**: if set to `true` composable state will be destroyed after component `onBeforeUnmount` hook

Here is a simple example of how to use it (the whole config).

```javascript
export const useComposable = useStateEffect(useSharedComposable, {
  name: 'useSharedComposable',
  debug: true,
  destroy: true,
})
```

More about it in the example that you can find below.

### Example

---

Here you can find a simple usage example that was also covered within the demo projects which you can discover in this repository (one for Vue and one for Nuxt). Check out the [Demo](#demo) section below for more details.

OK - first - let's create a local composable.

```typescript
/* composables/useSharedState.ts */

import { ref } from 'vue'

const sharedState = () => {
  let state = ref({})
  state.value = {
    test: '🚀 Initial state value.',
  }
  const updateState = () => {
    state.value = {
      test: '🌝 Updated state value.',
    }
  }
  return {
    state,
    updateState,
  }
}
```

What you can see here is a simple state `ref` object to which we've passed `test` string. Then we have method that will update this state. Please notice that we're not exporting this method, we're not creating any external or global state objects, everything is locked inside the local composition function.

Now, import and use the `vue-use-state-effect` composable.

```typescript
/* composables/useSharedState.ts */

import { useStateEffect } from 'vue-use-state-effect'

/* you composable logic  */

export const useSharedState: any = useStateEffect(sharedState, {
  name: 'sharedState',
  debug: true,
  destroy: false,
})
```

OK, great. Let's use it along with some page / component. Create one e.g. `home.vue`.

```vue
<!-- Home Page | home.vue -->

<template>
  <div>{{ test }}</div>
  <button @click="updateState">update state</button>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useSharedState } from '@composables/useSharedState'

const {
  sharedState: { state, updateState },
} = useSharedState()

const test = computed(() => state.value.test) // '🚀 Initial state value.',
</script>
```

Please note that we're using `<script setup>` notation here, you can find more about it in [this article](https://itnext.io/vue-3-script-setup-afb42a53462a). Right, what you can see here is that we're importing our newly shared composable with `state` data. With the `state` we have the `updateState` method, that it will update the state. Name of the parent object (`sharedState`) was defined within the configuration. Now you can create new page / component and read saved or updated state along with the different context. Like this.

```vue
<!-- New Page | new.vue -->

<template>
  <div>{{ test }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSharedState } from '@composables/useSharedState'

const {
  sharedState: { state },
} = useSharedState()
const test = ref(state.value.test) // '🌝 Updated state value.',
</script>
```

**Tip**: because of asynchronously created components (especially in Nuxt), if you want to destroy state after the component or page were unmounted - where this state was used - it's good to listen for the new one within the `onMounted` hook.

### Demo

---

Want to check and test it in action? 

#### Check out the **Stackblitz** Nuxt 3 demo [here](https://stackblitz.com/edit/vue-use-state-effect-demo). 🚀

You can also try out locally with the simple apps (Vue 3 and Nuxt 3) in the `demo` folders. You can fire it up manually or from the main folder of this repository, by using these two commands*.

```bash
# vue demo
yarn demo:vue
# nuxt demo
yarn demo:nuxt
```

**using [yarn](https://yarnpkg.com) here, but you can still change it to npm*

---

**API Reference**: Check out the [types](/src/types.d.ts) for API definitions.

**Contribution**: Please add Pull Request or Issue to introduce some changes or fixes.

**Support**: Want to support? [Buy me a coffee](https://www.buymeacoffee.com/lukas.borawski) or [sponsor](https://github.com/sponsors/lukasborawski) me via GitHub.

<a href="https://www.buymeacoffee.com/lukas.borawski" target="__blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me a Coffee"></a>
