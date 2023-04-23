import { defineComponent, onMounted, ref } from 'vue';
import { FORM_CONFIG, FORM_JSON_CONFIG } from './constants';
import '@arco-design/web-vue/dist/arco.css';

import { useRouter, useRoute } from 'vue-router';
import { Form, FormItem } from '@arco-design/web-vue';
import { getFields, getList } from '../service/api';

export const ZeroForm = defineComponent({
  name: 'ZeroForm',
  props: {
    name: String
  },
  setup(props, { attrs, slots }) {

    const formFields = ref([]);

    const compts = ref([]);

    onMounted(async () => {
      const model = await getFields();
      const tableData = await getList();
      formFields.value = model.data.fields;
      generateForm();

    });

    const generateForm = () => {

      formFields.value.forEach((field) => {
        const { required, id, name, propName, type, rules } = field;

        const compName = FORM_JSON_CONFIG[type];
        const comp = FORM_CONFIG[compName];
        if (!comp) { return; }

        const { formChild, value, props } = comp;

        const compProps = {};
        if (props) {
          props.forEach((prop)=>{
            compProps[prop] = field[prop];
          });
        }

        compts.value.push({
          required,
          key: id,
          field: propName,
          label: name,
          rules,
          children: [
            {
              compts: formChild,
              modelValue: value,
              ...compProps
            }
          ]
        });
      });
    };

    return () => (
  <Form {...attrs}>
    {compts.value.map((comt) => {

      return (
        <FormItem {...comt}>
          {comt.children.map((child) => {
            return (
              <child.compts {...child} />
            );
          })}
        </FormItem>
      );
    })
    }
  </Form>
    );

  }
});
