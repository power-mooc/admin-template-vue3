<template>
  <!-- tabs -->
  <el-tabs v-model="activeName" :class="wrapClass" :style="wrapStyle" @tab-click="handleTabClick">
    <el-tab-pane :label="tab.title" :name="tab.title" v-for="(tab, index) in lists" :key="index">
      <!-- tabs-content -->
      <ul v-if="tab.contents && tab.contents.length">
        <li
          v-for="(item, iIndex) in tab.contents"
          :key="iIndex"
          class="cursor-pointer hover:bg-sky-100 py-2"
        >
          <el-row justify="center" align="middle">
            <el-col
              :span="4"
              align="middle"
              @click="() => handleClickAvatar(item.avatar!)"
              v-if="item.avatar"
            >
              <!-- 头像 -->
              <el-avatar v-bind="Object.assign({ size: 'small' }, item.avatar)" />
            </el-col>
            <el-col :span="20" class="px-3" @click="() => handleClickItem(item)">
              <!-- 消息 -->
              <el-row align="middle" class="flex-nowrap! mb-2">
                <!-- 消息标题 -->
                <div class="text-base line-clamp-1">
                  {{ item.title }}
                </div>
                <!-- 标签 -->
                <el-tag v-if="item.tag" class="ml-2" effect="dark" v-bind="item.tagProps">{{
                  item.tag
                }}</el-tag>
              </el-row>
              <el-row v-if="item.content">
                <!-- 消息内容 -->
                <div class="text-sm text-gray-400 mb-2 line-clamp-2">
                  {{ item.content }}
                </div>
              </el-row>
              <el-row v-if="item.time">
                <!-- 消息时间 -->
                <div class="text-sm text-gray-400">{{ item.time }}</div>
              </el-row>
            </el-col>
          </el-row>
        </li>
      </ul>
    </el-tab-pane>
  </el-tabs>
  <!-- buttons -->
  <div class="flex w-full justify-around border-t">
    <div
      class="flex-1 py-3 border-r flex items-center justify-center hover:bg-sky-100 cursor-pointer text-gray-500"
      v-for="(action, index) in actions"
      @click="action.click"
      :key="index"
    >
      <Iconify
        v-if="action.icon"
        :icon="action.icon"
        :color="action.color"
        :style="action.style"
      ></Iconify>
      <span class="ml-2">{{ action.title }}</span>
    </div>
  </div>
</template>

<script setup lang="tsx">
import type { AvatarProps, TabsPaneContext } from 'element-plus';

import Iconify from '../Icon/Iconfiy.vue';
import type { NoticeMessageListProps, MessageListItem } from './types';

const props = defineProps<NoticeMessageListProps>();

const activeName = ref(props?.lists[0].title || '');

// 事件传递
const emits = defineEmits<{
  clickAvatar: [avatar: AvatarProps];
  clickItem: [item: MessageListItem];
  clickTab: [tab: TabsPaneContext, event: Event];
}>();

const handleClickAvatar = (avatar: AvatarProps) => {
  emits('clickAvatar', avatar);
};
const handleClickItem = (item: MessageListItem) => {
  emits('clickItem', item);
};

const handleTabClick = (tab: TabsPaneContext, event: Event) => {
  emits('clickTab', tab, event);
};
</script>

<style scoped lang="scss">
:deep(.el-tabs__nav-scroll) {
  @apply pl-4;
}
:deep(.el-tabs__header) {
  @apply m-0;
}
:deep(.el-tabs__content) {
  @apply my-2;
}
</style>
