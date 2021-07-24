import { VTextField } from 'vuetify/lib';
import commonProps from './commonProps';

export default {
  extends: VTextField,

  props: {
    ...commonProps
  }
}
