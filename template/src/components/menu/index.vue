<script lang="tsx">
import { defineComponent, ref, h, compile, computed } from 'vue';
import { useRouter, RouteRecordRaw } from 'vue-router';
import { useRouterStore } from "@/store/modules/router";
import { listenerRouteChange } from '@/utils/route-listener';

export default defineComponent({
  emit: ['collapse'],
  setup() {
    const menuStore = useRouterStore();
    const router = useRouter();
    const menuCollapse = ref(false);


    const menuTree = computed(() => {
      const copyRouter = JSON.parse(JSON.stringify(menuStore.getMenus));

      function travel(_routes: RouteRecordRaw[], layer: number) {
        if (!_routes) return null;
        const collector: any = _routes.map((element) => {

          element.meta = element;
          // leaf node
          if (!element.children) {
            return element;
          }
          // Associated child node
          const subItem = travel(element.children, layer);
          if (subItem.length) {
            element.children = subItem;
            return element;
          }
          // the else logic
          if (layer > 1) {
            element.children = subItem;
            return element;
          }
          return null;
        });
        return collector.filter(Boolean);
      }
      return travel(copyRouter, 0);
    });

    const selectedKey = ref<string[]>([]);
    const goto = (item: RouteRecordRaw) => {

      const actions = item.actions;

      (actions || []).forEach(item => {
        if (item.code === "view") {
          router.push({
            path: item.view.archFs
          });
        }
      })

    };
    listenerRouteChange((newRoute) => {
      const key = newRoute.name as string;
      selectedKey.value = [key];
    }, true);

    const renderSubMenu = () => {
      function loopMenu(_route: RouteRecordRaw[]) {
        return _route.map((element) => {

          const icon = element?.meta?.icon ? `<i class="i-carbon-3d-print-mesh"/>` : '';
          if (element.children) {
            return (
              <a-sub-menu
                key={element?.id}
                v-slots={{
                  icon: () => h(compile(icon)),
                  title: () => element.name,
                }}
              >
                {loopMenu(element.children ?? [])}
              </a-sub-menu>
            );
          }

          return (
            <a-menu-item
              key={element.id}
              onClick={() => goto(element)}
              v-slots={
                icon !== ''
                  ? {
                    icon: () => h(compile(icon)),
                    title: () => h(compile(element?.name || '')),
                  }
                  : {
                    title: () => h(compile(element?.name || '')),
                  }
              }
            >
              {element?.name || ''}
            </a-menu-item>
          );
        });
      }
      return loopMenu(menuTree.value);
    };

    return () => (
      <a-menu
        v-model:collapsed={menuCollapse.value}
        show-collapse-button
        auto-open={true}
        selected-keys={selectedKey.value}
        auto-open-selected={true}
        level-indent={34}
        theme="dark"
        class="flex-1"
        style="height: 100%"
          >
        {renderSubMenu()}
      </a-menu>
    );
  },
});
</script>

<style lang="scss" scoped>
:deep(.arco-menu-inner) {
  .arco-menu-inline-header {
    display: flex;
    align-items: center;
  }

  .arco-icon {
    &:not(.arco-icon-down) {
      font-size: 18px;
    }
  }
}
</style>
