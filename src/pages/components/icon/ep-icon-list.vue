<!-- 所有的Element-plus的Icon，类似于elementplus的icon列表 -->
<template>
  <div class="mb-2 flex justify-end items-center w-full">
    <div class="mr-4">
      <el-checkbox
        v-model="copyIconComponentFlag"
        :label="$t('components.copy-icon')"
        size="large"
      />
    </div>
    <div class="mr-4">
      <el-switch
        v-model="copyTypeFlag"
        :active-text="$t('components.copy-icon-name')"
        :inactive-text="$t('components.copy-svg')"
      />
    </div>
    <div class="mr-4">
      <el-switch
        v-model="showTextFlag"
        :active-text="$t('components.show-text')"
        :inactive-text="$t('components.hide-text')"
      />
    </div>
  </div>
  <IconList :show-text="showTextFlag" @click="handleClick"></IconList>
</template>
<script setup lang="ts">
// iconify -> element plus
import { loadIcon } from '@iconify/vue';
import { ElMessage } from 'element-plus';
import { useI18n } from 'vue-i18n';
// import { i18n } from '@/modules/i18n'

definePage({
  meta: {
    title: 'components.icon-lists',
    icon: 'mdi:bookmark-multiple'
  }
});

const { t } = useI18n();

// false - CopySvgData
// true - CopyName
const copyTypeFlag = ref(true);
const showTextFlag = ref(true);
const copyIconComponentFlag = ref(false);

const source = ref('');
const { copy, copied } = useClipboard({ source });

function convertString(input: string): string {
  const words = input.split('-');
  const capitalizedWords = words.map((word, index) => {
    if (index === 0) {
      return capitalize(word);
    } else {
      return capitalize(word, true);
    }
  });
  return capitalizedWords.join('');
}

function capitalize(word: string, capitalizeFirstLetter = false): string {
  if (capitalizeFirstLetter) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  } else {
    return word.toLowerCase().replace(/(?:^|-)(\w)/g, (_, c) => c.toUpperCase());
  }
}

function objectToSvg(svgObject: any) {
  const { body, hFlip, height, left, rotate, top, vFlip, width } = svgObject;
  const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" transform="translate(${left},${top}) rotate(${rotate})${
    hFlip ? ' scale(-1, 1)' : ''
  }${vFlip ? ' scale(1, -1)' : ''}">
        ${body}
    </svg>`;
  return svgString;
}

async function handleClick(i: string) {
  if (copyIconComponentFlag.value) {
    source.value = `<div class="i-ep:${i}"></div>`;
  } else if (!copyTypeFlag.value) {
    const res = await loadIcon('ep:' + i);
    source.value = objectToSvg(res);
  } else {
    source.value = convertString(i);
  }
  copy();
  copied &&
    ElMessage({
      message: t('message.copy-success'),
      type: 'success'
    });
}
</script>

<style scoped></style>
