<template>
  <div class="check-item">
    <input type="checkbox" :id="id">
    <label :for="id"></label>
  </div>
</template>

<script>
  export default {
    name: 'Checkbox',
    props: {
      id: {
        required: true,
        type: Number,
      },
    },
  }
</script>

<style scoped lang="scss">
  .check-item {
    input {
      display: none;

      &:checked + label {
        background-color: $checkbox-color;

        &::before {
          display: block;
        }
      }
    }

    label {
      width: 16px;
      height: 16px;
      border-radius: 2px;
      border: 2px solid $checkbox-color;
      flex-shrink: 0;
      cursor: pointer;
      position: relative;
      margin: 5px 16px 0 0;
      display: block;

      &::before {
        content: '';
        position: absolute;
        top: 2px;
        left: 1px;
        width: 11px;
        height: 8px;
        z-index: 1;
        background: url('~@/assets/images/check-mark.svg') center / cover no-repeat;
        display: none;
      }
    }
  }
</style>
