## Vue Use State Effect

<a href="https://badge.fury.io/js/vue-use-state-effect"><img src="https://d25lcipzij17d.cloudfront.net/badge.svg?id=js&r=r&type=6e&v=0.1.4&x2=0" alt="npm version" height="18"></a>
<a href="https://badge.fury.io/js/vue-use-state-effect"><img src="https://img.shields.io/bundlephobia/min/vue-use-state-effect" alt="npm version" height="18"></a>
<a href="https://badge.fury.io/js/vue-use-state-effect"><img src="https://img.shields.io/npm/dm/vue-use-state-effect" alt="npm version" height="18"></a>
<a href="https://badge.fury.io/js/vue-use-state-effect"><img src="https://img.shields.io/npm/l/vue-use-state-effect" alt="npm version" height="18"></a>

**CAUTION**: Built and tested with **Nuxt 3.15**.

Fast and lightweight library (composable) that utilizes the native `EffectScope` **Vue 3 API**. It is designed to offer secure and shareable (across the app) state for your local composables and functions. It can serve as a viable replacement or alternative to **Vuex** or **Pinia** state management, particularly if you require a smaller and less extensive solution.

**Check out the **Stackblitz** Nuxt 3 demo [here](https://stackblitz.com/edit/vue-use-state-effect-demo)**. 🚀

### Motivation / Story

---

You can read all about the technical background and all the details in this [article](https://lukasborawski.medium.com/vue-use-state-effect-14f81a6c8d62).

Check out the docs of how to use it, get familiar with provided examples and demos where you can see it in action. Any questions, problems, errors? Please check out the [Q&A](#questions) section first, then if you still will be unhappy add a new [Issue](https://github.com/lukasborawski/vue-use-state-effect/issues). Thanks and Enjoy!

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

export const sharedComposable = useStateEffect(
  (...args) => {
    /* your composable logic here */
  },
  { ...config },
)
```

#### Interface

```typescript
type ComposableEffectValue = Ref | ComputedRef | Function
type ComposableEffect = Record<string, ComposableEffectValue>

export type Options<Addons = ComposableEffect> = Partial<{
  readonly destroyLabels: string[]
  readonly props: ExtractPropTypes<{ stateEffectDestroyLabel: string }>
  readonly addons: Addons
}>

function useStateEffect<
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
```

Please check the [example](#example) for some wider perspective.

### Configuration (API)

---

You can use some options to define your usage preferences.

### `name`

- **type:** `String | 'state'`

- **default**: `'state'`

- **description**: name (key) of composable state object that you'll be referring to inside your components, if not defined by default your state object will get `state` key, please note that it's not read automatically and that's because of application build mode functions name-spaces formatting

### `debug`

- **type**: `Boolean`

- **default**: `false`

- **description**: if set to `true` it will turn on the debug mode, you will be able to see the shared composable body / state

- **tip**: you can turn it on for the development mode
  ```json
  { debug: process.env.NODE_ENV === 'development' }
  ```

### `destroy`

- **type**: `Boolean` | `'custom'`

- **default**: `false`

- **description**: if set to `true` composable state will be destroyed after component `onBeforeUnmount` hook, if set to `custom` it will be waiting for custom setup (described below) and destroyed `onBeforeMount` hook

### Destroy Destination (Custom) ✨ `from 0.1.2`

---

You can decide where the state will be destroyed (re-initialized). You will achieve this by passing special property and corresponding label that will point place / component where it should be executed.

For this one you can pass inline options to the `useStateEffect` composable while invoking within the component - check the interface [here](#interface).

Suppose you have a `SharedStateComponent.vue` component that is reused throughout the application, and it displays shared data from the `useSharedState` composable. This data will always be updated and synchronized with the state, unless the property passed from the parent component does not match the custom label specified as `destroyLabels` (which can be multiple) in your composable invocation.

```vue
<!-- components/SharedStateComponent.vue  -->

<script setup lang="ts">
import { useSharedState } from '@composables/useSharedState'

const props = defineProps({
  stateEffectDestroyLabel: { type: String, default: 'Label' },
})

const {
  sharedState: { data },
} = useSharedState({ destroyLabels: ['CustomLabel'], props })
</script>
```

\*please check the [example](#example) for better context

And this is how you can use it along with the real component or page.

```vue
<!-- New Page | New.vue -->

<template>
  <shared-state-component state-effect-destroy-label="CustomLabel" />
</template>
```

So while this `New.vue` component will be initialized (just before mounting) the state that you've established in the `SharedStateComponent.vue` component will be destroyed (re-initialized).

> **WARNING**!
>
> Please don't try to destroy the state in the same component where you're updating (setting) the new data for it. It will be caught with the same lifecycle loop and destroyed after component termination. Finally, passed as empty.
>
> ![Diagram](https://share.getcloudapp.com/eDuXxk88/download/use-state-effect-destroy.svg)
>
> To destroy state just after component unmount event you can (and probably you should 😊) use [straight form](#destroy) of the destroy feature with `true` value.

Great! You can check it in action with the special Nuxt 3 [StackBlitz](https://stackblitz.com/edit/vue-use-state-effect-demo) demo.

### Extending ✨ `from 0.1.5`

---

There might be a need to extend the composable that you're sharing with `useStateEffect`. Maybe add some additional data that is coming from the other composable, or some global handler dedicated to the wider context. Since the `useStateEffect` works with one, and current instance of Vue component it's not possible to initialize one (composable) inside another. However, each shared composable is able to receive additional options (within `...args`) while initialization - check the interface [here](#interface).

Here's how you can do it.

```vue
<!-- components/SharedStateComponent.vue  -->

<script setup lang="ts">
import { useSharedState } from '@composables/useSharedState'

const {
  sharedState: { data },
} = useSharedState({ addons: { someRef } })
</script>
```

```typescript
/* composables/useSharedState.ts */

export const useSharedState = useStateEffect((...args) => {
  const [options] = args
  console.log(options.addons.someRef)

  /* rest of the composable logic */
})
```

Now. Typescript during the transpilation process will not be able to recognize what data you're passing to the composable, so it will not provide types here. However, you can help yourself by defining it. Here is how.

```typescript
/* composables/useSharedState.ts */

export const useSharedState = useStateEffect<{ someRef: Ref }>((...args) => {
  const [options] = args
  console.log(options.addons.someRef)

  /* rest of the composable logic */
})
```

One additional problem might arise with inferred types of composable `return`, as we've just defined some generic interface. To handle that you can add additional typings for your composable output. Do it like this.

```typescript
/* composables/useSharedState.ts */

export const useSharedState = useStateEffect<{ someRef: Ref }, { state: Ref }>((...args) => {
  const [options] = args
  console.log(options.addons.someRef)

  /* rest of the composable logic */

  return {
    state,
  }
})
```

This way you'll get full code recognition while using your composable within components. If you'll not define your addons interface composable `return` will be recognized automatically (inferred by the Typescript transpiler).

Finally, you can check it in action, and how it works within the demo inside the `demo` folder or in the special Nuxt 3 [StackBlitz](https://stackblitz.com/edit/vue-use-state-effect-demo) demo.

### Simple Example

---

Here you can find a simple usage example, that was also covered within the demo projects which you can discover in this repository (one for Vue and one for Nuxt). Check out the [Demo](#demo) section below for more details.

OK - first - let's create a local composable.

```typescript
/* composables/useSharedState.ts */

import { ref } from 'vue'

export const useSharedState = useStateEffect(
  (...args) => {
    const state = ref({
      test: '🚀 Initial state value.',
    })
    const updateState = () => {
      state.value = {
        test: '🌝 Updated state value.',
      }
    }
    return {
      state,
      updateState,
    }
  },
  {
    name: 'sharedState',
    debug: true,
    destroy: false,
  },
)
```

Here, a simple `ref` object is initialized with a `test` string. Additionally, there's the `updateState` method, designed to modify this state. It's essential to understand that the state is not exposed in any way, nor are any external or global state objects created; all logic is self-contained within the local composition function. This is then encapsulated by the `useStateEffect` handler and ultimately shared as an composable.

OK, great. Let's use it along with some page / component. Create one e.g. `home.vue`.

```vue
<!-- Home Page | Home.vue -->

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

Here, a new composable is used, accessing `state` data and an `updateState` method for modifying it. The parent object's name, `sharedState`, is specified in the configuration within the `composables/useSharedState.ts` file - check above. This allows new pages or components to access and utilize the saved or updated state in various contexts, as demonstrated. Simple.

Note the use of `<script setup>` notation, which is explained in [this article](https://itnext.io/vue-3-script-setup-afb42a53462a).

```vue
<!-- New Page | New.vue -->

<template>
  <div>{{ test }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useSharedState } from '@composables/useSharedState'

const {
  sharedState: { state },
} = useSharedState()

/* you can use watch here as well */
const test = ref(state.value.test) // '🌝 Updated state value.',
</script>
```

**Tip**: because of asynchronously created components (especially in Nuxt), if you want to destroy state after the component or page was unmounted - where this state was used - it's good to listen for the new one within the `onMounted` hook.

### Demo

---

Want to check and test it in action?

#### Check out the **Stackblitz** Nuxt 3 demo [here](https://stackblitz.com/edit/vue-use-state-effect-demo). 🚀

You can also try it out locally with the simple app (Nuxt 3) in the `demo` folder. You can fire it up manually or from the main folder of this repository, by using this command.

```bash
yarn demo
```

\*_using [yarn](https://yarnpkg.com) here, but you can still change it to npm_

---

**API Reference**: Check out the [types](/src/types.d.ts) for API definitions.

**Contribution**: Please add Pull Request or Issue to introduce some changes or fixes.

**Support**: Want to support? [Buy me a coffee](https://www.buymeacoffee.com/lukas.borawski) or [sponsor](https://github.com/sponsors/lukasborawski) me via GitHub.

<a href="https://www.buymeacoffee.com/lukas.borawski" target="__blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me a Coffee"></a>
