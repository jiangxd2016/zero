import { defineComponent, onMounted, ref } from 'vue';
import { Table } from '@arco-design/web-vue';

const Props = {
  type: {
    type: String,
    default: '123',
  },
};

export default defineComponent({
  name: 'ZeroTable',
  props: Props,
  setup(props) {

    const loading = ref(true);

    const filedList = ref([]);
    const dataList = ref([]);

    onMounted(() => {

    });

    return () => (
      <div class="">
        {props.type}
        <Table loading={loading.value} >

        </Table>
      </div>
    );
  },
});
