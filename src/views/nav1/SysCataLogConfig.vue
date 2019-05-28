<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>目录配置</el-breadcrumb-item>
        </el-breadcrumb>
        <br>
        <br>
        <el-button-group>
            <el-button type="primary" @click="addCatalog" icon="el-icon-plus" size="medium" round>新增</el-button>
            <el-button type="primary" @click="deleteCata" icon="el-icon-delete" size="medium" round>删除</el-button>
        </el-button-group>
        <br>
        <br>
        <template>
            <el-table :data="catalog" :border="true" @selection-change="select2" id="catalogTable" :span-method="objectSpanMethod">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="ParentCatalogName" label="父目录" width="150"></el-table-column>
                <el-table-column prop="ParentRoles" label="父目录角色" width="273"></el-table-column>
                <el-table-column prop="ChildCatalogName" label="子目录" width="150"></el-table-column>
                <el-table-column prop="CatalogUrl" label="路径" width="250"></el-table-column>
                <el-table-column prop="ChildRoles" label="角色" width="200"></el-table-column>
            </el-table>
        </template>

        <!--添加目录-->
        <el-dialog title="新增目录" :visible.sync="add" width="500px">
            <el-form>
                <el-input v-model="cata1" size="small">
                    <template slot="prepend">目录名称：</template>
                </el-input>
                <br><br>
                <el-table :data="roles" :border="true" @selection-change="select1" size="small">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column property="RoleDisplay" label="角色信息"></el-table-column>
                </el-table>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="add = false" size="small">取 消</el-button>
                <el-button type="primary" @click="addcata" size="small">保存</el-button>
            </div>
        </el-dialog>
        <!--添加子目录-->
        <el-dialog title="添加子目录及路径" :visible.sync="add1" width="450px">
            <el-form>
                <el-input v-model="cata2" size="small">
                    <template slot="prepend">目录名称：</template>
                </el-input>
                <br><br>
                <el-input v-model="cata3" size="small">
                    <template slot="prepend">路径名称：</template>
                </el-input>
            </el-form>
            <br><br>
            <el-table :data="roles" :border="true" @selection-change="select1" size="small">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column property="RoleDisplay" label="角色信息"></el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button @click="del = false" size="small">取 消</el-button>
                <el-button type="primary" @click="addcata2" size="small">保存</el-button>
            </div>
        </el-dialog>
        <!--删除目录-->
        <el-dialog title="删除目录" :visible.sync="del">
            <el-table :data='subCatalog' :border="true" @selection-change="select3" size="small">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="CatalogName" width="290" label="子目录">
                </el-table-column>
                <el-table-column prop="CatalogUrl" width="297" label="路径">
                </el-table-column>
            </el-table>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="deleteCatalog" size="small">确定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import {GetAllCatalogData, getRoleList, InsertCatalogs, InsertSubCatalogs, DeleteCatalog} from '../../api/api'

    export default {
        data() {
            return {
                //角色信息
                catalog: [],
                sels2:[],
                CatalogId: '',
                subCatalog: [],
                //新增弹框数据
                roles: [],
                add: false,
                add1: false,
                del: false,
                cata1: '',
                cata2: '',
                cata3: '',
                parentId: [],
                roleId: [],
                roleIdStr: '',
                childrenId: []
            }
        },
        methods: {
            //合并表格
            objectSpanMethod({row, column, rowIndex, columnIndex}) {
                if (columnIndex < 3) {
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
            //选中事件
            //角色选中
            select1(para) {
                this.roleIdStr ='';
                this.roleId = para.map(item => item.Id);
                this.roleId.forEach((item,index)=>{
                    this.roleIdStr +=`${item},`
                });
                this.roleIdStr = this.roleIdStr.substring(0,this.roleIdStr.length-1);
            },
            //父目录选中
            select2(para) {
                this.sels2 = para;
                this.parentId = para.map(item => item.ParentId);
            },
            // 子目录选中
            select3(para) {
                console.log(para[0].Id)
                this.sels3 = para;
                this.childrenId = this.sels3.map(item => item.Id);
            },
            //新增按钮事件
            addCatalog() {

                if (this.parentId.length > 1) {
                    this.$message({
                        message: '不能批量处理',
                        type: 'success'
                    });
                } else {
                    if (this.parentId.length == 0) {
                        this.add = true
                    } else {
                        this.add1 = true
                    }
                }
            },
            //添加父目录
            addcata() {
                if (typeof(this.roleId) == 'undefined') {
                    this.$message({
                        message: '请选择角色信息',
                        type: 'warning'
                    });
                } else {
                    if (this.cata1.length == 0) {
                        this.$message({
                            message: '请输入路径',
                            type: 'warning'
                        });
                    } else {
                        //    添加目录
                        InsertCatalogs(this.roleId, this.cata1).then(data => {
                            this.$message({
                                message: data.Message,
                                type: 'success'
                            });
                            this.add = false
                            this.GetCatalogList()
                        })
                    }
                }
            },
            //添加子目录
            addcata2() {
                InsertSubCatalogs(this.parentId[0], this.cata2, this.cata3,this.roleIdStr).then(res => {
                    if(res.data.ResultType==0){
                        this.$message({
                            message: res.data.Message,
                            type: 'success'
                        });
                        this.add1 = false;
                        this.GetCatalogList()
                    }else {
                        this.$message({
                            message: res.data.Message,
                            type: 'warning'
                        });
                    }

                })
            },
            //删除
            deleteCata() {
                if (this.parentId.length == 0) {
                    this.$message({
                        message: '请先选择要删除的目录',
                        type: 'warning'
                    });
                } else {
                    this.del = true;
                    this.CatalogId = this.sels2[0].ParentId;
                    GetAllCatalogData().then(res => {
                        res.data.forEach((item,index)=>{
                            if(item.Id == this.CatalogId){
                                this.subCatalog = item.Children;
                            }
                        })


                    })
                }

            },
            //删除目录
            deleteCatalog() {
                if (this.childrenId.length == 0) {
                    this.$message({
                        message: '请先选择要删除的目录',
                        type: 'warning'
                    });
                } else {
                    DeleteCatalog(this.childrenId, this.sels2[0].ParentId).then(data => {
                        if(data.ResultType == 0){
                            this.GetCatalogList();
                            this.del = false;
                            this.$message({
                                message: data.Message,
                                type: 'success'
                            });
                        }else {
                            this.$message({
                                message: data.Message,
                                type: 'warning'
                            });
                        }

                    })
                }

            },
            //获取目录信息请求
            GetCatalogList() {
                this.catalog = [];
                GetAllCatalogData().then(res => {
                    // this.catalog = res.data
                    res.data.forEach((item, index) => {
                        if(item.Children!= 0){
                            item.Children.forEach((item1, index1) => {

                                let count = 0;
                                if (index1 === 0 && item.Children.length >= 2) {
                                    count = item.Children.length;
                                } else if (index1 > 0 && item.Children.length >= 2) {
                                    count = 1;
                                }

                                let item2 = {
                                    num:count,
                                    ChildId: item1.Id,
                                    ParentId: item.Id,
                                    ChildRoles: item1.Roles,
                                    ParentRoles: item.Roles,
                                    ChildCatalogName: item1.CatalogName,
                                    CatalogUrl: item1.CatalogUrl,
                                    ParentCatalogName: item.CatalogName
                                };
                                item2.ChildRoles = item2.ChildRoles.toString().replace(/\,/g,'、');
                                item2.ParentRoles = item2.ParentRoles.toString().replace(/\,/g,'、');
                                this.catalog.push(item2);
                            })
                        }else {
                            item.ParentId = item.Id;
                            item.ParentRoles = item.Roles;
                            item.ParentCatalogName= item.CatalogName;
                            this.catalog.push(item);
                        }
                    })
                    // console.log(res.data)
                }).catch(reject => {
                    alert(reject)
                });
            }
        },
        beforeCreate() {
            //获取角色列表
            getRoleList().then(res => {
                this.roles = res.data
            }).catch(reject => {
                alert(reject)
            });

        },
        mounted() {
            this.GetCatalogList()
        }
    }
</script>
<style>
    .el-checkbox {
        margin-left: 18px;
    }
</style>