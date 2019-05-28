<template>
    <div>
        <!--面包屑导航栏-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>用户配置</el-breadcrumb-item>
        </el-breadcrumb>
        <br><br>
        <!--按钮组-->
        <el-button-group>
            <el-button type="primary" @click="resetUser('UserForm')" icon="el-icon-plus" size="medium" round>新增</el-button>
            <el-button type="primary" @click="deleteUser"icon="el-icon-delete" size="medium">删除</el-button>
            <el-button type="primary" @click="Config" icon="el-icon-edit" size="medium" round>角色配置</el-button>
        </el-button-group>

        <!--新增用户-->
        <el-dialog title="新增用户" :visible.sync="add">
            <el-form :model="UserForm" size="small" inline ref="UserForm">
                <el-form-item label="用户名：" :label-width="formLabelWidth" prop="UserName">
                    <el-input v-model="UserForm.UserName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="部门类型：" :label-width="formLabelWidth" prop="DepartmentId">
                    <el-select v-model="UserForm.DepartmentId" placeholder="请选择所在部门">
                        <el-option
                                v-for="brench in brenchs"
                                :key="brench.DepartmentId"
                                :value="brench.DepartmentId"
                                :label='brench.DepartmentDisPlay'/>
                    </el-select>
                </el-form-item>
                <el-form-item label="真实姓名：" :label-width="formLabelWidth" prop="UserRealName">
                    <el-input v-model="UserForm.UserRealName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码：" :label-width="formLabelWidth" prop="UserPwd">
                    <el-input v-model="UserForm.UserPwd" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="固定电话：" :label-width="formLabelWidth" prop="FixedPhone">
                    <el-input v-model="UserForm.FixedPhone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="移动电话：" :label-width="formLabelWidth" prop="MobilePhone">
                    <el-input v-model="UserForm.MobilePhone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电子邮箱：" :label-width="formLabelWidth" prop="Email">
                    <el-input v-model="UserForm.Email" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="add = false" size="small">取 消</el-button>
                <el-button type="primary" @click="addUser()" size="small">保存</el-button>
            </div>
        </el-dialog>
        <!--角色配置-->
        <el-dialog title="角色配置" :visible.sync="rolesConfig" width="500px" >
            <el-table :data="roles" :border="true"  @selection-change="select1" size="small">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column property="RoleDisplay" label="角色信息"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="roleConfig = false" size="small">取 消</el-button>
                <el-button type="primary" @click="RoleConfig" size="small">保存</el-button>
            </div>
        </el-dialog>
        <br>
        <br>
        <!--用户信息表-->
        <template>
            <el-table
                    :data="userList"
                    style="width: 100%"
                    :border="true"
                    @selection-change="select">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="UserName"
                        label="用户名"
                        width="100">
                </el-table-column>
                <el-table-column
                        prop="UserRealName"
                        label="真实姓名">
                </el-table-column>
                <el-table-column
                        prop="FixedPhone"
                        label="固定电话">
                </el-table-column>
                <el-table-column
                        prop="MobilePhone"
                        label="移动电话">
                </el-table-column>
                <el-table-column
                        prop="Email"
                        label="电子邮件">
                </el-table-column>
                <el-table-column
                        prop="DepartmentDisPlay"
                        label="部门">
                </el-table-column>
                <el-table-column
                        prop="RoleDisplay"
                        label="角色">
                </el-table-column>
            </el-table>
        </template>
    </div>
</template>
<script>
    import {getRoleList, getBrenchList, addUsers, GetUserInfor, DeleteUsers,UserRoleConfig} from '../../api/api'

    export default {
        data() {
            return {
                // 用户信息
                userList: [],
                //新增用户
                add: false,
                UserForm: {
                    UserName: '',
                    DepartmentId: '',
                    UserRealName: '',
                    UserPwd: '',
                    FixedPhone: '',
                    MobilePhone: '',
                    Email: ''
                },
                brenchs: [],
                formLabelWidth: '120px',
                //角色配置
                rolesConfig: false,
                roles: [],
            //
                sels:[]
            }
        },
        methods: {
            resetUser(UserForm){
                this.add = true;
                this.$refs[UserForm].resetFields();
            },


            // 添加用户
            addUser() {
                this.$confirm('确定提交吗？', '提示', {}).then(() => {
                    addUsers(this.UserForm).then(data => {
                        this.getUser();
                        this.$message({
                            message: '添加用户成功',
                            type: 'success'
                        });
                    })
                });

                this.add = false;
            },
            //选择用户
            select(sels) {
                this.sels = sels
                console.log(this.sels)
            },
            //选择角色
            select1(sels) {
                this.sels1 = sels
            },
            //
            Config(){
                if(this.sels.length==1){
                    this.rolesConfig = true;
                }else {
                    this.$message({
                        message: '请选择一条数据',
                        type: 'warning'
                    });
                }
            },
            //获取用户列表
            getUser() {
                GetUserInfor().then(res => {
                    this.userList = res.data;
                })
            },
            //删除用户
            deleteUser() {
                if(typeof(this.sels) == 'undefined'){
                    this.$message({
                        message: '请选择需要删除的用户',
                        type: 'warning'
                    });
                }else {
                    this.userIds = this.sels.map(item => item.Id);
                    this.$confirm('确定要删除吗？', '提示', {
                        type: 'warning'
                    }).then(() => {
                        DeleteUsers(this.userIds).then(res => {
                            this.getUser();
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            console.log(res)
                        })
                    })
                }
            },
            //用户角色配置
            RoleConfig(){
                if(this.sels1=='undefined'){
                    this.$message({
                        message: '请选择角色信息',
                        type: 'warning'
                    });
                }else {
                    this.roleId = this.sels1.map(item => item.Id);
                    this.userIds = this.sels.map(item => item.Id);
                    UserRoleConfig(this.userIds,this.roleId).then(data=>{
                        this.getUser();
                        this.rolesConfig = false;
                    })
                }
            }
        },
        beforeCreate() {
            getRoleList().then(res => {
                this.roles = res.data
            }).catch(reject => {
                alert(reject)
            });
            getBrenchList().then(res => {
                this.brenchs = res.data
            }).catch(reject => {
                alert(reject)
            });
        },
        mounted() {
            this.getUser();
        }
    }
</script>