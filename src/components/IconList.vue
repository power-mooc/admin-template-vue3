<!-- iconfont组件使用方法 -->
<template>
  <div class="mb-2 flex justify-end items-center w-full">
    <div class="mr-4">
      <el-checkbox v-model="copyIconComponentFlag" label="复制Icon组件" size="large" />
    </div>
    <div class="mr-4">
      <el-switch v-model="copyTypeFlag" active-text="复制Icon名称" inactive-text="复制SVG图标" />
    </div>
    <div class="mr-4">
      <el-switch v-model="showTextFlag" active-text="显示文字" inactive-text="隐藏文字" />
    </div>
  </div>
  <ul class="flex flex-wrap border rounded">
    <li
      class="w-1/8 py-4 border-r border-b flex flex-col justify-center items-center cursor-pointer hover:bg-sky-100"
      v-for="(i, index) in iconData"
      :key="index"
      @click="handleClick(i)"
    >
      <component :is="Icon" :icon="'ep:' + i" class="text-3xl"></component>
      <div class="text-sm mt-3" v-if="showTextFlag">{{ convertString(i) }}</div>
    </li>
  </ul>
</template>

<script setup lang="ts">
// iconify -> element plus
import { loadIcons, Icon, loadIcon } from '@iconify/vue'
import iconData from './icon-ep.json'

// 复制Icon名称开关
const copyTypeFlag = ref(true)
// 显示名字开关
const showTextFlag = ref(true)
// 复制Icon组件开关
const copyIconComponentFlag = ref(false)

const source = ref('')
const { copy, copied } = useClipboard({ source })

onBeforeMount(async () => {
  // 加载图标
  await loadIcons(iconData)
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

function objectToSvg(svgObject: any) {
  const { body, hFlip, height, left, rotate, top, vFlip, width } = svgObject
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" transform="translate(${left},${top}) rotate(${rotate})${
    hFlip ? ' scale(-1, 1)' : ''
  }${vFlip ? ' scale(1, -1)' : ''}">
          ${body}
      </svg>`
  return svgString
}

async function handleClick(i: string) {
  if (copyIconComponentFlag.value) {
    source.value = `<div class="i-ep:${i}"></div>`
  } else if (!copyTypeFlag.value) {
    const res = await loadIcon('ep:' + i)
    source.value = objectToSvg(res)
  } else {
    source.value = convertString(i)
  }
  copy()
  copied &&
    ElMessage({
      message: '复制成功',
      type: 'success'
    })
}
</script>

<style scoped></style>
