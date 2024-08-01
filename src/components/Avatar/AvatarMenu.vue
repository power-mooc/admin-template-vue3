<template>
  <el-dropdown v-bind="props" @command="handleCommand" :size="menuSize">
    <div class="flex items-center">
      <!-- 用户头像 -->
      <el-avatar
        :icon="icon"
        :size="size"
        :src="src"
        :alt="alt"
        :fit="fit"
        :src-set="srcSet"
        :shape="shape"
      >
        {{ username ? username[0].toUpperCase() : '' }}
      </el-avatar>
      <span class="ml-2" v-if="username">{{ username }}</span>
    </div>
    <!-- dropdown menu -->
    <template #dropdown>
      <el-dropdown-menu>
        <template v-for="(menu, index) in data" :key="index">
          <el-dropdown-item
            v-if="(typeof menu === 'object' && menu?.key ? menu.key : menu) !== 'divider'"
            :command="typeof menu === 'object' && menu?.key ? menu.key : menu"
            >{{ typeof menu === 'object' && menu?.value ? menu.value : menu }}</el-dropdown-item
          >
          <el-divider class="my-0!" v-else></el-divider>
        </template>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script lang="ts" setup>
import type { AvatarMenuProps } from './types';

const props = withDefaults(defineProps<Partial<AvatarMenuProps>>(), {
  trigger: 'click',
  username: '',
  // 与Menu的Size不冲突
  size: 'small'
});

const emits = defineEmits<{
  command: [arg: string | number | object];
}>();

const handleCommand = (command: string | number | object) => emits('command', command);

// method2
// import type { ExtractPropTypes } from 'vue'
// import { dropdownProps } from 'element-plus'

// type DropMenuProps = ExtractPropTypes<typeof dropdownProps>
// interface AvatarMenuProps extends /* @vue-ignore */ Partial<DropMenuProps> {}

// // methods2 withDefaults不生效
// const props = withDefaults(defineProps<AvatarMenuProps>(), {
//   trigger: 'click'
// })
</script>

<style scoped></style>
