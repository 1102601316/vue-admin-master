import axios from 'axios';

// let base = 'http://192.168.0.31:8080/api';

export const base = 'http://192.168.0.31:8080/api';

export const requestLogin = params => {
    return axios.post(`${base}/Account/Login`, params).then(res => res.data);
};

export const Logout = () => {
    return axios.post(`${base}/Account/Logout`).then(res => res.data);
};

export const addUsers = params => {
    return axios.post(`${base}/SysConfig/InsertUsers`, params).then(res => res.data);
};

export const UserRoleConfig = (userIds, roleId) => {
    return axios.post(`${base}/SysConfig/UserRoleConfig`, {userIds: userIds, roleId: roleId}).then(res => res.data);
};

export const getUsrPromise = () => {
    return axios.get(`${base}/Public/GetCatalogData`)
};

export const GetUserInfor = () => {
    return axios.get(`${base}/SysConfig/GetUserInfor`)
};

export const getRoleList = () => {
    return axios.get(`${base}/SysConfig/GetRolesInfor`)
};

export const getBrenchList = () => {
    return axios.get(`${base}/Public/GetDepartmentInfor`)
};

export const GetAllCatalogData = () => {
    return axios.get(`${base}/SysConfig/GetAllCatalogData`)
};

export const DeleteUsers = (params) => {
    return axios.post(`${base}/SysConfig/DeleteUsers`, params)
};

export const InsertSubCatalogs = (parentId, CatalogName, CatalogUrl,roleIds) => {
    return axios.post(`${base}/SysConfig/InsertSubCatalogs`, {
        parentId: parentId,
        CatalogName: CatalogName,
        CatalogUrl: CatalogUrl,
        roleIds: roleIds
    })
};

export const InsertCatalogs = (roleIds, CatalogName) => {
    return axios.post(`${base}/SysConfig/InsertCatalogs`, {roleIds: roleIds, CatalogName: CatalogName})
        .then(res => res.data);
};

export const DeleteCatalog = (catalogIds, parentId) => {
    return axios.post(`${base}/SysConfig/DeleteCatalog`, {catalogIds: catalogIds, parentId: parentId})
        .then(res => res.data);
};
//项目管理接口
export const ProjectNew = (params) => {
    return axios.post(`${base}/ProjectManage/ProjectNew`, params)
        .then(res => res.data);
};

export const GetProjectTypeInfor = () => {
    return axios.get(`${base}/Public/GetProjectTypeInfor`)
        .then(res => res.data);
};

export const GetCompactLeaderInfor = () => {
    return axios.get(`${base}/Public/GetCompactLeaderInfor`)
        .then(res => res.data);
};

export const GetProjectLeaderInfor = () => {
    return axios.get(`${base}/Public/GetProjectLeaderInfor`)
        .then(res => res.data);
};

export const GetProjectInfor = ()=>{
    return axios.get(`${base}/ProjectManage/GetProjectInfor`)
        .then(res => res.data);
};

export const DeleteProject = (params)=>{
        return axios.post(`${base}/ProjectManage/DeleteProject`,params)
        .then(res => res.data);
};

export const GetProjectInforByCode = (params)=>{
    return axios.get(`${base}/ProjectManage/GetProjectInforByCode`,{params:params})
        .then(res => res.data);
};

export const ProjectUpdate = (params)=>{
    return axios.post(`${base}/ProjectManage/ProjectUpdate`,params)
        .then(res => res.data);
};

export const GetProjectChange = (params)=>{
    return axios.get(`${base}/ProjectManage/GetProjectChange`,{params:params})
        .then(res => res.data);
};
//项目详细信息
export const GetAllProjectInfor = (params)=>{
    return axios.get(`${base}/Public/GetAllProjectInfor`,{params:params})
        .then(res => res.data);
};

export const ProjectCooperateCompanyInsert = (params)=>{
    return axios.post(`${base}/ProjectManage/ProjectCooperateCompanyInsert`,params)
        .then(res => res.data);
};

export const GetAllCooperateCompany = (params)=>{
    return axios.get(`${base}/Public/GetAllCooperateCompany`,{params:params})
        .then(res => res.data);
};

//财务管理界面接口

export const GetCooperateCompanyFinance = ()=>{
    return axios.get(`${base}/ProjectManage/GetCooperateCompanyFinance`)
        .then(res => res.data);
};

export const CompanyFinanceInsert = (params)=>{
    return axios.post(`${base}/ProjectManage/CompanyFinanceInsert`,params)
        .then(res => res.data);
};

export const GetCompanyFinanceInforById = (params)=>{
    return axios.get(`${base}/ProjectManage/GetCompanyFinanceInforById`,{params:params})
        .then(res => res.data);
};

export const CompanyFinanceUpdate = (params)=>{
    return axios.post(`${base}/ProjectManage/CompanyFinanceUpdate`,params)
        .then(res => res.data);
};

export const GetBuyerFinance = ()=>{
    return axios.get(`${base}/ProjectManage/GetBuyerFinance`)
        .then(res => res.data);
};

export const GetFinanceInforById = (params)=>{
    return axios.get(`${base}/ProjectManage/GetFinanceInforById`,{params:params})
        .then(res => res.data);
};

export const BuyerFinanceUpdate = (params)=>{
    return axios.post(`${base}/ProjectManage/BuyerFinanceUpdate`,params)
        .then(res => res.data);
};

export const BuyerFinanceInsert = (params)=>{
    return axios.post(`${base}/ProjectManage/BuyerFinanceInsert`,params)
        .then(res => res.data);
};

//进度接口

export const GetProgressInfor = (params)=>{
    return axios.get(`${base}/ProjectManage/GetProgressInfor`,{params:params})
        .then(res => res.data);
};

export const ProgressInsertOrUpdate = (params)=>{
    return axios.post(`${base}/ProjectManage/ProgressInsertOrUpdate`,params)
        .then(res => res.data);
};