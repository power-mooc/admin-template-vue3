<template>
  <el-switch
    style="--el-switch-on-color: #333"
    v-model="isDark"
    :active-action-icon="Moon"
    :inactive-action-icon="Sun"
  />
</template>

<script setup lang="tsx">
// document.documentElement.requestFullscreen();

const props = defineProps({
  dark: Boolean
});
const Moon = () => <i class="i-prime:moon"></i>;
const Sun = () => <i class="i-octicon:sun-24"></i>;

const isDark = ref(props.dark);
const preferredDark = usePreferredDark();

const toggleMode = (flag: boolean) => {
  if (flag) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};
watch([isDark], () => {
  toggleMode(isDark.value);
});

// 跟随系统
watch([preferredDark], () => {
  nextTick(() => {
    toggleMode(preferredDark.value);
    isDark.value = preferredDark.value;
  });
});
</script>

<style scoped></style>
