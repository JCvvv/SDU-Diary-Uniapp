<script>
	import {requestUtil} from "./util/requestUtil.js"
	export default {
		onLaunch: function() {
			console.log('App Launch');
			wx.login({timeout:5000,success: (res) => {
				this.wxlogin(res.code)
			}})
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
		methods:{
			async wxlogin(code){
				console.log("code="+code);
				const result=await requestUtil({url:"/user/wxLogin",data:{code:code},method:"post"});
				console.log("token="+result.token);
				console.log("openid="+result.openid);
				if(result.code==0){
					console.log("登录成功");
					uni.setStorageSync("token",result.token);
					uni.setStorageSync("openid",result.openid);
				}else{
					console.log("登录失败，报错信息："+result.msg);
					uni.showToast({
						icon:"error",
						title:result.msg,
						duration:3000
					})
				}
			}
		}
	}
</script>

<style>
	/*每个页面公共css */
	body,page{
		background-color: #f4f5f7;
	}
</style>
