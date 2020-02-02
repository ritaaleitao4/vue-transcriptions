<template>
  <div class="list-item">
    <checkbox-item :checkbox-id="item.id" class="checkbox"/>
    <person-svg class="person"/>
    <div class="list-item__container">
      <list-text v-model="item.voice" element="voice"/>
      <list-text v-model="item.text" element="text" type="textArea"/>
    </div>
    <delete-svg class="delete" @click="deleteData(item.id)"/>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import checkboxItem from '@/components/elements/CheckboxItem.vue'
  import listText from '@/components/elements/ListText.vue'
  import deleteSvg from '@/assets/images/delete.svg'
  import personSvg from '@/assets/images/person.svg'

  export default {
    name: 'Transcriptions-list-row',
    components: {
      checkboxItem,
      listText,
      deleteSvg,
      personSvg,
    },
    props: {
      item: {
        required: true,
        type: Object,
      },
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

    &:hover .delete {
      visibility: visible;
      opacity: 1;
    }

    &__container {
      width: 100%;
    }

    svg {
      display: block;

      &.person {
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
        cursor: pointer;
        visibility: hidden;
        opacity: 0;
        transition: opacity $default-time $default-easing;
      }
    }
  }
</style>
