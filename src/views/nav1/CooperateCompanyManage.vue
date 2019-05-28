<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">财务管理</el-breadcrumb-item>
            <el-breadcrumb-item>项目管理</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <br>
        <el-button type="primary" @click="addFinancialData" icon="el-icon-plus" size="medium">新增财务信息</el-button>
        <br>
        <br>
        <el-table border :data="financialData" @selection-change="select" id="Cooperate" :span-method="objectSpanMethod"
                  size="small">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="单位名称" prop="CompanyName"></el-table-column>
            <el-table-column label="项目名称" prop="ProjectName"></el-table-column>
            <el-table-column label="实际启动时间" prop="RealStartTime"></el-table-column>
            <el-table-column label="实际完成时间" prop="RealStopTime"></el-table-column>
            <el-table-column label="合同总额" prop="TotalMoney"></el-table-column>
            <el-table-column label="付款时间" prop="MoneyTime"></el-table-column>
            <el-table-column label="发票金额" prop="InvoiceNum"></el-table-column>
            <el-table-column label="付款金额" prop="MoneyNum"></el-table-column>
            <el-table-column label="操作" prop="">
                <template scope="scope">
                    <el-button icon="el-icon-edit" type="primary" size="mini"
                               @click="ChangeInformationForm(scope.row.ChildId)">信息修改
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <!--新增财务信息弹窗-->
        <el-dialog title="新增财务信息" :visible.sync="add">
            <el-form inline size="mini" :model="addfinancialData" ref="addfinancialData">
                <el-form-item label="总额：" class="ZE" prop="TotalMoney">
                    <el-input v-model="addfinancialData.TotalMoney" class="ZEinput"></el-input>
                </el-form-item>
                <el-form-item label="比例：" class="BL" prop="Scale">
                    <el-input v-model="addfinancialData.Scale" class="BLinput"></el-input>
                </el-form-item>
                <el-form-item label="开票日期：" prop="InvoiceTime">
                    <el-date-picker
                            v-model="addfinancialData.InvoiceTime"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="付款日期：" prop="MoneyTime">
                    <el-date-picker
                            v-model="addfinancialData.MoneyTime"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="开票金额：" prop="InvoiceNum">
                    <el-input v-model="addfinancialData.InvoiceNum" class="KPinput"></el-input>
                </el-form-item>
                <el-form-item label="付款金额：" prop="MoneyNum">
                    <el-input v-model="addfinancialData.MoneyNum" class="FKinput"></el-input>
                </el-form-item>
                <el-form-item label="质保金：" class="ZBJ" prop="GuaranteeMoney">
                    <el-input v-model="addfinancialData.GuaranteeMoney" class="KPinput"></el-input>
                </el-form-item>
                <el-form-item label="电汇信息：" prop="WiretransferInfor">
                    <el-input v-model="addfinancialData.WiretransferInfor" class="FKinput"></el-input>
                </el-form-item>
                <el-form-item label="发票类型：" class="" prop="InvoiceType">
                    <el-input v-model="addfinancialData.InvoiceType" style="width: 536px"></el-input>
                </el-form-item>
                <el-form-item label="备注：" style="margin-left: 29px" prop="Notes">
                    <el-input v-model="addfinancialData.Notes" style="width: 536px"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 564px">
                    <el-button type="primary" @click.native.prevent="submit('addfinancialData')">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <!--信息修改界面-->
        <el-dialog title="外协财务信息" :visible.sync="update">
            <el-form inline size="mini">
                <el-form-item label="总额：" class="ZE">
                    <el-input v-model="updatefinancialData.TotalMoney" class="ZEinput"></el-input>
                </el-form-item>
                <el-form-item label="比例：" class="BL">
                    <el-input v-model="updatefinancialData.Scale" class="BLinput"></el-input>
                </el-form-item>
                <el-form-item label="开票日期：">
                    <el-date-picker
                            v-model="updatefinancialData.InvoiceTime"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="付款日期：">
                    <el-date-picker
                            v-model="updatefinancialData.MoneyTime"
                            type="date"
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="开票金额：">
                    <el-input v-model="updatefinancialData.InvoiceNum" class="KPinput"></el-input>
                </el-form-item>
                <el-form-item label="付款金额：">
                    <el-input v-model="updatefinancialData.MoneyNum" class="FKinput"></el-input>
                </el-form-item>
                <el-form-item label="质保金：" style="margin-left: 14px">
                    <el-input v-model="updatefinancialData.GuaranteeMoney" class="KPinput"></el-input>
                </el-form-item>
                <el-form-item label="电汇信息：">
                    <el-input v-model="updatefinancialData.WiretransferInfor" class="FKinput"></el-input>
                </el-form-item>
                <el-form-item label="发票类型：" class="">
                    <el-input v-model="updatefinancialData.InvoiceType" style="width: 536px"></el-input>
                </el-form-item>
                <el-form-item label="备注：" style="margin-left: 29px">
                    <el-input v-model="updatefinancialData.Notes" style="width: 536px"></el-input>
                </el-form-item>
                <el-form-item style="margin-left: 564px">
                    <el-button type="primary" @click.native.prevent="submitChangeInformation">提交</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>
<script>
    import {
        GetCooperateCompanyFinance,
        CompanyFinanceInsert,
        GetCompanyFinanceInforById,
        CompanyFinanceUpdate
    } from '../../api/api'
    import {renderTime} from './js/public'

    export default {
        data() {
            return {
                //主页面变量
                financialData: [],
                Id: '',
                add: false,
                update: false,
                //新增财务变量
                addfinancialData: {
                    CompanyId: '',
                    Id: '',
                    TotalMoney: '',
                    Scale: '',
                    InvoiceTime: '',
                    InvoiceNum: '',
                    MoneyTime: '',
                    MoneyNum: '',
                    GuaranteeMoney: '',
                    WiretransferInfor: '',
                    InvoiceType: '',
                    Notes: '',
                },
                //信息修改界面变量
                updatefinancialData: []
            }
        },
        methods: {
            //合并表格
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex < 6) {
                    if (row.num >= 2) {
                        return {
                            rowspan: row.num,
                            colspan: 1
                        };
                    } else if (row.num === 1) {
                        return {
                            rowspan: 0,
                            colspan: 0
                        };
                    }
                }
            },

            //获取选中信息
            select(res) {
                this.Id = res.map(item => item.ParentId);
            },

            //    信息修改
            ChangeInformationForm(row) {
                GetCompanyFinanceInforById({Id: row}).then(data => {
                    if (data === null) {
                        this.$message({
                            message: '没有财务信息',
                            type: 'warning'
                        })
                    } else {
                        data.InvoiceTime = renderTime(data.InvoiceTime);
                        data.MoneyTime = renderTime(data.MoneyTime);
                        this.updatefinancialData = data;
                        this.update = true;
                    }
                }).catch(rec => {
                    this.$message({
                        message: '出现错误！！',
                        type: 'warning'
                    });
                })
            },
            //提交更改
            submitChangeInformation() {
                CompanyFinanceUpdate(this.updatefinancialData).then(data => {
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
                    this.update = false;
                    this.GetCooperateCompanyFinance()
                })
            },
            //加载项目信息
            GetCooperateCompanyFinance() {
                GetCooperateCompanyFinance().then((data) => {
                    this.financialData = [];
                    data.forEach((item, index) => {
                        item.RealStartTime = renderTime(item.RealStartTime);
                        item.RealStopTime = renderTime(item.RealStopTime);
                        if (item.Finance.length != 0) {
                            item.Finance.forEach((item1, index1) => {
                                let count = 0;
                                if (index1 === 0 && item.Finance.length >= 2) {
                                    count = item.Finance.length;
                                } else if (index1 > 0 && item.Finance.length >= 2) {
                                    count = 1;
                                }
                                item1.MoneyTime = renderTime(item1.MoneyTime);
                                let item2 = {
                                    num: count,
                                    ParentId: item.Id,
                                    ChildId: item1.Id,
                                    MoneyTime: item1.MoneyTime,
                                    CompanyName: item.CompanyName,
                                    ProjectName: item.ProjectName,
                                    TotalMoney: item.TotalMoney,
                                    RealStartTime: item.RealStartTime,
                                    RealStopTime: item.RealStopTime,
                                    InvoiceNum: item1.InvoiceNum,
                                    MoneyNum: item1.MoneyNum
                                };
                                this.financialData.push(item2)
                            })
                        } else {
                            item.ParentId = item.Id;
                            this.financialData.push(item);
                        }
                    });
                })
            },


            //    新增财务信息
            addFinancialData() {
                if (this.Id.length != 1) {
                    this.$message({
                        message: '请选中一条数据',
                        type: 'success'
                    });
                } else {
                    this.add = true
                }
            },
            //提交新增财务
            submit(addfinancialData) {
                this.addfinancialData.CompanyId = this.Id[0];
                CompanyFinanceInsert(this.addfinancialData).then(data => {
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
                        this.$refs[addfinancialData].resetFields();
                        this.add = false;
                        this.GetCooperateCompanyFinance()
                    }
                })
            }
        },
        mounted() {
            this.GetCooperateCompanyFinance()
        }
    }

</script>
<style>
    .ZE {
        margin-left: 29px;
    }

    .ZEinput, .BLinput, .KPinput, .FKinput {
        width: 219px;
    }

    .BL {
        margin-left: 29px;
    }

    .ZBJ {
        margin-left: 15px;
    }
</style>