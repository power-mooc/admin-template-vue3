<template>
  <el-badge
    :value="value"
    :style="{
      '--bg-color': color || 'var(--el-color-danger)',
      '--font-size': size + 'px' || 'var(--el-badge-size)',
      '--translate-x': (transformData?.translateX || 100) + '%',
      '--scale': transformData.scale
    }"
  >
    <slot>
      <Icon
        icon="ep:bell"
        :style="{ color: iconColor ?? '#333', fontSize: iconSize ? `${iconSize}px` : '18px' }"
        >comments</Icon
      >
    </slot>
  </el-badge>
</template>

<script setup lang="ts">
import type { IconifyIcon } from '@iconify/vue';
import Icon from '../Icon/Iconify.vue';
import type { BadgeProps } from 'element-plus';

interface NotificationProps extends Partial<BadgeProps> {
  icon?: string | IconifyIcon;
  iconSize?: number;
  iconColor?: string;
  size?: number;
  scale?: number;
  color?: string;
}
const props = withDefaults(defineProps<NotificationProps>(), {
  icon: 'ep:bell',
  size: 12,
  scale: 1,
  color: ''
});
// translateX -> scale
function calculateTransform(scale: number) {
  // 定义scale和translateX的范围
  const minScale = 0.4;
  const maxScale = 1;
  const minTranslateX = 75; // 单位：%
  const maxTranslateX = 100; // 单位：%

  // 计算translateX的值
  const translateX =
    minTranslateX + (maxTranslateX - minTranslateX) * ((scale - minScale) / (maxScale - minScale));

  // 返回完整的transform属性值
  return {
    translateX,
    scale
  };
}

const transformData = computed(() => calculateTransform(props.scale));
</script>

<style lang="scss" scoped>
$color: var(--bg-color);
$size: var(--font-size);
$translate-x: var(--translate-x);
$scale: var(--scale);

:deep(.el-badge__content) {
  background-color: $color;
  font-size: $size;
  transform: translateY(-50%) translateX($translate-x) scale($scale);
}
</style>
