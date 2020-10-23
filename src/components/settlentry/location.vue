<template>
        <el-row>
             <el-col :span="7">
                 <el-select  placeholder="省" v-model="provinceId" @change='provinceChange'>
                    <el-option v-for='item in province' :key='item.zoneCode' :value='item.zoneCode' :label='item.zoneName'></el-option>
                </el-select>
            </el-col>
                         <el-col :span="7" :offset="1">
                            <el-select  placeholder="市" v-model="cityId" @change="cityChange">
                                 <el-option v-for="item in city" :key='item.zoneCode'
                                  :value='item.zoneCode' :label="item.zoneName"
                                 ></el-option>
                            </el-select>
                        </el-col>
                         <el-col :span="8" :offset='1'>
                            <el-select  placeholder="县" v-model="countyId">
                                 <el-option v-for='item in county' :key='item.zoneCode'
                                  :value='item.zoneCode' :label="item.zoneName"
                                 ></el-option>
                            </el-select>
                        </el-col>
                    </el-row>
</template>
<script>
import {provinceAndcity} from '@/api/settlement'
export default {
      data(){
          return{
              province:[],
              provinceId:'',
              city:[],
              cityId:'',
              county:[],
              countyId:''
          }
      },
      created(){
          this.getProvince();
      },
      methods:{
          getProvince(){
             provinceAndcity().then(res=>{
                   let {code,data}=res.data
                   if(code==200){
                        this.province=data;
                        this.provinceId=data[0].zoneCode
                        this.provinceChange()
                   }
             })
          },
          provinceChange(){
              let data={
                   parentCode:this.provinceId
              }
              this.cityId=''
              this.city=[]
              this.county=[]
              this.countyId=''
              provinceAndcity(data).then(res=>{
                   let {code,data}=res.data;
                   if(code==200){
                         this.city=data;
                         this.cityId=data[0].zoneCode
                         this.cityChange()
                   }
              })
          },
          cityChange(){
               let data={
                    parentCode:this.cityId
               }
               this.countyId=''
               this.county=[]
               provinceAndcity(data).then(res=>{
                    let {code,data}=res.data
                    if(code==200){
                        this.county=data;
                        this.countyId=data[0].zoneCode
                    }
               })
          },
          clear(){
              this.province=[];
              this.provinceId='';
              this.city=[]
              this.cityId='';
              this.county=[];
              this.countyId='';
              this.getProvince();

          }
      }
      
}
</script>
<style lang="scss">
@import "../../styles/entry";
</style>