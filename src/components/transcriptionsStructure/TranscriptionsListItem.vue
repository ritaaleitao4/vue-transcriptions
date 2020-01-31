<template>
  <div class="list-item">
    <Checkbox :id="item.id" class="checkbox"></Checkbox>
    <i class="person"></i>
    <div class="list-item__container">
      <EditableText v-model="item.voice" :custom-class="'voice'"></EditableText>
      <EditableText v-model="item.text" :custom-class="'text'" :type="'multiline'"></EditableText>
    </div>
    <i class="delete" @click="deleteData(item.id)"></i>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import Checkbox from '@/components/elements/Checkbox.vue'
  import EditableText from '@/components/elements/EditableText.vue'

  export default {
    name: 'TranscriptionsListItem',
    props: {
      item: {
        required: true,
        type: Object,
      },
    },
    components: {
      Checkbox,
      EditableText,
    },
    methods: {
      ...mapActions([
        'deleteTranscription',
      ]),
      deleteData(id) {
        this.deleteTranscription(id)
      },
    },
  }
</script>

<style scoped lang="scss">
  .list-item {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    padding: $default-padding 53px $default-padding $default-padding;

    &:hover i.list-item__delete {
      visibility: visible;
      opacity: 1;
    }

    &__container {
      width: 100%;
    }

    i {
      display: block;

      &.person {
        background: url('~@/assets/images/person.svg') center / cover no-repeat;
        width: 26px;
        height: 26px;
        margin-right: 8px;
        flex-shrink: 0;
      }

      &.delete {
        position: absolute;
        top: $default-margin;
        right: $default-margin;
        width: 16px;
        height: 20px;
        background: url('~@/assets/images/delete.svg') center / cover no-repeat;
        cursor: pointer;
        visibility: hidden;
        opacity: 0;
        transition: opacity $default-time $default-easing;
      }
    }
  }
</style>
