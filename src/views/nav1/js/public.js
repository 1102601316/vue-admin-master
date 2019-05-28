import {getBrenchList} from "../../../api/api";

export const GetDepartmentStr = (code) => {
    var result = "";
    switch (code) {
        case "1":
            result = "总裁室";
            break;
        case "2":
            result = "行政部";
            break;
        case "3":
            result = "财务部";
            break;
        case "4":
            result = "人事部";
            break;
        case "5":
            result = "市场部";
            break;
        case "6":
            result = "商务部";
            break;
        case "7":
            result = "软件部";
            break;
        case "8":
            result = "测绘部";
            break;
        case "9":
            result = "地址工程与国土事物部";
            break;
        case "10":
            result = "技术总监办";
            break;
        case "11":
            result = "遥感应用部";
            break;
        case "12":
            result = "不动产登记部";
            break;
    }

    return result;
};

export const renderTime = (date) => {
    var resultDate = "";
    if (date != "" && date != null) {
        var jsonDate = new Date(parseInt(date.replace("/Date(", "").replace(")/", "").split("+")[0]));
        var resultDate = jsonDate.getFullYear() + "-" + (jsonDate.getMonth() + 1) + "-" + jsonDate.getDate();
    }
    return resultDate;
};

//获取部门
export const GetBrenchList = () => {
    return getBrenchList().then(res => {
        this.brenchs = res.data
    }).catch(reject => {
        alert(reject)
    });
}
// export const objectSpanMethod =({row, column, rowIndex, columnIndex})=>{
//
// }
//    获取目录
export const getmenuList = () => {
    return getUsrPromise().then(res => {
        res.data.forEach((item, index) => {
            item.Children.forEach((item1, index) => {
                item1.CatalogUrl = item1.CatalogUrl.replace('.html', '');
            })
        });
        this.menus = res.data
    }).catch(reject => {
        alert(reject)
    });
};


export const people = function(){
    // debugger;
    return function(){
       console.log(111)
    }()
}