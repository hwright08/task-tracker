export default {
  required: val => {
    const errorText = 'This field is required';
    if (!val) return errorText;
    if (Array.isArray(val)) return errorText;
    return !!val || errorText;
  }
};
