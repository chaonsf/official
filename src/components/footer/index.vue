<template>
    <div class="footer">
        <div class='count'>
           <ul>
               <li class='item'>
                   <img src='../../assets/new/call.png' />
                   <p>021-61984811</p>
               </li>
                <li class='line'></li>
               <li class='item'>
                   <img src='../../assets/new/map.png' />
                   <p>上海市宝山区泰和路2038号G座</p>
               </li>
                 <li class='line'></li>
               <li class='item'>
                   <img src='../../assets/new/mail.png' />
                   <p>yinongyuan@atu.cn.com</p>
               </li>
                 <li class='line'></li>
               <li class='item about' @click='aboutus'>
                   <img src='../../assets/new/about.png' class='about1' />
                   <img src='../../assets/new/about1.png'  class='about2'/>
                   <p>关于我们</p>
               </li>
           </ul>
        </div>
         <p>© 2020 版权所有 安徽壹农源科技有限公司   皖ICP备2020014728号-1</p>
    </div>
</template>
<script>
export default {
     data(){
         return{
             
         }
     },
     methods:{
         aboutus(){
             this.$router.push("/about")
         }
     }
}
</script>
<style lang="scss" scoped>
@import "../../styles/base";
.footer{
     width: 100%;
     background-color:#010B20;
     padding: 30px 10px;
     text-align: center;
     box-sizing: border-box;
     .count{
         @extend .width;
         padding-left: 215px;
         ul{
             overflow: hidden;
            li{
                float: left;
               /*  img{
                    width: 20px;
                    height: 20px;
                } */
                p{
                    font-size: 14px;
                    font-weight: 400;
                    color: #fff;
                }
            }
            .line{
                height: 30px;
                width: 1px;
                background:rgba(255,255,255,0.6);
                margin-top: 5px;
                margin-right: 50px;
                margin-left: 50px;
            }
            .about{
                cursor: pointer;
                .about2{
                    display: none;
                }
                .about1{
                    display:inline-block;
                }
            }
            .about:hover{
                .about1{
                    display: none;
                }
                .about2{
                    display:inline-block;
                }
                p{
                    color: #1CD49C;
                }
            }
         }
     }
      p{
             text-align: center;
             margin-top: 15px;
             color:rgba(255,255,255,1);
            font-size: 14px;
         }

}
</style>