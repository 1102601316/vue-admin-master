<template>
    <div>
        <el-input v-model="msg" placeholder="请输入项目名称" prefix-icon="el-icon-search" style="width: 200px"
                  size="small" @input="capitalize(msg)"></el-input>
        <!--<el-button @click="people"></el-button>-->
        <!--<el-button @click="capitalize(msg)"></el-button>-->
        <el-table
                :data="tableData1"
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="日期"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="姓名"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="address"
                    label="地址">
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
    import {people} from './js/public'

    export default {
        data() {
            return {
                msg: '',
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王二虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王二熊',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王四虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                tableData1: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王二虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王二熊',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王四虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }]
            }
        },
        methods: {
            // people() {
            //     // debugger;
            //     let people1 = new people();
            //     people1.eyes(this.msg);
            //     people1.mouse('大');
            // },
            capitalize(value) {
                console.log(this.$store.getters)
                if (value == '') {

                } else {
                    this.tableData1 = [];
                    this.tableData.forEach((item, index) => {
                        if (item.name.match(value) != null) {
                            this.tableData1.push(item)
                        }
                    });
                }
                return this.tableData1
            }
        },
        mounted(){
            // console.log(people());
        }
    }
</script>