<template>
  <div class="container">
    <Header @uploadData="handleDataUpload" @fetchData="handleDataFetch"/>
    <loading v-if="showLoading" spinColor="purple"/>
    <toast-message :error-message="errorMessage" :success-message="successMessage"/>
    <section>
      <transcriptions-list :list-data="data"/>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Header from '@/components/transcriptionsStructure/Header.vue'
  import TranscriptionsList from '@/components/transcriptionsStructure/TranscriptionsList.vue'
  import toastMessage from '@/components/elements/toastMessage.vue'
  import Loading from '@/components/elements/Loading.vue'

  export default {
    name: 'Transcriptions',
    components: {
      Header,
      TranscriptionsList,
      toastMessage,
      Loading,
    },
    data() {
      return {
        showLoading: false,
      }
    },
    computed: {
      ...mapGetters([
        'getInfoDataTranscriptions',
        'getInfoDataErrorMessage',
        'getInfoDataSuccessMessage',
      ]),
      data() {
        return this.getInfoDataTranscriptions
      },
      errorMessage() {
        return this.getInfoDataErrorMessage
      },
      successMessage() {
        return this.getInfoDataSuccessMessage
      },
    },
    methods: {
      ...mapActions([
        'uploadTranscriptionsData',
        'actionGetTranscriptionsData',
      ]),
      handleDataUpload() {
        this.uploadTranscriptionsData(this.getInfoDataTranscriptions)
      },
      handleDataFetch() {
        this.showLoading = true
        this.actionGetTranscriptionsData().then(() => {
          this.showLoading = false
        })
      },
    },
  }
</script>

<style scoped lang="scss">
  .container {
    width: 100%;
    min-height: 100vh;
    overflow: hidden;
    position: relative;
    background-color: $color-bg;

    section {
      width: 100%;
      max-width: $content-width;
      margin: $default-margin auto;
    }
  }
</style>
