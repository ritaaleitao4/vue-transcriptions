<template>
  <transition name="fade">
    <div class="toast" v-if="errorMessage || successMessage" >
      <section class="toast-message" :class="infoMessage">
        <button aria-pressed="false"
                role="button"
                class="toast-message--dismiss"
                @click="dismissToast()">
          x
        </button>
        <h3 class="toast-message--title">
          {{ errorMessage ? 'Error' : 'Success' }}
        </h3>
        <p class="toast-message--description">
          {{ errorMessage || successMessage }}
        </p>
      </section>
    </div>
  </transition>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'ToastMessage',
    props: {
      errorMessage: String,
      successMessage: String,
    },
    computed: {
      infoMessage() {
        if (this.successMessage) {
          return 'toast-message--green'
        }
        return 'toast-message--red'
      },
    },
    methods: {
      ...mapActions([
        'removeTranscriptionMessages',
      ]),
      dismissToast() {
        this.removeTranscriptionMessages()
      },
    },
  }
</script>

<style scoped lang="scss">
  $color-list: (
    red: $color-error,
    green: $color-success,
  );

  .toast {
    position: absolute;
    right: 11px;
    top: 82px;
    z-index: 10;
    font-family: $font-m-medium;

    &-message {
      width: 200px;
      padding: 10px;
      border-radius: 5px;
      position: relative;
      font-size: 13px;
      color: $color-white;

      @each $key, $val in $color-list {
        &--#{$key} {
          background-color: #{$val};
        }
      }

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
