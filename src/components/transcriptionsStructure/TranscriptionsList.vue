<template>
  <div class="list-content">
    <transition-group name="list-anim" tag="ul">
      <li v-for="item in listData" :key="item.id">
        <transcriptions-list-row :item="item"/>
      </li>
    </transition-group>
    <add-row-svg class="list-content--add-row" @click="addNewData"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import transcriptionsListRow from '@/components/transcriptionsStructure/TranscriptionsListRow.vue'
  import addRowSvg from '@/assets/images/add-row.svg'

  export default {
    name: 'Transcriptions-list',
    components: {
      transcriptionsListRow,
      addRowSvg,
    },
    props: {
      listData: {
        required: true,
        type: Array,
      },
    },
    methods: {
      ...mapActions([
        'addNewTranscription',
      ]),
      addNewData() {
        this.addNewTranscription()
      },
    },
  }
</script>

<style scoped lang="scss">
  .list-content {
    overflow: hidden;

    ul {
      list-style: none;
      margin: 0 0 $default-margin 0;
      padding: 0 $default-padding;

      li {
        position: relative;
        margin: 0;
        background-color: #FFFFFF;
        border-top: 1px solid $color-list-border;
        border-right: 1px solid $color-list-border;
        border-left: 1px solid $color-list-border;
        display: flex;
        &:last-child {
          border-bottom: 1px solid $color-list-border;
        }
      }
    }

    &--add-row {
      width: 32px;
      height: 32px;
      margin: 0 auto $default-margin auto;
      display: block;
      cursor: pointer;
    }

    .list-anim-enter-active, .list-anim-leave-active {
      transition: all $default-time ease-in-out;
    }

    .list-anim-enter, .list-anim-leave-to {
      opacity: 0;
      margin-left: -100%;
    }
  }
</style>
