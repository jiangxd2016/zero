<template>
  <div class="navbar">
    <div class="left-side" :style="{ width: 200 + 'px' }">
      <a-space>
        <img alt="logo" src="../../assets/logo.svg" />
        <a-typography-title
          :style="{ margin: 0, fontSize: '18px' }"
          :heading="5"
        >
          Demo
        </a-typography-title>
      </a-space>
    </div>
    <div class="mid-side">
      <slot />
    </div>
    <ul class="right-side">
      <li>
        <a-tooltip :content="dark">
          <a-button
            class="nav-btn"
            type="outline"
            shape="circle"
            @click="toggleTheme"
          >
            <template #icon>
              <!-- <icon-moon-fill v-if="theme === 'dark'" />
              <icon-sun-fill v-else /> -->
            </template>
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-dropdown trigger="click">
          <a-avatar
            :size="32"
            :style="{ marginRight: '8px', cursor: 'pointer' }"
          >
            <img alt="avatar" src="http://lf1-xgcdn-tos.pstatp.com/obj/vcloud/vadmin/start.8e0e4855ee346a46ccff8ff3e24db27b.png" />
          </a-avatar>
          <span class="userName">userName</span>
          <template #content>
            <a-doption>
              <a-space @click="switchRoles">
                <icon-tag />
                <span>
                  {{ '切换角色' }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="$router.push({ name: 'user-center' })">
                <icon-user />
                <span>
                  {{ '用户中心' }}
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  {{ '登出登录' }}
                </span>
              </a-space>
            </a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Message } from '@arco-design/web-vue';
import { useDark, useToggle } from '@vueuse/core';

const isDark = useDark({
  selector: 'body',
  attribute: 'arco-theme',
  valueDark: 'dark',
  valueLight: 'light',
  storageKey: 'arco-theme',
  onChanged(dark: boolean) {

  },
});
const toggleTheme = useToggle(isDark);

const handleLogout = () => {
};
const switchRoles = async () => {
  Message.success(res as string);
};
</script>

<style lang="scss" scoped>
  .navbar {
    display: flex;
    height: 100%;
    background-color: var(--color-bg-2);
    border-bottom: 1px solid var(--color-border);
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .mid-side {
    flex: 1;
    width: 0;
  }

  .right-side {
    display: flex;
    padding: 0;
    list-style: none;
    :deep(.locale-select) {
      border-radius: 20px;
    }
    li {
      display: flex;
      align-items: center;
      padding: 0 10px;

      .userName {
        color: var(--color-text-1);
      }
    }

    a {
      color: var(--color-text-1);
      text-decoration: none;
    }
    .nav-btn {
      border-color: rgb(var(--gray-2));
      color: rgb(var(--gray-8));
      font-size: 16px;
    }
  }
  .message-popover {
    .arco-popover-content {
      margin-top: 0;
    }
  }
</style>
