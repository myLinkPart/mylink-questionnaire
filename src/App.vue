<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<style lang="scss">
	.logo{
		width: 0.76rem;
		display: block;
		margin: 0 auto;
		padding: 0.27rem 0;
	}
	// 按钮
	.generalButton{
		margin: 0 auto;
		font-size: 0.14rem;
		font-family: Source Han Sans CN;
		font-weight: bold;
		color: #FFFFFF;
		text-align: center;
		.btn{
			padding: 0.11rem 0.2rem;
			border-radius: 0.1rem;
			text-shadow: 1px 1px 2px rgba(1, 75, 145, 0.71);
			background: linear-gradient(0deg, #2193DE 0%, #1981C3 100%);
			box-shadow: 0px 8px 0px 0px #094073, 0px 12px 35px 0px rgba(30, 117, 196, 0.26);
		}
	}
	// 遮罩层
	.mask{
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0,0,0,0.7);
        overflow: auto;
        z-index:1000;
		.box{
			background: #fff;
            position: absolute;
            border-radius: 0.1rem;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
		}
	}
</style>
