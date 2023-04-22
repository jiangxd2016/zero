import { defineComponent, onMounted, ref } from 'vue';
import { FORM_CONFIG, FORM_JSON_CONFIG } from './constants';
import '@arco-design/web-vue/dist/arco.css';

import { Form, FormItem } from '@arco-design/web-vue';

export const ZeroForm = defineComponent({
  name: 'ZeroForm',
  setup(props, { attrs, slots }) {

    const formFields = ref([]);

    const compts = ref([]);

    onMounted(() => {

      const model = import.meta.glob('../mock/resp.json');

      Object.keys(model).forEach((key) => {
        model[key]().then((res) => {
          formFields.value = res.default.fields;
          generateForm();
        });
      });
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
