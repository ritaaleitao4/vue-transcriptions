<template>
  <transition name="fade">
    <div class="loading">
      <div class="loading--spinner" :class="infoColor"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'loading',
    props: {
      spinColor: {
        type: String,
        default: 'purple',
      },
    },
    computed: {
      infoColor() {
        return `loading--spinner--${this.spinColor}`
      },
    },
  }
</script>

<style scoped lang="scss">
  $color-list: (
    purple: $checkbox-color,
    gray: $header-title-color,
  );

  .loading {
    width: 100%;
    background-color: $color-bg;
    opacity: 0.7;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 20;
    display: flex;
    justify-content: center;
    align-items: center;
    $root: &;

    &--spinner {
      position: relative;
      box-sizing: border-box;
      width: 70px;
      height: 70px;
      text-indent: -9999em;
      border: 5px solid $color-white;
      border-radius: 50%;
      animation: load $default-time-loading infinite linear;


      @each $key, $val in $color-list {
        &--#{$key} {
          border-left-color: #{$val};
        }
      }
    }
  }

  @keyframes load {
    to { transform: rotate(360deg) }
  }


  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
