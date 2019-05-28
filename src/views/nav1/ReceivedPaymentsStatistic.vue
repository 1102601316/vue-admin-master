<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">汇总统计</el-breadcrumb-item>
            <el-breadcrumb-item>汇款统计</el-breadcrumb-item>
        </el-breadcrumb>
        <br/><br>
        <el-button-group>
            <el-button type="primary" @click="" icon="el-icon-delete" size="medium" round>删除</el-button>
            <el-button type="primary" @click="" icon="el-icon-edit" size="medium">项目编辑</el-button>
        </el-button-group>
        <br>
        <br>
        <el-table :border="true"  size="mini" style="font-size: 14px">
            <el-table-column label="项目回款总体汇总">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="ProjectName" label="合同额"></el-table-column>
                <el-table-column prop="ProjectType" label="实施总额度"></el-table-column>
                <el-table-column prop="SignDate" label="本年实施额度"></el-table-column>
                <el-table-column prop="TotalMoney" label="2018年计划实施额"></el-table-column>
                <el-table-column prop="Buyer" label="到款总额"></el-table-column>
                <el-table-column prop="CompanyName" label="本年度到款"></el-table-column>
                <el-table-column prop="CompanyName" label="未到款"></el-table-column>
                <el-table-column prop="CompanyName" label="催款金额"></el-table-column>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>

</script>
<style>
    .el-table--border th:first-child .cell {
        text-align: center;
    }
</style>