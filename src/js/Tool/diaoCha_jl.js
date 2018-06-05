import riverList from '../Component/riverList'
import areaTree from '../Component/areaTree'
import detailInfo from '../Component/detailInfo'
import diaoCha_jl_c from '../Controler/diaoCha_jl_c'
import {SearchItemBaseSituation} from '../interface/BaseSituation'

let thisBtn = $("#diaoCha_jl")
let R = $("#right")

module.exports ={
	init,dispose
}  

//该工具的注销方法
function dispose(){
	thisBtn.removeClass('btn-primary')
	thisBtn.addClass('btn-default')
	R.empty()
	R.hide()
	detailInfo.dispose()
}

//该工具的注册方法
function init(){
	let tableId = 'diaoCha_jl_Table'
	thisBtn.removeClass('btn-default')
	thisBtn.addClass('btn-primary')
	R.show()
	R.empty()
	let obj = new diaoCha_jl_c(tableId)
	R.append(obj)

	let TABLE = $(`#${tableId}`)
	TABLE.bootstrapTable({
	    columns: [{
	    	radio:true,
	    	class:'hidden'
	    },{
	        field: 'riverCode',
	        class:'hidden'
	    },{
	        field: '序号',
	        title: '序号',
	        align: 'center'
	    },{
	        field: '调查人',
	        title: '调查人',
	        align: 'center'
	    },{
	        field: '调查时间',
	        title: '调查时间',
	        align: 'center'
	    },{
	        field: '自检',
	        title: '自检',
	        align: 'center'
	    },{
	        field: '审核',
	        title: '审核',
	        align: 'center'
	    }],
	    formatNoMatches:()=>"无记录",
	    clickToSelect:true,
	    onClickRow:(row)=>{
	    	console.log(row)
	    	//bootstrapTable没有点击后事件，所以将
	    	//点击后事件放在定时器中执行
	    	setTimeout(
	    		()=>{surveyItemsingleClick.call(null,row)},
	    		0
	    	)
	    }
	});


	let selectRiver = riverList.getSelections()
	let selectArea = areaTree.getSelected()
	if(selectRiver.length==0){
		
	}else{
		let riverCode = selectRiver[0]['riverCode']
		let regionCode = selectArea[0]['tag']

		SearchItemBaseSituation(regionCode, riverCode).then((data)=>{
			let a = JSON.parse(data).data
			console.log(a)
			TABLE.bootstrapTable('load',a)
		})
	}
}

/*调查记录的单击事件*/
function surveyItemsingleClick(row){
	console.log(row)
	let ds = {
		dataSource:'diaoCha_jl',
		searchEr:row['调查人'],
		searchTime:row['调查时间']
	}
	detailInfo.init(ds)
}