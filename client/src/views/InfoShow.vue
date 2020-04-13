<template>
    <div class="infoshow">
       <!-- <el-row type="flex" class="row-bg" justify="center">
           <el-col :span='16'>
               <div class="userinfo">
                  <div class="user-item">
                    <i class="fa fa-user"></i>
                   <span>用户名：{{user.name}}</span>
                  </div>
                  <div class="user-item">
                    <i class="fa fa-cog"></i>
                    <span>权限：{{user.identity == 'manager' ? '管理员' : '普通员工'}}</span>
                  </div>
               </div>
           </el-col>
       </el-row> -->

       <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>用户信息</span>
         
          </div>
          <div class="text item">
            用户名：  {{user.name}}
          </div>
          <div class="text item">
            权限：    {{user.identity == 'manager' ? '管理员' : '普通员工'}}
          </div>
        </el-card>
    </div>
</template>
<script>
export default {
  name: "infoshow",
  computed: {
    user() {
      return this.$store.getters.user;
    }
  }
};
</script>
<style>
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>