import { defineComponent, onMounted, ref, shallowRef } from 'vue';
import { Table, Button, Space } from '@arco-design/web-vue';
import { ZeroForm } from '../form/index.jsx';
import { BTN_CONFIG, rowSelection } from './constants.js';
import '@arco-design/web-vue/dist/arco.css';
import { getFields, getList } from '../service/api';

import { useRouter, useRoute } from 'vue-router';

export const ZeroTable = defineComponent({
  name: 'ZeroTable',
  props: Table.props,
  setup(_, { slots }) {

    const loading = ref(true);

    const router = useRouter();
    const route = useRoute();

    const filedList = ref([]);
    const dataList = ref([]);

    const columns = ref([]);
    const data = ref([]);
    const pagination = ref({});

    const tableSlots = shallowRef({});

    const btns = ref([]);

    const selections = ref([]);
    const { actions, views } = route.meta;

    onMounted( async () => {

      const model = await getFields();
      const tableData = await getList();

      // fields

      filedList.value = model.data.fields;

      generateColumns();
      generateData();

      loading.value = false;

      /// data
      dataList.value = tableData.data.list;

      pagination.value = {
        total: tableData.data.total,
        pageSize: tableData.data.size,
      };

      btns.value = tableData.data.btns?.map((b)=>{
        return BTN_CONFIG[b];
      });

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

    const handleBtnClick = () => {
      const type = 'edit';
      console.log(views);
      const item = views.find(a => a.code === type);
      console.log(item);
      // TODO: need support dialog
      router.push(
        { path: item.view.archFs, query: { type: 'form', model: 'test', } }
      );
    };
    return () => (
      <div class="">
        {
            <ZeroForm layout="inline" />
        }
        <Space style={{ width: '100%' }} class="mb-2">

    {
      btns.value?.map((item) => {
        return (
          <Button type={item.type} status={item.status} onClick={handleBtnClick}>
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
