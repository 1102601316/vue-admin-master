<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>新建项目</el-breadcrumb-item>
        </el-breadcrumb>
        <br/>
        <el-form :model="Form" ref="Form" inline="inline" size="mini" style="width: 1079px">
            <h3 style="text-align: center">项目基本信息</h3>
            <el-form-item label="项目编号：" style="margin-left: 55px" prop="ProjectCode">
                <el-input v-model="Form.ProjectCode" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="项目名称：" style="margin-left: 28px" prop="ProjectName">
                <el-input v-model="Form.ProjectName" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="项目类型：" style="margin-left: 28px"prop="ProjectTypeCode">
                <el-select v-model="Form.ProjectTypeCode" style="width: 220px">
                    <el-option
                            v-for="ProjectType in ProjectTypeInfor"
                            :key="ProjectType.Code"
                            :value="ProjectType.Code"
                            :label='ProjectType.ProjectTypeName'/>
                </el-select>
            </el-form-item>
            <el-form-item label="签订时间：" style="margin-left: 55px" prop="SignDate">
                <el-date-picker
                        v-model="Form.SignDate"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="预计启动时间：" prop="StarTime">
                <el-date-picker
                        v-model="Form.StarTime"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="预计完成时间：" prop="StopTime">
                <el-date-picker
                        v-model="Form.StopTime"
                        type="date"
                        placeholder="选择日期">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="合同总额（万元）：" prop="TotalMoney">
                <el-input v-model="Form.TotalMoney" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="合同份数：" style="margin-left: 28px" prop="CompactNum">
                <el-input v-model="Form.CompactNum" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="印花税：" style="margin-left: 41px" prop="Stampduty">
                <el-input v-model="Form.Stampduty" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="印花时间：" style="margin-left: 56px" prop="StampTime">
                <el-date-picker
                        v-model="Form.StampTime"
                        type="date"
                        placeholder="选择日期" style="width: 220px">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="支付条款：" style="margin-left: 28px" prop="Payment">
                <el-input v-model="Form.Payment" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="中标通知书：" style="margin-left:14px" prop="Notice">
                <el-input v-model="Form.Notice" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="三方协议：" style="margin-left: 55px" prop="Agreement">
                <el-select v-model="Form.Agreement" style="width: 220px">
                    <el-option
                            v-for="Agreement in AgreementValue"
                            :key="Agreement.AgreementName"
                            :value="Agreement.AgreementName"
                            :label='Agreement.AgreementName'/>
                </el-select>
            </el-form-item>
            <el-form-item label="验收意见：" style="margin-left: 28px" prop="Advice">
                <el-input v-model="Form.Advice" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="预估比例：" style="margin-left: 28px" prop="Advice">
                <el-input v-model="Form.YGScale" style="width: 220px"></el-input>
            </el-form-item>
            <h3 style="text-align: center">项目甲方信息</h3>
            <el-form-item label="采购方名称：" style="margin-left: 40px" prop="Buyer">
                <el-input v-model="Form.Buyer" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="采购方联系人：" prop="ContractOfBuyer">
                <el-input v-model="Form.ContractOfBuyer" style="width: 220px"></el-input>
            </el-form-item>
            <el-form-item label="采购方电话：" style="margin-left: 15px" prop="PhoneOfBuyer">
                <el-input v-model="Form.PhoneOfBuyer" style="width: 220px"></el-input>
            </el-form-item>
            <h3 style="text-align: center">项目管理信息</h3>
            <el-form-item label="合同负责人：" style="margin-left: 40px" prop="CompactLeader">
                <el-select v-model="Form.CompactLeader" style="width: 220px">
                    <el-option
                            v-for="CompactLeader in CompactLeaderInfor"
                            :key="CompactLeader.Id"
                            :value="CompactLeader.Id"
                            :label='CompactLeader.UserRealName'/>
                </el-select>
            </el-form-item>
            <el-form-item label="项目负责人：" style="margin-left: 14px" prop="ProjectLeader">
                <el-select v-model="Form.ProjectLeader" style="width: 220px">
                    <el-option
                            v-for="GetProjectLeader in GetProjectLeaderInfor"
                            :key="GetProjectLeader.Id"
                            :value="GetProjectLeader.Id"
                            :label='GetProjectLeader.UserRealName'/>
                </el-select>
            </el-form-item>
            <el-form-item label="所属部门：" style="margin-left: 28px" prop="Department">
                <el-select v-model="Form.Department" style="width: 220px">
                    <el-option
                            v-for="brench in brenchs"
                            :key="brench.DepartmentId"
                            :value="brench.DepartmentId"
                            :label='brench.DepartmentDisPlay'/>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click.native.prevent="onSubmit('Form')" style="margin-left: 950px">立即创建</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
    import {
        ProjectNew,
        getBrenchList,
        GetProjectTypeInfor,
        GetCompactLeaderInfor,
        GetProjectLeaderInfor
    } from '../../api/api'

    export default {
        data() {
            return {
                //三方数据
                AgreementValue:[
                    {AgreementName:'外协'},
                    {AgreementName:'外包'}
                    ],
                //
                Form: {
                    ProjectCode: '',
                    ProjectName: '',
                    Department: '',
                    SignDate: '',
                    StarTime: '',
                    StopTime: '',
                    TotalMoney: '',
                    CompactNum: '',
                    Stampduty: '',
                    StampTime: '',
                    Payment: '',
                    Notice: '',
                    Agreement: '',
                    Advice: '',
                    YGScale:'',
                    ProjectTypeCode: '0',
                    Buyer: '',
                    ContractOfBuyer: '',
                    PhoneOfBuyer: '',
                    CompactLeader: '',
                    ProjectLeader: ''
                },
                brenchs: [],
                ProjectTypeInfor: [],
                CompactLeaderInfor: [],
                GetProjectLeaderInfor: []
            }
        },
        methods: {
            onSubmit(FormData) {

                if (this.Form.ProjectCode == null || this.Form.ProjectCode == '') {
                    this.$message({
                        message: '请输入项目编号',
                        type: 'warning'
                    });
                } else {
                    ProjectNew(this.Form).then(data => {
                        this.$refs[FormData].resetFields();
                        if (data.ResultType !== 0) {
                            this.$message({
                                message: data.Message,
                                type: 'warning'
                            });
                        } else {
                            this.$message({
                                message: data.Message,
                                type: 'success'
                            });
                        }
                    })
                }

            },
            //    获取项目类型
            getProjectTypeInfor() {
                GetProjectTypeInfor().then(data => {
                    this.ProjectTypeInfor = data
                })
            },
            //    获取合同负责人
            getCompactLeaderInfor() {
                GetCompactLeaderInfor().then(data => {
                    if (data.length == 0) {
                        this.$message({
                            message: '没有合同负责人信息',
                            type: 'warning'
                        })
                    } else {
                        this.CompactLeaderInfor = data
                    }
                })
            },
            //    获取项目负责人
            getProjectLeaderInfor() {
                GetProjectLeaderInfor().then(data => {
                    this.GetProjectLeaderInfor = data
                })
            }
        },
        beforeCreate() {
            getBrenchList().then(res => {
                this.brenchs = res.data
            }).catch(reject => {
                alert(reject)
            });
        },
        mounted() {
            this.getProjectTypeInfor();
            this.getCompactLeaderInfor()
            this.getProjectLeaderInfor()
        }
    }
</script>
<style>
</style>