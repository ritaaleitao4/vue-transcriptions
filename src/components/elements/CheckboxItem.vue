<template>
  <div class="check-item">
    <input type="checkbox" :id="checkboxId">
    <label :for="checkboxId">
      <checked-svg/>
    </label>
  </div>
</template>
<script>
  import checkedSvg from '@/assets/images/check-mark.svg'

  export default {
    name: 'Checkbox-item',
    components: {
      checkedSvg,
    },
    props: {
      checkboxId: {
        required: true,
        type: Number,
      },
    },
  }
</script>

<style scoped lang="scss">
  input {
    display: none;

    &:checked + label {
      background-color: $color-checkbox;

      &::before {
        display: block;
      }

      svg {
        display: block;
      }
    }
  }

  .check-item {
    label {
      position: relative;
      width: 16px;
      height: 16px;
      border-radius: 2px;
      display: flex;
      box-sizing: border-box;
      border: 2px solid $color-checkbox;
      cursor: pointer;
      margin: 5px 16px 0 0;

      svg {
        display: none;
        width: 100%;
        position: relative;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
</style>
