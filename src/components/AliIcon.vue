<template>
  <svg xmlns="http://www.w3.org/2000/svg"
       :width="width"
       :height="height"
       viewBox="0 0 1024 1024"
       :aria-labelledby="iconName"
       :style="{fill:iconColor}"
  >
    <title :id="iconName" lang="en">{{iconName}}</title>
    <slot />
  </svg>


</template>

<script lang="ts">
  import {defineComponent} from "vue";
  export default defineComponent({
    props: {
      iconName: {
        type: String,
        default: 'box'
      },
      width: {
        type: [Number, String],
        default: 18
      },
      height: {
        type: [Number, String],
        default: 18
      },
      iconColor: {
        type: String,
        default: ''
      }
    }
  });
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px; /* yes, I'm that particular about formatting */
}
</style>