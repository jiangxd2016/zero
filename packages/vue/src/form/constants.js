import { Input, DatePicker, Select, RadioGroup, Switch, CheckboxGroup, InputNumber, InputTag, Textarea, TreeSelect, Upload } from '@arco-design/web-vue';

export const FORM_CONFIG = {

  CHECKBOX: {
    formChild: CheckboxGroup,
    value: [],
    props: ['options', 'disabled']
  },
  DATEPICKER: {
    formChild: DatePicker,
    value: '',
    props: ['formChild', 'disabled', 'format', 'placeholder']
  },

  INPUT: {
    formChild: Input,
    value: '',
    props: ['placeholder', 'disabled', 'allow-clear', 'max-length', 'readonly', 'input-attrs', 'show-word-limit']
  },

  INPUTNUMBER: {
    formChild: InputNumber,
    value: '',
    props: ['placeholder', 'disabled', 'precision', 'min', 'max', 'step', 'allow-clear']
  },
  INPUTTAG: {
    formChild: InputTag,
    value: [],
    props: ['placeholder', 'disabled', 'readonly', 'max-tag-count', 'allow-clear']
  },
  RADIO: {
    formChild: RadioGroup,
    value: '',
    props: ['options', 'formChild', 'disabled']
  },

  SELECT: {
    formChild: Select,
    value: '',
    props: ['options', 'loading', 'allow-clear', 'max-tag-count', 'limit', 'value-key', 'disabled']
  },
  SWITCH: {
    formChild: Switch,
    value: false,
    props: ['disabled', 'formChild']
  },
  TEXTAREA: {
    formChild: Textarea,
    value: '',
    props: ['placeholder', 'disabled', 'allow-clear', 'max-length', 'show-word-limit']
  },
  TREESELECT: {
    formChild: TreeSelect,
    value: false,
    props: ['options', 'disabled', 'allow-clear', 'max-tag-count', 'multiple', 'data', 'label-in-value']
  },
  UPLOAD: {
    formChild: Upload,
    value: '',
    props: ['disabled', 'accept', 'default-file-list', 'action', 'accept', 'headers', 'auto-upload', 'show-file-list', 'auto-upload', 'draggable']
  }
};

export const FORM_JSON_CONFIG = {
  NUMBER: 'INPUTNUMBER',
  STRING: 'INPUT',
  BOOLEAN: 'SWITCH',
  DATETIME: 'DATEPICKER',
  SELECTION: 'SELECT',
};
