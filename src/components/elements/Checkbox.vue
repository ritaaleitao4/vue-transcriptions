<template>
  <div class="check-item">
    <input type="checkbox" :id="id">
    <label :for="id">
      <checked-svg/>
    </label>
  </div>
</template>
<script>
  import checkedSvg from '@/assets/images/check-mark.svg'

  export default {
    name: 'Checkbox',
    components: {
      checkedSvg,
    },
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
      position: relative;
      width: 16px;
      height: 16px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid $checkbox-color;
      cursor: pointer;
      margin: 5px 16px 0 0;
    }
  }
</style>
