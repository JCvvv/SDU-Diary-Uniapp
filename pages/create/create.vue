<template>
	<view class="vote_type">
		<view class="vote_tip_wrap">
			<text class="type_tip">请选择投票类型</text>
			<!-- <text class="share">&#xe739;分享给朋友</text> -->
		</view>
		<view class="type_list">
			<view class="type_item" @click="goWordVote()">
				<view class="type_item_log_word"/>
				<view class="type_item-body">
					<view class="type_item-text-top">文字投票</view>
					<view class="type_item-text-bottom">
						选项为纯文字，使用方便，简单快捷
					</view>
				</view>
			</view>
			<view class="type_item" @click="goPicVote()">
				<view class="type_item_log_pic"/>
				<view class="type_item-body">
					<view class="type_item-text-top">图文投票</view>
					<view class="type_item-text-bottom">
						选项为纯图片，可以上传图片作品进行投票
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			goWordVote:function(){
				uni.navigateTo({
					url:"/pages/createWordVote/createWordVote"
				})
			},
			goPicVote:function(){
				uni.navigateTo({
					url:"/pages/createPicVote/createPicVote"
				})
			}
		}
	}
</script>

<style lang="scss">

	.vote_type{
		padding: 20px;
		.vote_tip_wrap{
			.type_tip{
				font-size: 26rpx;
				color: gray;
			}
		}
		
		.type_list{
			margin-top: 10px;
			.type_item{
				border-radius: 5px;
				background-color: white;
				display: flex;
				width: 100%;
				flex-direction: row;
				margin-bottom: 15px;
				.type_item_log_word{
					background: url("../../static/image/word.png") no-repeat center;
					width: 3.0rem;
					height: 3.0rem;
					margin-right: 0.425rem;
					background-size:cover;
					margin: 30rpx;
				}
				.type_item_log_pic{
					background: url("../../static/image/pic.png") no-repeat center;
					width: 3.0rem;
					height: 3.0rem;
					margin-right: 0.425rem;
					background-size:cover;
					margin: 30rpx;
				}
				.type_item-body{
					height: auto;
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;
					overflow: hidden;
					.type_item-text-top{
					
						font-size: 1.15rem;
						overflow: hidden;
						width: 100%;
						
						font-weight: bolder;
						padding-top: 10px;
					}
					.type_item-text-bottom{
						display: flex;
						flex-direction: row;
						justify-content: space-between;
						width: 100%;
						line-height: 0.9375rem;
						font-size: 0.7125rem;
						color: #8f8f94;
						padding-bottom: 15rpx;
					}
				}
			}
		}
	}
</style>