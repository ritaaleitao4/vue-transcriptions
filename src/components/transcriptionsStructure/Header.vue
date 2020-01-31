<template>
  <header>
    <div class="header-content">
      <h1>Transcriptions</h1>
      <aside>
        <uploadSvg class="upload" @click="uploadData"/>
        <fetch-svg class="fetch" @click="fetchData"/>
      </aside>
    </div>
  </header>
</template>

<script>
  import uploadSvg from '@/assets/images/upload.svg'
  import fetchSvg from '@/assets/images/fetch-document.svg'

  export default {
    name: 'Header',
    components: {
      uploadSvg,
      fetchSvg,
    },
    methods: {
      uploadData() {
        this.$emit('uploadData')
      },
      fetchData() {
        this.$emit('fetchData')
      },
    },
  }
</script>

<style scoped lang="scss">
  header {
    background-color: #FFFFFF;
    width: 100%;
    height: $default-header-height;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.24), 0 1px 3px 0 rgba(0,0,0,0.12);
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    .header-content {
      width: 100%;
      max-width: $default-header-width;
      padding: 0 $default-padding;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;

      h1 {
        @include header-title;
      }

      svg {
        width: 24px;
        height: 24px;
        cursor: pointer;
        margin-left: $default-margin;
        display: inline-block;
      }
    }
  }
</style>
