<template>
    <div class="settlement">
         <Basehead></Basehead>
        <div class="middle">
               <Settlentry></Settlentry>
        </div>
        <Foot></Foot>
    </div>
</template>
<script>
import Basehead from "../../components/settlentry/baseHead"
import Settlentry from "../../components/settlentry"
import Foot from "../../components/footer"
import store from '@/store'
export default {
   components:{
       Settlentry,Foot,Basehead
   },
   methods:{
          
   },
   created(){
        store.dispatch("CHECKTHEME",4)   
   }

}
</script>
<style lang="scss" scoped>
  .settlement{
      .middle{
          padding: 0 207px;
          box-sizing: border-box;
      }
  }
</style>