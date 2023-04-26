import { ref } from 'vue';
import type { ShallowRef, Ref } from 'vue';

import { noop } from '@estjs/tools';

import type { FormInstance } from '@arco-design/web-vue';
import { bus, logger } from '../shared';
import {
  CHANGE,
  BLUR,
  FOCUS,
  KEY_PRESS
} from './const';

class form {

  id = null;

  value: Ref<{}> = ref({});

  formRef: ShallowRef<FormInstance | null> = ref(null);

  onChange: (values: {}) => void = () => { };
  onBlur: (values: {}) => void = () => { };
  onKeyPress: (values: {}) => void = () => { };
  onFocus: (values: {}) => void = () => { };

  constructor(options = {}) {
    const { values, onChange, onBlur, onKeyPress, onFocus, id, formRef } = options as any;

    // id
    this.id = id || `__form__${Math.random().toString(36).slice(2) + Date.now()}`;

    this.value.value = values || {};

    // 暂时只支持vue ref形式验证数据
    this.formRef = formRef;

    if (!this.formRef.value) {
      logger.error('formRef is null');
    }

    this.onChange = onChange || noop;
    this.onBlur = onBlur || noop;
    this.onKeyPress = onKeyPress || noop;
    this.onFocus = onFocus || noop;

    bus.on(CHANGE, this.onChange);
    bus.on(BLUR, this.onBlur);
    bus.on(KEY_PRESS, this.onKeyPress);
    bus.on(FOCUS, this.onFocus);

  }

  setValues(values: Record<string, any>) {
    this.value.value = values;
  }

  submit() {
    this.formRef.value?.validate().then((valid) => {
      if (valid) {
        console.warn('submit error!');
        return false;
      }
      console.log('submit start');

    });
  }

  destroyed() {

  }
}

export default form;
