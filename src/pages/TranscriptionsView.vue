<template>
  <div class="container">
    <Header @uploadData="handleDataUpload" @fetchData="handleDataFetch"></Header>
    <ErrorMessage :error-message="errorMessage"></ErrorMessage>
    <section>
      <TranscriptionsList :list-data="data"></TranscriptionsList>
    </section>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Header from '@/components/transcriptionsStructure/Header.vue'
  import TranscriptionsList from '@/components/transcriptionsStructure/TranscriptionsList.vue'
  import ErrorMessage from '@/components/elements/ErrorMessage.vue'

  export default {
    name: 'TranscriptionsView',
    components: {
      Header,
      TranscriptionsList,
      ErrorMessage,
    },
    computed: {
      ...mapGetters([
        'getInfoDataTranscriptions',
        'getInfoDataErrorMessage',
      ]),
      data() {
        return this.getInfoDataTranscriptions
      },
      errorMessage() {
        return this.getInfoDataErrorMessage
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
        this.actionGetTranscriptionsData()
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
