import { VTextarea } from 'vuetify/lib';
import commonProps from './commonProps';

export default {
  extends: VTextarea,

  props: {
    ...commonProps
  }
}
