<template>
	<view class="user_center">
		<!-- 用户信息开始 -->
		<view class="user_info_wrap">
			<!--获取头像-->
			<button class="user_image" open-type="chooseAvatar" @chooseavatar="onChooseAvatar"> 
				    <image v-if="if_show" :src="(this.baseUrl+'/image/userAvatar/'+userInfo.avatarUrl)"></image>

			</button> 
			<view class="user_name">
				<input type="nickname" placeholder="请输入昵称" v-model="userInfo.nickName" @blur="onChangeNickName">
			</view>
		</view>
		<!-- 用户信息结束 -->
		
		<!-- 用户菜单开始 -->
		<view class="user_menu_wrap">
			<view class="user_menu_item" >
				<text>历史日记</text>
			</view>
			<view class="user_menu_item" >
				<text>分享日记</text>
			</view>
		</view>
		<!-- 用户菜单结束 -->
		
		<!-- 用户信息修改开始 -->
		<view class="user_info_modify_wrap">
			<view class="user_info_modify_wrap_item" >
				<text>联系小戈戈</text>
			</view>
		</view>
		<!-- 用户信息修改结束 -->
	</view>
</template>

<script>
	import {getBaseUrl,requestUtil} from "../../util/requestUtil.js"
	import {isEmpty} from "../../util/stringUtil.js"
	export default{
		data(){
			return{
				userInfo:{
					nickName:'',
					avatarUrl:''
				},
				baseUrl:'',
				if_show:false
			}
		},

		onLoad() {
			this.getUserInfo()
			this.baseUrl=getBaseUrl();
		},
		methods:{
			getUserInfo:async function(){
				const result=await requestUtil({url:'/user/getUserInfo',method:'get'});
				this.userInfo=result.currentUser;
				this.if_show = true
			},
			onChangeNickName:async function(e){
				console.log(e.detail.value)
				let nickName=e.detail.value;
				if(!isEmpty(nickName)){
					const result=await requestUtil({url:'/user/updateNickName',data:{nickName:nickName},method:'post'});
				}
			},
			onChooseAvatar:function(e){
				console.log(e.detail.avatarUrl);
				uni.uploadFile({
					header:{token:uni.getStorageSync("token")},
					url:getBaseUrl()+"/user/updateUserImage",
					filePath:e.detail.avatarUrl,
					name:"userImage",
					success: (res) => {
						let result=JSON.parse(res.data);
						if(result.code==0){
							this.userInfo.avatarUrl=result.userImageFileName
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.user_center{
		.user_info_wrap{
			width: 100%;
			height: 120rpx;
			display: flex;
			flex-direction: row;
			background-color: white;
			padding-left: 50rpx;
			.user_image{
				width: 120rpx;
				height: 120rpx;
				text-align: center;
				padding: 0rpx;
				margin: 0rpx;
				image{
					width: 110rpx;
					height: 110rpx;
				}
			}
			.user_name{
				display: flex;
				flex-direction: column;
				justify-content: center;
				padding-left: 20rpx;
				padding-bottom: 15rpx;
			}
		}
		.user_menu_wrap{
			margin: 15rpx;
			margin-top: 20rpx;
			background-color: #fff;
			.user_menu_item{
				padding: 20rpx;
			    padding-left: 35rpx;
			    border-bottom: 5rpx solid #F6F6F4;
			}
		}
		.user_info_modify_wrap{
			margin: 15rpx;
			margin-top: 20rpx;
			background-color: #fff;
			padding: 20rpx 0;
			padding-left: 35rpx;
		}
	}
</style>