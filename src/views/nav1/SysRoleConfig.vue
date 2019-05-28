<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>角色配置</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <br>
        <template>
            <el-button type="primary">新增</el-button>
            <el-button type="primary">删除</el-button>
        </template>
        <br>
        <br>
        <template>
            <el-table :data="roles" :border="true"  @selection-change="select">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column property="RoleDisplay" label="角色信息" width="500"></el-table-column>
                <el-table-column property="Users" label="用户" width="500"></el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
    import {getRoleList} from '../../api/api'
    export default {

        data(){
            return{
                //角色信息
                roles: []
            }
        },
        beforeCreate(){
            getRoleList().then(res => {
                this.roles = res.data
            }).catch(reject => {
                alert(reject)
            });
        }
    }
</script>