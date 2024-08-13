<template>
  <el-row>
    支持所有Iconify sets：
    <el-link href="https://icon-sets.iconify.design/">Iconify</el-link>
  </el-row>
  <div>直接使用icon="{collection}:{name}"的方式进行使用</div>
  <span> icon: <Iconify :icon="iconRef" :style="style"></Iconify> </span>
  <p></p>
  <IconPicker @submit="handleSubmit"></IconPicker>
</template>

<script setup lang="ts">
import type { IconPickerSubmitDataProps } from '@/components/Icon/types';
import type { CSSProperties } from 'vue';

definePage({
  meta: {
    title: 'pages.pick-icon',
    icon: 'healthicons:i-exam-multiple-choice'
  }
});

const iconRef = ref('ep:qian');
const style = ref<CSSProperties>({});

const handleSubmit = (data: IconPickerSubmitDataProps) => {
  const { icon, fontSize, color } = data;
  iconRef.value = icon;
  style.value = {
    fontSize: `${fontSize}px`,
    color
  };
};
</script>

<style scoped></style>
