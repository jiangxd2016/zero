<template>
  <div class="h-full flex py-2 justify-end border-b-#ccc dark:bg-dark box-border bg-#ccc">
    <ul class="right-side">
      <li v-for="(item, index) in alarmNumList" :key="index" class="no-item" @click="showCurrent(item.key)">
        <a-tooltip :content="item.value" position="bottom" :offset="-10">
          <span class="flex-center">
            <i :class="item.icon" text-xl />
            <span class="ml-sm font-500">{{ item.num > 99 ? '99+' : item.num }}</span>
          </span>
        </a-tooltip>
      </li>
      <div flex-center ml-md mr-base>
        <a-tooltip position="bottom" :offset="-10">
          <button class="icon-btn !outline-none" @click="changeDark()">
            <i class="text-xl i-carbon-sun dark:i-carbon-moon" />
          </button>
        </a-tooltip>
      </div>
      <li>
        <a-dropdown trigger="click">
          <div flex-center>
            <a-avatar :size="40" class="bg-white!">
              <span class="i-custom:avater h-36px w-36px" />
            </a-avatar>
            <div pl-xs>{{ "username" }}</div>
            <icon-down pl-xs size="18" />
          </div>
          <template #content>
            <a-doption>
              <a-space @click="lintToDocs">
                <icon-book />
                <span>
                  <a href="https://argus.zmops.cn/docs/" target="_blank">
                    文档
                  </a>
                </span>
              </a-space>
            </a-doption>
            <a-doption>
              <a-space @click="handleLogout">
                <icon-export />
                <span>
                  退出
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
import { ref } from 'vue';
import { useUserStore } from '@/store';

const userStore = useUserStore();
const router = useRouter();

const alarmNumList = ref([
  {
    key: 2,
    value: '紧急',
    num: 0,
    icon: 'i-custom:alarm'
  },
  {
    key: 1,
    value: '严重',
    num: 0,
    icon: 'i-custom:ordinary'
  },
  {
    key: 0,
    value: '一般',
    num: 0,
    icon: 'i-custom:prompt'
  }
]);

const handleLogout = () => {
  userStore.logout();

  router.push({
    path: '/login'
  });
};

const changeDark = () => {

  const mode = toggleDark();
  document.body.setAttribute('arco-theme', mode ? 'dark' : 'light');

};

const lintToDocs = () => {
  window.open('https://argus.zmops.cn/');
};

const showCurrent = (id: string | number) => {
  router.push('/warn/warnInfo?type=' + id);
};

onMounted(() => {
});
</script>

<style scoped lang="scss">
.user-avatar {
  cursor: pointer;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  display: inline-block;
  vertical-align: middle;
}

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

.center-side {
  flex: 1;
}

.right-side {
  display: flex;
  padding-right: 20px;
  list-style: none;

  :deep(.locale-select) {
    border-radius: 20px;
  }

  li {
    display: flex;
    align-items: center;
    padding: 0 10px;
  }

  a {
    color: var(--color-text-1);
    text-decoration: none;
  }

  .nav-btn {
    border: none;
    color: rgb(var(--gray-8));
    font-size: 16px;
  }

  .trigger-btn,
  .ref-btn {
    position: absolute;
    bottom: 14px;
  }

  .trigger-btn {
    margin-left: 14px;
    position: absolute;
    bottom: 14px;
  }
}
</style>

<style lang="scss">
.message-popover {
  .arco-popover-content {
    margin-top: 0;
  }
}
</style>
