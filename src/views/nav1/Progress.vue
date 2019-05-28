<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">进度管理</el-breadcrumb-item>
            <el-breadcrumb-item>项目进度</el-breadcrumb-item>
        </el-breadcrumb>
        <br/><br>
        <el-button-group>
            <el-button type="primary" @click="showProgress" icon="el-icon-delete" size="medium">进度编辑</el-button>
        </el-button-group>
        <br>
        <br>
        <el-table :data="project" :border="true" @selection-change="select" size="mini" style="font-size: 14px">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column prop="ProjectName" label="项目名称" width="150"></el-table-column>
            <el-table-column prop="ProjectType" label="项目类型" width="150"></el-table-column>
            <el-table-column prop="SignDate" label="签订日期" width="150"></el-table-column>
            <el-table-column prop="TotalMoney" label="合同总额（万元）" width="150"></el-table-column>
            <el-table-column prop="Buyer" label="甲方" width="150"></el-table-column>
            <el-table-column label="外协" width="150" prop="CompanyName"></el-table-column>
            <el-table-column label="操作" width="122" fixed="right">
                <template slot-scope="scope">
                    <el-button size="mini" @click="getChang(scope.row)">修改记录</el-button>
                    <br>
                    <el-button size="mini" @click="getDetail(scope.row)">详细信息</el-button>
                    <br>
                    <el-button size="mini" @click="getWX(scope.row)">外协信息</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--修改记录弹窗-->
        <el-dialog title="修改记录" :visible.sync="change">
            <el-table :border="true" :data="changeInfo" size="mini">
                <el-table-column label="修改记录">
                    <el-table-column type="index"></el-table-column>
                    <el-table-column prop="CreateTime" label="修改时间"></el-table-column>
                    <el-table-column prop="ChangeReason" label="修改原因"></el-table-column>
                </el-table-column>
            </el-table>
        </el-dialog>

        <!--详细信息弹窗-->
        <el-dialog title="详细信息" :visible.sync="DetailInfo" id="DetailInfo">
            <template slot-scope="props">
                <el-table border :data="detail" size="mini" id="detailTable">
                    <el-table-column label="项目基本信息">
                        <el-table-column prop="title1"></el-table-column>
                        <el-table-column prop="col1"></el-table-column>
                        <el-table-column prop="title2"></el-table-column>
                        <el-table-column prop="col2"></el-table-column>
                    </el-table-column>

                </el-table>

                <el-table border :data="detai2" size="mini" id="JFXX">
                    <el-table-column label="甲方信息">
                        <el-table-column prop="title1"></el-table-column>
                        <el-table-column prop="col1"></el-table-column>
                        <el-table-column prop="title2"></el-table-column>
                        <el-table-column prop="col2"></el-table-column>
                    </el-table-column>
                </el-table>

                <el-table border :data="detail3" size="mini" id="DKXX">
                    <el-table-column label='到款信息' style="width: 100%">
                        <el-table-column type="index" fixed></el-table-column>
                        <el-table-column label="总额" prop="TotalMoney"></el-table-column>
                        <el-table-column label="比例" prop="Scale"></el-table-column>
                        <el-table-column label="开票日期" prop="InvoiceTime"></el-table-column>
                        <el-table-column label="开票金额" prop="InvoiceNum"></el-table-column>
                        <el-table-column label="到款日期" prop="InvoiceTime"></el-table-column>
                        <el-table-column label="到款金额" prop="MoneyNum"></el-table-column>
                        <el-table-column label="发票信息" prop="InvoiceInfor"></el-table-column>
                        <el-table-column label="备注" prop="Notes" width="200"></el-table-column>
                    </el-table-column>
                </el-table>
            </template>
        </el-dialog>

        <!--外协详细信息-->
        <el-dialog title="详细信息" :visible.sync="WXDetail">
            <template slot-scope="props">
                <el-table border :data="WXXX" size="mini">
                    <el-table-column label="外协信息">
                        <el-table-column type="index"></el-table-column>
                        <el-table-column prop="CompanyName" label="单位名称"></el-table-column>
                        <el-table-column prop="ContractOfCompany" label="外协联系人"></el-table-column>
                        <el-table-column prop="PhoneOfContract" label="联系电话"></el-table-column>
                    </el-table-column>
                </el-table>
            </template>
        </el-dialog>

        <!--修改项目进度弹窗-->
        <el-dialog title="项目进度信息" :visible.sync="editeProgress">
            <el-form v-model="EditProgress" size="mini" inline="inline" ref="EditProgress">
                <el-form-item label="合同负责人：" style="margin-left: 24px">
                    <el-input v-model="EditProgress.CompactLeader" style="width: 180px" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="项目负责人：" style="margin-left: 14px">
                    <el-input v-model="EditProgress.ProjectLeader" style="width: 180px" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="部门：" style="margin-left: 66px">
                    <el-input v-model="EditProgress.Department" style="width: 180px" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="实际启动时间：">
                    <el-date-picker
                            v-model="EditProgress.RealStartTime"
                            type="date"
                            placeholder="选择日期：" style="width: 180px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="实际完成时间：" style="margin-left: 10px">
                    <el-date-picker
                            v-model="EditProgress.RealStopTime"
                            type="date"
                            placeholder="选择日期：" style="width: 180px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="本年度之前实施：">
                    <el-input style="width: 166px"></el-input>
                </el-form-item>
                <el-form-item label="本年度计划：" style="margin-left: 24px">
                    <el-input v-model="EditProgress.CurrentYearPlan" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="本年度实施：" style="margin-left: 14px">
                    <el-input v-model="EditProgress.CurrentYearImplement" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="总实施：" style="margin-left: 52px">
                    <el-input v-model="EditProgress.TotalImplement" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="本年度前到款：">
                    <el-input v-model="EditProgress.FrontMoney" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="本年度累计到款：" style="margin-left: 10px">
                    <el-input v-model="EditProgress.CurrentYearTotalMoney" style="width: 166px"></el-input>
                </el-form-item>
                <el-form-item label="总到款：" style="margin-left: 42px">
                    <el-input v-model="EditProgress.TotalMoney" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="催款金额：" style="margin-left: 38px">
                    <el-input v-model="EditProgress.PressForMoney" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="催款备注：" style="margin-left: 28px">
                    <el-input v-model="EditProgress.PressRemarks" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 540px">
                    <el-button type="primary" @click="updateProgress">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {
        GetProjectInfor,
        // getBrenchList,
        GetProjectChange,
        GetAllProjectInfor,
        GetAllCooperateCompany,
        GetProgressInfor,
        ProgressInsertOrUpdate
    } from '../../api/api'
    import {GetDepartmentStr, renderTime,GetBrenchList} from './js/public'
    // noinspection JSAnnotator
    export default {
        data() {
            return {
                EditProgress: {
                    ChangeReason: '',
                    CompactLeader: '',
                    CurrentYearImplement: '',
                    CurrentYearPlan: '',
                    CurrentYearTotalMoney: '',
                    Department: '',
                    FrontImplement: '',
                    FrontMoney: '',
                    PressForMoney: '',
                    PressRemarks: '',
                    ProjectCode: '',
                    ProjectLeader: '',
                    RealStartTime: '',
                    RealStopTime: '',
                    TotalImplement: '',
                    TotalMoney: ''
                },
                brenchs: [],
                project: [],
                projectListId: [],
                change: false,
                DetailInfo: false,
                editeProgress: false,
                detail: [
                    {title1: '项目名称：', title2: '所属部门：', col1: '', col2: ''},
                    {title1: '签订日期：', title2: '支付条款：', col1: '', col2: ''},
                    {title1: '启动时间：', title2: '完成时间：', col1: '', col2: ''},
                    {title1: '合同总额：', title2: '合同份数：', col1: '', col2: ''},
                    {title1: '中标通知书：', title2: '三方协议：', col1: '', col2: ''},
                    {title1: '印花税：', title2: '印花时间：', col1: '', col2: ''},
                    {title1: '验收意见：', col1: ''}
                ],
                detai2: [
                    {title1: '采购方联系人：', title2: '联系电话：', col1: '', col2: ''},
                    {title1: '采购方：', col1: ''},
                ],
                detail3: [],
                WX: false,
                WXDetail: false,
                changeInfo: [],
                WXXX: []
            }
        },
        methods: {
            select(ev) {
                this.projectListId = ev.map(item => item.ProjectCode);

            },
            //对项目进度进行编辑
            showProgress() {
                if (this.projectListId.length == 1) {
                    this.editeProgress = true;
                    GetProgressInfor({ProjectCode: this.projectListId[0]}).then(data => {
                        data.Department = GetDepartmentStr(data.Department);
                        data.RealStartTime = renderTime(data.RealStartTime);
                        data.RealStopTime = renderTime(data.RealStopTime);
                        this.EditProgress = data
                    })
                } else {
                    this.editeProgress = false;
                    this.$message({
                        message: '请选中一条项目',
                        type: 'warning'
                    });
                }
            },
            //保存更改
            updateProgress() {
                ProgressInsertOrUpdate(this.EditProgress).then(data => {
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
                        this.editeProgress = false;
                        this.GetProject()
                    }
                })
            },

            // 获取项目信息
            GetProject() {
                GetProjectInfor().then((data) => {
                    data.forEach((item, index) => {
                        item.SignDate = renderTime(item.SignDate);
                        item.CompanyName = item.CompanyName.toString().replace(/\,/g,'、');
                    });
                    this.project = data
                })
            },
            // 查看修改记录
            getChang(row) {
                GetProjectChange({ProjectCode: row.ProjectCode}).then(data => {
                    if (data.length > 0) {
                        this.change = true;
                        data.forEach((item, index) => {
                            item.CreateTime = renderTime(item.CreateTime)
                        })
                        this.changeInfo = data;
                    } else {
                        this.$message({
                            message: '该项没有修改记录',
                            type: 'warning'
                        });
                    }
                })
            },
            //    查看详细信息
            getDetail(row) {
                this.DetailInfo = true;
                GetAllProjectInfor({ProjectCode: row.ProjectCode}).then(data => {
                    data.Department = GetDepartmentStr(data.Department);
                    data.SignDate = renderTime(data.SignDate);
                    data.StarTime = renderTime(data.StarTime);
                    data.StopTime = renderTime(data.StopTime);
                    data.StampTime = renderTime(data.StampTime);
                    // this.detailList = data;
                    //项目基本信息
                    this.detail[0].col1 = data.ProjectName;
                    this.detail[1].col1 = data.SignDate;
                    this.detail[2].col1 = data.StarTime;
                    this.detail[3].col1 = data.TotalMoney;
                    this.detail[4].col1 = data.Notice;
                    this.detail[5].col1 = data.Stampduty;
                    this.detail[6].col1 = data.Advice;

                    this.detail[0].col2 = data.Department;
                    this.detail[1].col2 = data.Payment;
                    this.detail[2].col2 = data.StopTime;
                    this.detail[3].col2 = data.CompactNum;
                    this.detail[4].col2 = data.Agreement;
                    this.detail[5].col2 = data.StampTime;
                    //甲方信息
                    this.detai2[0].col1 = data.ContractOfBuyer;
                    this.detai2[1].col1 = data.Buyer;

                    this.detai2[0].col2 = data.PhoneOfBuyer;
                    //    到款信息
                    data.Finance.forEach((item, index) => {
                        item.InvoiceTime = renderTime(item.InvoiceTime);
                        item.MoneyTime = renderTime(item.MoneyTime)
                    })
                    this.detail3 = data.Finance
                })
            },
            //    获取外协信息
            getWX(row) {
                GetAllCooperateCompany({ProjectCode: row.ProjectCode}).then(data => {
                    if (data.length == 0) {
                        this.$message({
                            message: '没有外协信息',
                            type: 'warning'
                        })
                    } else {
                        this.WXDetail = true;
                        this.WXXX = data
                    }
                })
            }
        },
        beforeCreate() {
            // getBrenchList().then(res => {
            //     this.brenchs = res.data
            // }).catch(reject => {
            //     alert(reject)
            // });
            GetBrenchList();
        },
        mounted() {
            this.GetProject()
        }
    }
</script>
<style>
    .el-dialog {
        width: 674.5px;
    }

    #detailTable thead > tr + tr {
        display: none;
    }

    #JFXX thead > tr + tr {
        display: none;
    }
</style>
