<template>
  <div class="back" @click="click">
    <ali-icon width="32" height="32" icon-color="#F75280"><icon-back/></ali-icon>
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";
import IconBack from "@/components/icons/IconBack.vue";
import AliIcon from "@/components/AliIcon.vue";
export default defineComponent({
  name: "Back",
  components:{
    AliIcon,
    IconBack
  },
  methods:{
    click: function (){
      this.$router.back();
    }
  }
});
</script>