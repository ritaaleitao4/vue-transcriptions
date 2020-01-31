<template>
  <header>
    <div class="header-content">
      <h1>Transcriptions</h1>
      <aside>
        <i class="upload" @click="uploadData"></i>
        <i class="fetch" @click="fetchData"></i>
      </aside>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'Header',
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
    height: $header-height;
    box-shadow: 0 1px 2px 0 rgba(0,0,0,0.24), 0 1px 3px 0 rgba(0,0,0,0.12);
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;

    .header-content {
      width: $header-width;
      padding: 0 $default-padding;
      display: flex;
      flex-flow: row nowrap;
      align-items: center;
      justify-content: space-between;

      h1 {
        @include header-title;
      }

      i {
        width: 24px;
        height: 24px;
        cursor: pointer;
        margin-left: $default-margin;
        display: inline-block;

        &.upload {
          background: url('~@/assets/images/upload.svg') center / cover no-repeat;
        }

        &.fetch {
          background: url('~@/assets/images/fetch-document.svg') center / cover no-repeat;
        }
      }
    }
  }
</style>
