<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">项目管理</el-breadcrumb-item>
            <el-breadcrumb-item>项目编辑</el-breadcrumb-item>
        </el-breadcrumb>
        <br/><br>
        <el-button-group>
            <el-button type="primary" @click="projectDelete" icon="el-icon-delete" size="medium" round>删除</el-button>
            <el-button type="primary" @click="ProjectEdit" icon="el-icon-edit" size="medium">项目编辑</el-button>
            <el-button type="primary" @click="addWX" icon="el-icon-plus" size="medium" round>添加外协</el-button>
        </el-button-group>
        <el-input v-model="searchInput" placeholder="请输入项目名称或项目类型" prefix-icon="el-icon-search" style="width: 200px"
                  size="small" @input="searchProject(searchInput)"></el-input>
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
        <!--<el-pagination-->
        <!--@current-change="handleCurrentChange"-->
        <!--:page-size="4"-->
        <!--layout="total, prev, pager, next"-->
        <!--:total="project.length">-->
        <!--</el-pagination>-->
        <!--项目编辑弹窗-->
        <el-dialog title="项目编辑" :visible.sync="edit" id="edit">
            <el-form :model="editForm" ref="editForm" inline="inline" style="" size="mini">
                <!--<h3 style="text-align: center">新建项目</h3>-->
                <el-form-item label="项目编号：" style="margin-left: 55px">
                    <el-input v-model="editForm.ProjectCode" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="项目名称：" style="margin-left: 28px">
                    <el-input v-model="editForm.ProjectName" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="项目类型：" style="margin-left: 55px">
                    <el-select v-model="editForm.ProjectTypeCode" style="width: 180px">
                        <el-option
                                v-for="ProjectType in ProjectTypeInfor"
                                :key="ProjectType.Code"
                                :value="ProjectType.Code"
                                :label='ProjectType.ProjectTypeName'/>
                    </el-select>
                </el-form-item>
                <el-form-item label="签订时间：" style="margin-left: 28px">
                    <el-date-picker
                            v-model="editForm.SignDate"
                            type="date"
                            placeholder="选择日期" style="width: 180px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="预计启动时间：" style="margin-left: 28px">
                    <el-date-picker
                            v-model="editForm.StarTime"
                            type="date"
                            placeholder="选择日期" style="width: 180px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="预计完成时间：">
                    <el-date-picker
                            v-model="editForm.StopTime"
                            type="date"
                            placeholder="选择日期" style="width: 180px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="合同总额（万元）：">
                    <el-input v-model="editForm.TotalMoney" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="合同份数：" style="margin-left: 28px">
                    <el-input v-model="editForm.CompactNum" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="印花税：" style="margin-left: 70px">
                    <el-input v-model="editForm.Stampduty" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="印花时间：" style="margin-left: 28px">
                    <el-date-picker
                            v-model="editForm.StampTime"
                            type="date"
                            placeholder="选择日期" style="width: 180px">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="支付条款：" style="margin-left: 55px">
                    <el-input v-model="editForm.Payment" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="中标通知书：" style="margin-left: 15px">
                    <el-input v-model="editForm.Notice" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="三方协议：" style="margin-left: 55px">
                    <el-input v-model="editForm.Agreement" style="width: 180px" disabled></el-input>
                </el-form-item>
                <el-form-item label="预估比例：" style="margin-left: 28px">
                    <el-input v-model="editForm.YGScale" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="验收意见：" style="margin-left: 55px">
                    <el-input v-model="editForm.Advice" style="width: 485px"></el-input>
                </el-form-item>
                <el-form-item label="采购方名称：" style="margin-left: 42px">
                    <el-input v-model="editForm.Buyer" style="width: 485px"></el-input>
                </el-form-item>
                <el-form-item label="采购方联系人：" style="margin-left: 28px">
                    <el-input v-model="editForm.ContractOfBuyer" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" style="margin-left: 28px">
                    <el-input v-model="editForm.PhoneOfBuyer" style="width: 180px"></el-input>
                </el-form-item>
                <el-form-item label="修改原因：" style="margin-left: 55px">
                    <el-input v-model="editForm.ChangeReason" style="width: 485px"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 494px">
                    <el-button @click="edit = false">取 消</el-button>
                    <el-button type="primary" @click="updateProject">保存</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

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
            </template>
        </el-dialog>

        <!--添加外协-->
        <el-dialog title="添加外协" :visible.sync="WX">
            <el-form :model="WXInfo" ref="WXInfo" size="mini">
                <el-form-item label="单位名称：" style="margin-left: 13px" prop="CompanyName">
                    <el-input v-model="WXInfo.CompanyName" style="width: 535px"></el-input>
                </el-form-item>
                <el-form-item label="外协联系人：" prop="ContractOfCompany">
                    <el-input v-model="WXInfo.ContractOfCompany" style="width: 535px"></el-input>
                </el-form-item>
                <el-form-item label="联系电话：" style="margin-left: 13px" prop="PhoneOfContract">
                    <el-input v-model="WXInfo.PhoneOfContract" style="width: 535px"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitWX('WXInfo')" style="margin-left: 575px">提交</el-button>
                </el-form-item>
            </el-form>
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
    </div>
</template>
<script>
    import {
        GetProjectInfor,
        GetProjectTypeInfor,
        DeleteProject,
        getBrenchList,
        GetProjectInforByCode,
        ProjectUpdate,
        GetProjectChange,
        GetAllProjectInfor,
        ProjectCooperateCompanyInsert,
        GetAllCooperateCompany
    } from '../../api/api'
    import {GetDepartmentStr, renderTime} from './js/public'
    // noinspection JSAnnotator
    export default {
        data() {
            return {
                searchInput:'',
                projectDemo:[],
                //项目编辑窗口变量
                editForm: {
                    YGScale: '',
                    ProjectCode: '',
                    ProjectTypeCode: '',
                    ProjectName: '',
                    DepartmentType: '',
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
                    ChangeReason: '',
                    Buyer: '',
                    ContractOfBuyer: '',
                    PhoneOfBuyer: ''
                },
                brenchs: [],
                project: [],
                projectListId: [],
                ProjectTypeInfor: [],
                edit: false,
                //项目详细信息相关变量
                DetailInfo: false,
                detail: [
                    {title1: '项目名称：', title2: '所属部门：', col1: '', col2: ''},
                    {title1: '签订日期：', title2: '支付条款：', col1: '', col2: ''},
                    {title1: '启动时间：', title2: '完成时间：', col1: '', col2: ''},
                    {title1: '合同总额：', title2: '合同份数：', col1: '', col2: ''},
                    {title1: '中标通知书：', title2: '三方协议：', col1: '', col2: ''},
                    {title1: '印花税：', title2: '印花时间：', col1: '', col2: ''},
                    {title1: '验收意见：', title2: '预估比例：', col1: '', col2: ''}
                ],
                detai2: [
                    {title1: '采购方联系人：', title2: '联系电话：', col1: '', col2: ''},
                    {title1: '采购方：', col1: ''},
                ],
                projectEdit: [],
                //修改记录弹窗变量
                changeInfo: [],
                change: false,
                //外协相关变量
                WXInfo: {
                    CompanyName: '',
                    ContractOfCompany: '',
                    PhoneOfContract: '',
                    ProjectCode: ''
                },
                WXXX: [],
                WX: false,
                WXDetail: false
            }
        },
        methods: {
            filters: {},

            select(ev) {
                this.projectList = ev;
                this.projectListId = this.projectList.map(item => item.ProjectCode);

            },
            //查找项目

            searchProject(value){
                if(value==''){
                    return this.project = this.projectDemo
                }else{
                    this.project = [];
                    this.projectDemo.forEach((item, index) => {
                        if(item.ProjectName.match(value)!=null){
                            this.project.push(item)
                        }else if(item.ProjectType.match(value)!=null){
                            this.project.push(item)
                        }
                    });
                }
                return this.project
            },

            //分页
            // handleCurrentChange(val){
            //     this.projectData = []
            //     for (var i = val * 4 - 4; i < val * 4; i++) {
            //         this.projectData.push(this.project[i]);
            //     }
            // },
            //删除项目


            projectDelete() {
                if (typeof(this.projectList) == 'undefined') {
                    this.$message({
                        message: '请选择要删除的项目',
                        type: 'warning'
                    });
                } else {
                    this.$confirm('确定删除吗？', '提示', {}).then(() => {
                        // let para = JSON.stringify(this.form)
                        DeleteProject(this.projectListId).then((data) => {
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
                            this.GetProject()
                        })
                    });

                }

            },
            //项目编辑

            ProjectEdit() {
                if (typeof(this.projectList) == 'undefined') {
                    this.$message({
                        message: '请选择要编辑的项目',
                        type: 'warning'
                    });
                } else {
                    if (this.projectListId.length == 1) {
                        this.edit = true;
                        GetProjectInforByCode({ProjectCode: this.projectListId[0]}).then(data => {
                            data.SignDate = renderTime(data.SignDate);
                            data.StarTime = renderTime(data.StarTime);
                            data.StopTime = renderTime(data.StopTime);
                            data.StampTime = renderTime(data.StampTime);
                            this.editForm = data;
                        })
                    } else {
                        this.edit = false;
                        this.$message({
                            message: '请选中一条项目',
                            type: 'warning'
                        });
                    }
                }
            },


            // 获取项目信息
            GetProject() {
                GetProjectInfor().then((data) => {
                    data.forEach((item, index) => {
                        item.SignDate = renderTime(item.SignDate);
                        item.CompanyName = item.CompanyName.toString().replace(/\,/g, '、');
                    });
                    this.project = data;
                    this.projectDemo = data;

                })
            },
            //    项目编辑
            updateProject() {
                if (this.editForm.ChangeReason == '') {
                    this.$message({
                        message: '请输入修改原因',
                        type: 'warning'
                    });
                } else {
                    this.$confirm('确定修改吗？', '提示', {}).then(() => {
                        ProjectUpdate(this.editForm).then(data => {
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
                                this.GetProject();
                                this.edit = false
                            }
                        })
                    })

                }

            },
            // 查看修改信息
            getChang(row) {
                // console.log(row)
                GetProjectChange({ProjectCode: row.ProjectCode}).then(data => {
                    if (data.length > 0) {
                        this.change = true;
                        data.forEach((item, index) => {
                            item.CreateTime = renderTime(item.CreateTime)
                        });
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
                    // console.log(this.detailList)
                    data.Department = GetDepartmentStr(data.Department);
                    data.SignDate = renderTime(data.SignDate);
                    data.StarTime = renderTime(data.StarTime);
                    data.StopTime = renderTime(data.StopTime);
                    data.StampTime = renderTime(data.StampTime);
                    // this.detailList = data;

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
                    this.detail[5].col2 = data.YGScale;

                    this.detai2[0].col1 = data.ContractOfBuyer;
                    this.detai2[1].col1 = data.Buyer;

                    this.detai2[0].col2 = data.PhoneOfBuyer;
                })
            },
            //    添加外协
            addWX() {
                if (typeof(this.projectList) == 'undefined') {
                    this.$message({
                        message: '请选中一条项目',
                        type: 'warning'
                    });
                } else {
                    if (this.projectListId.length == 1) {
                        this.WX = true
                    } else {
                        this.$message({
                            message: '不能批量处理',
                            type: 'warning'
                        });
                    }

                }
            },
            submitWX(FormData) {

                if (this.WXInfo.CompanyName == '') {
                    this.$message({
                        message: '请填写公司信息',
                        type: 'warning'
                    });
                } else {
                    this.WXInfo.ProjectCode = this.projectListId[0]
                    ProjectCooperateCompanyInsert(this.WXInfo).then(data => {
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
                            this.GetProject();
                            this.WX = false
                        }
                    })
                }
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
            },
            //    获取项目类型
            getProjectTypeInfor() {
                GetProjectTypeInfor().then(data => {
                    this.ProjectTypeInfor = data
                })
            },
        },
        beforeCreate() {
            getBrenchList().then(res => {
                this.brenchs = res.data
            }).catch(reject => {
                alert(reject)
            });
        },
        mounted() {
            this.GetProject();
            this.getProjectTypeInfor();
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
