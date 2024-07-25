<template>
  <ul class="grid grid-cols-[repeat(auto-fill,minmax(1.825rem,1fr))] border-l border-t rounded">
    <li
      :class="[
        'border-r border-b flex flex-col justify-center items-center cursor-pointer',
        itemClass
      ]"
      v-for="(i, index) in iconData"
      :key="index"
      @click="handleClick(`${collection}:${i}`, index)"
    >
      <component
        :is="Icon"
        :icon="`${collection}:${i}`"
        :class="[
          iconClass,
          { [activeClass]: modelValue ? modelValue === `${collection}:${i}` : choose === index }
        ]"
      ></component>
      <div class="text-sm mt-3" v-if="showText">{{ convertString(i) }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
// iconify -> element plus
import { loadIcons, Icon } from '@iconify/vue'
import data from './icon-ep.json'
import type { IconListType } from './types'

const modelValue = defineModel()

const props = withDefaults(defineProps<IconListType>(), {
  iconData: () => data,
  collection: 'ep',
  iconClass: 'text-3xl',
  itemClass: 'hover:bg-sky-100 w-1/8 py-4',
  activeClass: ''
})

const emits = defineEmits(['click'])
const choose = ref(-1)

onBeforeMount(async () => {
  props.iconData &&
    props.iconData.length &&
    (await loadIcons(props.iconData.map((o) => `${props.collection}:${o}`)))
})

function convertString(input: string): string {
  const words = input.split('-')
  const capitalizedWords = words.map((word, index) => {
    if (index === 0) {
      return capitalize(word)
    } else {
      return capitalize(word, true)
    }
  })
  return capitalizedWords.join('')
}

function capitalize(word: string, capitalizeFirstLetter = false): string {
  if (capitalizeFirstLetter) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  } else {
    return word.toLowerCase().replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase())
  }
}

async function handleClick(i: string, num: number) {
  choose.value = num
  modelValue.value = i
  emits('click', i)
}
</script>

<style scoped></style>