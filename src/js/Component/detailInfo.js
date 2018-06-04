/*页面下方的详细信息区域*/
import {GetDataBySurveyRecord} from '../interface/BaseSituation'
import areaTree from '../Component/areaTree'
import riverList from '../Component/riverList'


const TABLE = $("#detailInfoTable")
export default{
	init,hide,show
}

async function init(ds){
	
	$(`#footer a[data-toggle="tab"]`)
	.on('shown.bs.tab', function (e) {
		console.log(e)
		//e.target // newly activated tab
		//e.relatedTarget // previous active tab
		//$("#footer #detailInfo").html(e.target.innerHTML)

		let tableName = e.target.id
		let zqdm = areaTree.getSelected()[0]['tag']
		let riverCode = riverList.getSelections()[0]['riverCode']
		let searchEr = ds.searchEr
		let searchTime = ds.searchTime

		console.log(tableName,zqdm,riverCode,searchEr,searchTime)
		GetDataBySurveyRecord(tableName,zqdm,riverCode,searchEr,searchTime)
		.then((data)=>{
			console.log(data)
			fetchData()
		})
	})

	$("#footer a#Farms").tab('show')
}

function hide(id){
	$(`#footer a#${id}`).hide()

}

function show(id){
	$(`#footer a#${id}`).show()
}

function getCurrentTarget(){
	return $(`#footer li.active`)
}

function fetchData(data){
	console.log('fetchData')
}
