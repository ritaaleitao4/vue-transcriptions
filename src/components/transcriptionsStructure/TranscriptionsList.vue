<template>
  <div class="list-content">
    <transition-group name="list-anim" tag="ul">
      <li v-for="item in listData" :key="item.id">
        <TranscriptionsListItem :item="item"></TranscriptionsListItem>
      </li>
    </transition-group>
    <add-row-svg class="list-content--add-row" @click="addNewData"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import TranscriptionsListItem from '@/components/transcriptionsStructure/TranscriptionsListItem.vue'
  import addRowSvg from '@/assets/images/add-row.svg'

  export default {
    name: 'TranscriptionsList',
    components: {
      TranscriptionsListItem,
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
        border-top: 1px solid $list-border-color;
        border-right: 1px solid $list-border-color;
        border-left: 1px solid $list-border-color;
        display: flex;
        &:last-child {
          border-bottom: 1px solid $list-border-color;
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
      transition: all $default-time $default-easing;
    }

    .list-anim-enter, .list-anim-leave-to {
      opacity: 0;
      margin-left: -100%;
    }
  }
</style>
