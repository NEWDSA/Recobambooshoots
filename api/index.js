import Vue from 'vue'
import MinRequest from '@/utils/MinRequest'
import globalConfig from '@/config'

const minRequest = new MinRequest()

// 请求拦截器
minRequest.interceptors.request((request) => {
	return request
})

// 响应拦截器
minRequest.interceptors.response((response) => {
	return response.data
})

// 设置默认配置
minRequest.setConfig((config) => {
	config.baseURL = globalConfig.baseUrl
	return config
})

export default {
	//统一管理api请求
	apis: {
		// 登录验证
		logverfi(params) {
			return minRequest.post('/Api/Login/SendVerificationCode', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		//会员登录
		memberLogin(params) {
			return minRequest.post('/Api/Login/UserLogin', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 微信登录
		wxlogin(params) {
			return minRequest.post('/Api/Login/WechatLogin', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 绑定会员手机号
		bindmobphone(params) {
			return minRequest.post('/Api/AppUser/BindingPhone', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 修改会员手机号
		modifymuberphone(params) {
			return minRequest.post('/Api/AppUser/ModifyPhone', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 获取会员信息
		memberinfo(params) {
			return minRequest.get('/Api/AppUser/ModifyPhone', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 修改会员信息
		modifymemberinfo(params) {
			return minRequest.post('/Api/AppUser/EditAppUser', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 修改会员头像
		modifyAvatar(params) {
			return minRequest.post('/Api/AppUser/UploadHeaderImg', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 经纪人登录
		broker(params) {
			return minRequest.post('/Api/Login/StaffLogin', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 获取经纪人信息
		brokerinfo(params) {
			return minRequest.get('/Api/Agency/GetStaff', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 获取员工列表
		stafflist(params) {
			return minRequest.get('/Api/StaffManage/GetList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		//房源详情经纪人推介、经纪人信息
		ListingDetail(params) {
			return minRequest.get('/Api/Building/GetSales', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 会员获取已经绑定的经纪人
		memberbrokers(params) {
			return minRequest.get('/Api/Agency/GetBingAgency', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 获取会员经纪人互动详情列表
		memberbrokerslist(params) {
			return minRequest.get('/Api/Agency/QueryAgencyInteraction', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		//绑定经纪人
		Boundbroker(params) {
			return minRequest.post('/Api/Agency/PropertyBindAgency', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 获取我的客户列表
		customlist(params) {
			return minRequest.get('/Api/Agency/GetBingCustomer', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 获取客户互动详情列表
		customInteractive(params) {
			return minRequest.get('/Api/Agency/QueryCustomerInteraction', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 经纪人拨打电话
		brokerCall(params) {
			return minRequest.post('/Api/Agency/PhoneCall', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 资讯列表
		newsList(params) {
			return minRequest.post('/Api/Article/GetListWithNoStyle', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取焦点新盘列表
		FocusNews(params) {
			return minRequest.post('/Api/Article/GetAllFocusOneHand', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取焦点新盘详情
		FocusNewsDetails(params) {
			return minRequest.get('/Api/Article/GetFocusOneHandDetail', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 焦点新盘预约看楼
		FocusHouseAppro(params) {
			return minRequest.post('/Api/Article/HighInsertC_Reserve', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 提交网上放盘
		SubmitOnlineListing(params) {
			return minRequest.post('/Api/OnlinePlay/SaveOnlinePlay', {
				...params
			}, {
				// baseURL: globalConfig.baseUrl + 'testmacau/'
				baseURL:globalConfig.baseUrl+':8015'
			})
		},
		// 获取活动列表
		activeList(params) {
			return minRequest.get('/Api/Activities/GetList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取活动详情
		activeDetails(params) {
			return minRequest.get('/Api/Activities/GetActivityDetail', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 活动报名
		activeReg(params) {
			return minRequest.get('/Api/Activities/GetActivityDetail', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 视频搵楼列表
		videoChatList(params) {
			return minRequest.post('/Api/SearchByVideo/GetList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取视频搵楼推荐
		VideoChatRecommend(params) {
			return minRequest.get('/Api/SearchByVideo/GetRecommendList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取视频搵樓详情
		VideoChatDetails(params) {
			return minRequest.get('/Api/SearchByVideo/GetVideoDetail', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取楼盘天书分区列表
		EstatesBookPartitionlist(params) {
			return minRequest.get('/Api/EstatesBook/GetBookAreaList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取楼盘天书列表
		EstatesBooklist(params) {
			return minRequest.get('/Api/EstatesBook/GetBookList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取楼盘天书详情
		EstatesBookDetail(params) {
			return minRequest.get('/Api/EstatesBook/GetDetail', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取横琴分行网络列表
		HQNetwork(params) {
			return minRequest.get('/Api/BranchNetwork/GetList', {
				...params
			}, {
				baseURL: globalConfig.hqBaseUrl
			})
		},
		// 获取澳门分行网络列表
		MacauNetwork(params) {
			return minRequest.get('/Api/BranchNetwork/GetList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取大湾区联展站
		DWStation(params) {
			return minRequest.get('/Api/Exhibition/GetExhibitionList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取训练学院列表
		TraningSchool(params) {
			return minRequest.post('/Api/TechTest/QuestionList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 数据分析头部数据
		DataAnalysis(params) {
			return minRequest.get('/Api/TransactionData/GetAvgPrice', {
				...params
			}, {
				baseURL: globalConfig.moBaseUrlfemal + 'MODataCharts/'
			})
		},
		// 查询成交筛选 获取筛选条件
		Transfilter(params) {
			return minRequest.get('/Api/TransactionData/GetParameters', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 成交楼盘列表
		PropertyList(params) {
			return minRequest.get('/Api/TransactionData/GetList', {
				...params
			}, {
				baseURL: globalConfig.moBaseUrl + 'MODataCharts/'
			})
		},
		// 获取地图找房分区
		mapFindRoom(params) {
			return minRequest.get('/Api/EstatesBook/GetMapBuildingList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取地图找房房源列表
		mapFindListings(params) {
			return minRequest.get('/Api/EstatesBook/GetMapRoomsList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取城区分区数据
		CityZoneData(params) {
			return minRequest.get('/Api/Building/GetDistricts', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 房源列表
		LitingsList(params) {
			return minRequest.post('/Api/Building/GetList', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取附近楼盘列表
		nearbyBuildList(params) {
			return minRequest.get('/Api/Building/GetNearbyListings', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取经纪人推荐楼盘
		BrokerArpovList(params) {
			return minRequest.get('/Api/Building/GetSalesBuilding', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取房源详情
		LitingsDetail(params) {
			return minRequest.get('/Api/Building/GetBuilding', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		},
		// 获取会员系统房源详情我的笔记
		MyNote(params) {
			return minRequest.get('/Api/Building/QueryNoteOne', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 会员系统房源详情添加笔记
		AddNote(params) {
			return minRequest.post('/Api/Building/InsertNote', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/Member/'
			})
		},
		// 获取会员系统房源详情我的照片
		MyPhoto(params) {
			return minRequest.get('/Api/Building/QueryPhoto', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/Member/'
			})
		},
		// 会员系统房源详情上传照片
		UploadImg(params) {
			return minRequest.post('/Api/Building/UploadPhoto', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/Member/'
			})
		},
		// 会员系统上传视频
		UploadVideo(params) {
			return minRequest.post('/Api/Building/UploadVideo', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/Member/'
			})
		},
		// 会员系统房源详情删除文件
		UploadDelFile(params) {
			return minRequest.post('/Api/Building/RemovePhoto', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/Member/'
			})
		},
		// 获取我的喜爱
		favorite(params) {
			return minRequest.get('/Api/BuildingFavorite/QueryFavorite', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/Member/'
			})
		},
		// 添加我的喜爱
		AddFavorite(params) {
			return minRequest.post('/Api/BuildingFavorite/AddFavorite', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/Member/'
			})
		},
		// 取消我的喜爱
		CancelFavorite(params) {
			return minRequest.post('/Api/BuildingFavorite/CancelFavorite', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/Member/'
			})
		},
		// 获取我的浏览记录
		BrowsingHistory(params) {
			return minRequest.get('/Api/PropertyBrowserHistory/QueryBrowserHistory', {
				...params
			}
				, {
					baseURL: globalConfig.baseUrl + '/Member/'
				})
		},
		// 添加浏览记录
		AddBrowing(params) {
			return minRequest.post('/Api/PropertyBrowserHistory/InsertBrowserHistory', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/Member/'
			})
		},
		// 删除浏览记录
		RemoveBrowing(params) {
			return minRequest.post('/Api/PropertyBrowserHistory/RemoveBrowserHistory', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/Member/'
			})
		},
		// 获取我的看楼记录
		ViewRecordBuild(params) {
			return minRequest.get('/Api/LookPropertyRecord/QueryPropertyLook', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/Member/'
			})
		},
		// 添加带看
		AddWatch(params) {
			return minRequest.post('/Api/LookPropertyRecord/AddPropertyLook', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + 'Member/'
			})
		},
		// 获取我的邀请人
		MyInviter(params) {
			return minRequest.get('/api/Invitation/GetInvitationUser', {
				...params
			}, {
				baseURL: globalConfig.moBaseUrl + 'CenMacauCMS/'
			})
		},
		// 绑定我的邀请人
		BindInviter(params) {
			return minRequest.get('/api/Invitation/BindInvitationUser', {
				...params
			}, {
				baseURL: globalConfig.moBaseUrl + 'CenMacauCMS/'
			})
		},
		// 获取我邀请的人
		InviterOfMy(params) {
			return minRequest.get('/api/Invitation/GetInvitationUserList', {
				...params
			}, {
				baseURL: globalConfig.moBaseUrl + 'CenMacauCMS/'
			})
		},
		//获取首页轮播图
		Banner(params) {
			return minRequest.get('/Api/HomePager/CoverImages', {
				...params
			}, {
				baseURL: globalConfig.baseUrl + '/CenMacauCMS2/'
			})
		}



	}
}