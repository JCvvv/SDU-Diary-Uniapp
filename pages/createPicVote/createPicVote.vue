<template>
	<view class="word_vote">
		<view class="cover_img">
			<view class="title_tip">
				<view class="cover">
					日记封面
				</view>
				<view class="tip">
					（ 宽高比：650 × 300 ）
				</view>
			</view>
			<view class="upload_img">
				<uni-file-picker 
				@select="selectCoverFileFunc($event)"
				:auto-upload="false" 
				limit="1"
				:del-icon="true" 
				disable-preview 
				file-mediatype="image" 
				:imageStyles="coverImageStyles">
					<view class="upload">
						<text class="uploadImg">&#xe727;</text>
					</view>
				</uni-file-picker>
			</view>
		</view>
		
		<view class="basic_settings">
			<view class="title_tip">
				<view class="title">
					日记内容
				</view>
			</view>
			<view class="settings">
				<view class="title">
					<input type="text"  v-model="title" placeholder="填写心情标签"  placeholder-style="color:#bababa;font-size:16px"/>
				</view>
				<view class="explanation">
					<textarea v-model="explanation" placeholder="投票说明 (非必填)" placeholder-style="color:#bababa;font-size:14px"></textarea>
				</view>
			</view>
		</view>
		
		<view class="vote_options_settings">
			<view class="title_tip">
				<view class="title">
					心情标签
				</view>
			</view>
			<view class="option_list">
				<view class="option_item" v-for="(item,index) in options" :key="item.id">
					<text class="removeOption" @click="removeOption(item.id)">&#xe618;</text><input type="text" v-model="item.name" placeholder="写点什么吧" placeholder-style="color:#bababa;font-size:14px">
				</view>
			</view>
			<view class="option_add" @click="addOption()">
				<text class="addOption">&#xe660;</text><text>添加选项</text>
			</view>
		</view>
		
	</view>
	
	<view class="vote_btn" >
		<button type="primary" @click="submitVote">发起投票</button>
	</view>
</template>

<script>
	import {getBaseUrl, requestUtil} from "../../util/requestUtil.js"
	import {isEmpty} from "../../util/stringUtil.js"
	import {timeFormat} from "../../util/dateUtil.js"
	export default{
		data(){
			const curDate=new Date();
			const vv=new Date(curDate.getTime()+24*60*60*1000);
			return{
				title:'',
				explanation:'',
				coverImageFileName:'',
				coverImageStyles: {
					width:"700rpx",
					height:"400rpx",
					border:false
				},
				voteEndTime:timeFormat(vv),
				options:[
					{
						id:1,
						name:''
					},
					{
						id:2,
						name:''
					}
				]
			}
		},
		computed:{
			startDate(){
				return new Date();
			},
			endDate(){
				const curDate=new Date();
				const vv=new Date(curDate.getTime()+24*60*60*1000*365);
				return vv;
			}
		},
		methods:{
			addOption:function(){
				var option={
					id:this.options[this.options.length-1].id+1,
					name:''
				}
				this.options.push(option);
			},
			removeOption:function(id){
				const index=this.options.findIndex(v=>v.id===id)
				if(index!=0)this.options.splice(index,1);
			},
			selectCoverFileFunc:function(e){
				console.log(e.tempFilePaths[0])
				uni.uploadFile({
					header:{token:uni.getStorageSync("token")},
					url:getBaseUrl()+"/vote/uploadCoverImage",
					filePath:e.tempFilePaths[0],
					name:"coverImage",
					success: (res) => {
						let result=JSON.parse(res.data);
						if(result.code==0){
							this.coverImageFileName=result.coverImageFileName;
						}
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	@import "/common/css/iconfont.css";
	.word_vote{
		padding: 20px;
		padding-bottom: 70px;
		.cover_img{
			.title_tip{
				margin-left: 10rpx;
				font-size: 26rpx;
				color: gray;
				display: flex;
				justify-content: space-between;
			}
			.upload_img{
				border-radius: 5px;
				margin-top: 20rpx;
				width:100%;
				height: 360rpx;
				background-color: white;
				display: flex;
				align-items: center;
				justify-content: center;
				.upload{
					margin: 10rpx;
					background-color: #f4f5f7;
					width:90%;
					height: 80%;
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
		}
		
		.basic_settings{
			margin-top: 20px;
			.title_tip{
				margin-left: 10rpx;
				font-size: 26rpx;
				color: gray;
				margin-bottom: 10px;
				.title{
					
				}
			}
			.settings{
				
				border-radius: 5px;
				background-color: white;
				.title{
					padding: 10px;
					input{
						font-size: 1.3rem;
						border-bottom: 1px solid #e4e4e4;
						padding-bottom: 15px;
					}
				}
				.explanation{
					padding: 10px;
					textarea{
						height: 100px;
					}
				}
			}
			
		}
		
		.vote_options_settings{
			margin-top: 20px;
			.title_tip{
				margin-left: 10rpx;
				font-size: 26rpx;
				color: gray;
				margin-bottom: 10px;
				.title{
					
				}
			}
			.option_list{
				.option_item{
					margin-top: 10px;
					border-radius: 5px;
					background-color: white;
					padding: 10px;
					display: flex;
					
				}
			}
			.option_add{
				margin-top: 10px;
				border-radius: 5px;
				background-color: white;
				padding: 10px;
				display: flex;
				color:blue;
				font-size:14px
			}
		}
		
		.vote_rules_settings{
			margin-top: 20px;
			.title_tip{
				margin-left: 10rpx;
				font-size: 26rpx;
				color: gray;
				margin-bottom: 10px;
				.title{
					
				}
			}
			.rule_list{
				border-radius: 5px;
				background-color: white;
				.rule_item{
					display: flex;
					justify-content: space-between;
					padding: 12px;
					border-bottom: 1px solid #e4e4e4;
					font-size: 28rpx;
					align-items: center;
					height: 45rpx;
				}
			}
		}
		
	}
	
	.vote_btn{
		height: 120rpx;
		width: 100%;
		background-color: white;
		position: fixed;
		bottom: 0;
		border-top: 1px solid #e4e4e4;
		button{
			margin: 10px;
		}
	}
</style>