<template>
    <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px"
             class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
            <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
            <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-checkbox v-model='RemeberMe' checked class="remember" @click="ClickFun">记住密码</el-checkbox>
        <el-form-item style="width:100%;">
            <el-button type="primary" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录
            </el-button>
            <!--<el-button @click.native.prevent="handleReset2">重置</el-button>-->
        </el-form-item>
    </el-form>
</template>

<script>
    import {requestLogin} from '../api/api';
    import axios from 'axios';
    //import NProgress from 'nprogress'
    export default {
        data() {
            return {
                logining: false,
                ruleForm2: {
                    account: '',
                    checkPass: ''
                },
                rules2: {
                    account: [
                        {required: true, message: '请输入账号', trigger: 'blur'},
                        //{ validator: validaePass }
                    ],
                    checkPass: [
                        {required: true, message: '请输入密码', trigger: 'blur'},
                        //{ validator: validaePass2 }
                    ]
                },
                RemeberMe: true
            };
        },
        methods: {
            // handleReset2() {
            //   this.$refs.ruleForm2.resetFields();
            // },
            ClickFun(){
                this.RemeberMe = !this.RemeberMe
                console.log(this.RemeberMe)
            },
            handleSubmit2(ev) {
                var _this = this;
                this.$refs.ruleForm2.validate((valid) => {
                    if (valid) {
                        //_this.$router.replace('/table');
                        this.logining = true;
                        //NProgress.start();
                        var loginParams = {
                            UserName: this.ruleForm2.account,
                            UserPwd: this.ruleForm2.checkPass,
                            RemeberMe: this.RemeberMe
                        };

                        requestLogin(loginParams).then(data => {
                            this.logining = false;
                            //NProgress.done();
                            let {AppendData, LogMessage, Message, ResultType} = data;
                            if (ResultType != 0) {
                                this.$message({
                                    message: Message,
                                    type: 'error'
                                });
                            } else {
                                sessionStorage.setItem('LogMessage', LogMessage)
                                this.$router.push({path: '/'});
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        beforeCreate(){

        },
        mounted(){

        }
    }

</script>

<style lang="scss" scoped>
    .login-container {
        /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
        -webkit-border-radius: 5px;
        border-radius: 5px;
        -moz-border-radius: 5px;
        background-clip: padding-box;
        margin: 180px auto;
        width: 350px;
        padding: 35px 35px 15px 35px;
        background: #fff;
        border: 1px solid #eaeaea;
        box-shadow: 0 0 25px #cac6c6;
        .title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
        .remember {
            margin: 0px 0px 35px 0px;
        }
    }
</style>