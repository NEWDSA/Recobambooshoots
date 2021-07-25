/**
 * ip地址域名
 * */
// const ipAddress='http://10.68.2.9/CenMacauCMS2'

// 测试服务器地址
// if (process.env.NODE_ENV === 'production') {

    let moBaseUrl = 'http://10.68.2.9' //澳门服务器
    let moBaseUrlfemal = 'http://mo.centanet.com/' //澳門正式服務器
    let hkBaseUrl = 'https://hk.centanet.com/' //香港服务器
    let hqBaseUrl = 'https://hq.centaline.com.cn/' //横琴服务器

    let frontMacau = 'testmacau/' //前台页面地址
    let member = 'Member/' //会员系统后台地址
    let CenMacauCMS = 'CenMacauCMS2/' //澳门官网后台
    let moDataCharts = 'MODataCharts/' //澳门成交报告后台地址
// }
// end 测试服务器地址

// 正式服务器地址
// if (process.env.NODE_ENV === 'development') {

//     let moBaseUrl = 'https://mo.centanet.com/' //澳门服务器
//     let hkBaseUrl = 'https://hk.centanet.com/' //香港服务器
//     let hqBaseUrl = 'https://hq.centaline.com.cn/' //横琴服务器

//     let frontMacau = '' //前台页面地址
//     let member = 'Member/' //会员系统后台地址
//     let CenMacauCMS = 'CenMacauCMS' //澳门官网后台
//     let moDataCharts = 'MODataCharts/' //澳门成交报告后台地址
// }
// end 正式服务器地址


const getmoBaseUrl=()=>{
    return moBaseUrl
}

const gethkBaseUrl=()=>{
    return hkBaseUrl
}

const gethqBaseUrl=()=>{
    return hqBaseUrl
}

const getmoBaseUrlfemal=()=>{
    return moBaseUrlfemal
}


export default {
    baseUrl:getmoBaseUrl(),
    hkBaseUrl:gethkBaseUrl(),
    hqBaseUrl:gethqBaseUrl(),
    moBaseUrl:getmoBaseUrl(),
    moBaseUrlfemal:getmoBaseUrlfemal()
}


