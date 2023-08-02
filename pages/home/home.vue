<template>
	
	<view class="create_vote_list">
		<view class="vote_list">
			<block v-for="(value,index) in voteList" :key="index">
				<view class="vote_item" >
					<view v-if="value.type==2" class="vote_item_pic"/>
					<view v-if="value.type==1" class="vote_item_word"/>
					<view class="vote_item_body">
						<view class="vote_item_title">{{value.title}}</view>
						
							<view v-if="judgeDate(value.voteEndTime)>=0" class="vote_item_status_over">
								{{value.voteEndTime}}
							</view>
							<view v-if="judgeDate(value.voteEndTime)<0" class="vote_item_status_progressive">
								{{value.voteEndTime}}
							</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
	import {getBaseUrl, requestUtil} from "../../util/requestUtil.js"
	import {isEmpty} from "../../util/stringUtil.js"
	import {judgeDate} from "../../util/dateUtil.js"
	export default{
		
		data(){
			return{
				voteList:[]
			}
		},
		onLoad() {
			this.getVoteList();
		},
		methods:{
			getVoteList:async function(){
				const result=await requestUtil({url:"/vote/listOfUser",method:"get"});
				console.log(result);
				this.voteList=result.voteList;
			},
			judgeDate:function(toDate){
				return judgeDate(toDate);
			}
		}
		
	}
</script>

<style lang="scss">
	@import "/common/css/iconfont.css";
	.create_vote_list{
		padding: 10px;
		.vote_list{
			.vote_item{
				border-radius: 5px;
				background-color: white;
				display: flex;
				width: 100%;
				flex-direction: row;
				margin-bottom: 15px;
				.vote_item_pic{
					background: url("../../static/image/pic.png") no-repeat center;
					width: 3.0rem;
					height: 3.0rem;
					margin-right: 0.425rem;
					background-size:cover;
					margin: 30rpx;
				}
				.vote_item_word{
					background: url("../../static/image/smile.png") no-repeat center;
					width: 3.0rem;
					height: 3.0rem;
					margin-right: 0.425rem;
					background-size:cover;
					margin: 30rpx;
				}
				.vote_item_body{
					height: auto;
					display: flex;
					flex: 1;
					flex-direction: column;
					justify-content: space-around;
					align-items: flex-start;
					overflow: hidden;
					.vote_item_title{
						font-size: 1.2rem;
						overflow: hidden;
						width: 100%;
						font-weight: bolder;
						padding-top: 10px;
					}
					.vote_item_status_progressive{
					
						width: 100%;
						line-height: 1.1375rem;
						font-size: 0.9rem;
						padding-bottom: 10px;
						color: blue;
					}
					.vote_item_status_over{
					
						width: 100%;
						line-height: 1.1375rem;
						font-size: 0.9rem;
						padding-bottom: 10px;
						color: gray;
					}
				}
			}
		}
	}
</style>