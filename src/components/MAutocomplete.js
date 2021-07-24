import { VAutocomplete } from 'vuetify/lib';
import commonProps from './commonProps';

export default {
  extends: VAutocomplete,

  props: {
    ...commonProps
  }
}
