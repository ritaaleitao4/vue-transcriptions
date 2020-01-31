<template>
  <transition name="fade">
    <div class="toast" v-if="errorMessage">
      <section class="toast-error">
        <button aria-pressed="false"
                role="button"
                class="toast-error--dismiss"
                @click="dismissToast()">
          X
        </button>
        <h3 class="toast-error--title">
          Error
        </h3>
        <p class="toast-error--description">
          {{ errorMessage }}
        </p>
      </section>
    </div>
  </transition>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'ErrorMessage',
    props: {
      errorMessage: String,
    },
    methods: {
      ...mapActions([
        'removeTranscriptionError',
      ]),
      dismissToast() {
        this.removeTranscriptionError()
      },
    },
  }
</script>

<style scoped lang="scss">
  .toast {
    position: absolute;
    right: 11px;
    top: 82px;
    z-index: 10;
    font-family: $ff-m-medium;

    &-error {
      width: 200px;
      padding: 10px;
      background-color: $color-error;
      border-radius: 5px;
      position: relative;
      font-size: 13px;
      color: $color-white;

      &--dismiss {
        position: absolute;
        right: 7px;
        font-weight: bold;
        font-size: 16px;
        color: $color-white;
        line-height: 0.7;
      }

      &--title {
        font-weight: bold;
        padding-bottom: 8px;
      }
    }
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
