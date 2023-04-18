import { defineComponent, onMounted, ref, shallowRef } from 'vue';
import { Table, Button, Space } from '@arco-design/web-vue';
import { ZeroForm } from '../form/index.jsx';
import { BTN_CONFIG, rowSelection } from './constants.js';
import '@arco-design/web-vue/dist/arco.css';

export const ZeroTable = defineComponent({
  name: 'ZeroTable',
  props: Table.props,
  setup(_, { slots }) {

    const loading = ref(true);

    const filedList = ref([]);
    const dataList = ref([]);

    const columns = ref([]);
    const data = ref([]);
    const pagination = ref({});

    const tableSlots = shallowRef({});

    const btns = ref([]);

    const selections = ref([]);

    onMounted( () => {

      const model = import.meta.glob('../mock/*.json');

      Object.keys(model).forEach((key) => {

        model[key]().then((res) => {

          if (key.includes('table')) {

            dataList.value = res.default.list;

            pagination.value = {
              total: res.default.total,
              pageSize: res.default.size,
            };
          }

          btns.value = res.default.btns?.map((b)=>{
            return BTN_CONFIG[b];
          });
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
    };

    const generateData = () => {
      data.value = dataList.value.map((item) => {
        return {
          ...item,
        };
      });

    };

    const handleSelectionChange = (selection) => {
      selections.value = selection;
    };

    return () => (
      <div class="">
        {
            <ZeroForm v-else layout="inline" />
        }
        <Space style={{ width: '100%' }} class="mb-2">

    {
      btns.value?.map((item) => {
        return (
          <Button type={item.type} status={item.status}>
            {item.text}
          </Button>
        );
      }
      )
    }
        </Space>

        <Table loading={loading.value} row-key="id" row-selection={rowSelection} columns={columns.value} data={dataList.value } onSelectionChange={handleSelectionChange} pagination={pagination.value} v-slots={tableSlots.value}>
        </Table>
      </div>
    );
  },
});
