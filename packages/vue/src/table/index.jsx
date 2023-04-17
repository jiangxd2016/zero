import { defineComponent, onMounted, ref, shallowRef } from 'vue';
import { Table } from '@arco-design/web-vue';

import '@arco-design/web-vue/dist/arco.css';

export const ZeroTable = defineComponent({
  name: 'ZeroTable',
  setup(_, { slots }) {

    const loading = ref(true);

    const filedList = ref([]);
    const dataList = ref([]);

    const columns = ref([]);
    const data = ref([]);
    const pagination = ref({});

    const tableSlots = shallowRef({});

    onMounted( () => {

      const model = import.meta.glob('../mock/*.json');

      Object.keys(model).forEach((key) => {

        model[key]().then((res) => {

          if (key.includes('table')) {

            dataList.value = res.default.list;
            console.log( dataList.value);

            pagination.value = {
              total: res.default.total,
              pageSize: res.default.size,
            };
          }
          if (key.includes('resp')) {

            filedList.value = res.default.fields;

            generateColumns();
            generateData();

            loading.value = false;
          }
        });
      }
      );

    });

    const generateColumns = () => {

      const slotKeys = Object.keys(slots);
      columns.value = filedList.value.map((item) => {

        if (slotKeys.includes(item.propName)) {

          tableSlots.value[item.propName] = (scope) => {
            return slots[item.propName](scope.record.organization);
          };
          return {
            title: item.name,
            slotName: item.propName,
          };
        } else {
          return {
            title: item.name,
            dataIndex: item.propName,
          };
        }

      });

      console.log( columns.value );

    };

    const generateData = () => {
      data.value = dataList.value.map((item) => {
        return {
          ...item,
        };
      });

    };

    return () => (
      <div class="">
        {dataList.value.length}
        {
          slots.organization({ name: 'test' })
        }
        <Table loading={loading.value} columns={columns.value} data={dataList.value } pagination={pagination.value} v-slots={tableSlots.value}>
        </Table>
      </div>
    );
  },
});
