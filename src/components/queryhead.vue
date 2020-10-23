<template>
    <el-form :inline="true"  class='form headquery' label-width="82px">
               <el-form-item label="省">
                   <el-select  placeholder="省" v-model="query.province" @change='provinceChange'>
                     <el-option v-for='item in province' :key='item.zoneCode' :value='item.zoneCode' :label='item.zoneName'></el-option>
                   </el-select>
                </el-form-item>
                <el-form-item label='市'>
                            <el-select  placeholder="市" v-model="query.city" @change="cityChange">
                                 <el-option v-for="item in city" :key='item.zoneCode'
                                  :value='item.zoneCode' :label="item.zoneName"
                                 ></el-option>
                            </el-select>                
                </el-form-item>
                <el-form-item label='县'>
                            <el-select  placeholder="县" v-model="query.county">
                                 <el-option v-for='item in county' :key='item.zoneCode'
                                  :value='item.zoneCode' :label="item.zoneName"
                                 ></el-option>
                            </el-select>                      
                </el-form-item>
                <slot name="status"></slot>
                <el-form-item label='日期' class='time' v-if='time'>
                   <el-date-picker
                     v-model="value"
                     value-format="yyyy-MM-dd"
                      type="daterange"
                   range-separator="至"
                     start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </el-form-item>
                <el-form-item label=' '>
                      <el-button type="primary" @click='submit'>查询</el-button>               
                </el-form-item>
    </el-form>
</template>
<script>
import {provinceAndcity,zone} from '@/api/basefarm'
import moment from 'moment'
let now=moment().format("YYYY-MM-DD")
let oneyear=moment().subtract(1,'year').format("YYYY-MM-DD")
export default {
     props:{
         time:{
              default(){
                   return true
              }
         }
      },
      data(){
          return{
              province:[],
              city:[],
              county:[],
              query:{
                   province:'',
                   city:'',
                   county:''
              },
              value:[oneyear,now],
          }
      },
      created(){
           this.jurisdictionArea()
           this.submit()
      },
      methods:{
         jurisdictionArea(){
           zone().then(res=>{
               let {code,data}=res.data;
               if(code==200){
                    if(data[1]){
                          this.province=data[1]
                           this.query.province=data[1][0].zoneCode
                          if(data[2]){
                              this.city=data[2];
                              this.query.city=data[2][0].zoneCode
                              if(data[3]){
                                   this.county=data[3]
                                   this.query.county=data[3][0].zoneCode
                              }else{
                                   this.cityChange()
                              }
                          }else{
                               this.provinceChange()
                          }
                    }else{
                         this.getProvince()
                    }
                    
                    
               }
           })
         },
           getProvince(){
              provinceAndcity().then(res=>{
                   let {code,data}=res.data
                   if(code==200){
                        this.province=data;
                        this.query.province=data[0].zoneCode
                        this.provinceChange()
                   }
              })
           },
          provinceChange(){
              let parm={
                   parentCode:this.query.province
              }
              this.city=[];
              this.query.city=''
              this.query.county=''
              this.county=[]
              provinceAndcity(parm).then(res=>{
                   let {code,data}=res.data;
                   if(code==200){
                         this.city=data;
                         this.cityId=data[0].zoneCode
                         this.cityChange()
                   }
              })
          },
          cityChange(){
               let parm={
                    parentCode:this.query.city
               }
               this.county=[]
               this.query.county=''
               if(this.query.city){
                provinceAndcity(parm).then(res=>{
                    let {code,data}=res.data
                    if(code==200){
                        this.county=data;

                    }
                })
               }
          },
          submit(){
              let query=this.query
              let value=this.value
              let param={
                  ...query,
                  beginTime:value[0],
                  endTime:value[1]
              }
              this.$emit('search',param)
          }
      }
}
</script>
<style lang="scss">
.headquery{
    .time{
           .el-form-item__content{
                width: 456px;
                .el-date-editor{
                     width: 100%;
                }
           }
      }
     .el-select{
        width: 182px;
     }
}
</style>