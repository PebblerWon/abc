/*页面下方的详细信息区域*/
import Viewer  from 'viewerjs'
import {imageRootUrl} from '../util/config.js' 
import {GetDataBySurveyRecord} from '../interface/BaseSituation'
import areaTree from '../Component/areaTree'
import riverList from '../Component/riverList'



const TABLE = $("#detailInfoTable")
const F = $("#footer")
export default{
	init,dispose,hideTab,showTab
}

async function init(ds){
	F.show()
	$(`#footer a[data-toggle="tab"]`)
	.on('shown.bs.tab', function (e) {
		let tableName = e.target.id
		let zqdm = areaTree.getSelected()[0]['tag']
		let riverCode = riverList.getSelections()[0]['riverCode']
		let searchEr = ds.searchEr
		let searchTime = ds.searchTime

		console.log(tableName,zqdm,riverCode,searchEr,searchTime)
		GetDataBySurveyRecord(tableName,zqdm,riverCode,searchEr,searchTime)
		.then((data)=>{
			fetchData(JSON.parse(data).data)
		})
	})

	$("#footer a:first").tab('show')

	let tableName = getCurrentTarget()['id']
	let zqdm = areaTree.getSelected()[0]['tag']
	let riverCode = riverList.getSelections()[0]['riverCode']
	let searchEr = ds.searchEr
	let searchTime = ds.searchTime
	GetDataBySurveyRecord(tableName,zqdm,riverCode,searchEr,searchTime)
	.then((data)=>{
		fetchData(JSON.parse(data).data)
	})
}

function dispose(){
	/*取消事件绑定*/
	$(`#footer a[data-toggle="tab"]`).off('shown.bs.tab')
	TABLE.bootstrapTable('destroy')
	F.hide()
}

function hideTab(id){
	$(`#footer a#${id}`).hide()

}

function showTab(id){
	$(`#footer a#${id}`).show()
}

function getCurrentTarget(){
	return $(`#footer li.active>a`)[0]
}

function fetchData(data){
	TABLE.bootstrapTable('destroy')
	let cls = [{
	    	radio:true,
	    	class:'hidden'
	    }]
	let value = []
	if(data.length!=0)
	{
		for(var key in data[0]){
			let a = {field:key,title:key,align:'center'}
			if(key=="图片路径"||key=="Id"){
				a['class']='hidden'
			}else if(key=="是否自检"||key=="是否审核"){
				a['formatter']=(value)=>{
					if(value=="True")
						return '是'
					else
						return '否'
				}
			}
			cls.push(a)
		}
		cls.push({
			field:'图片',
			title:'图片',
			align:'center',
			formatter:(value,row,index)=>{
				return `<span style="color:blue;" class="glyphicon glyphicon-picture"></span>`
			}
		})

		
		TABLE.bootstrapTable({
		    columns:cls,
		    data:data,
		    formatNoMatches:()=>"无记录",
		    clickToSelect:true,
		    formatter:(field,row,index)=>{
		    	console.log(field,row,index)
		    },
		    onClickCell:(field, value, row)=>{
		    	//bootstrapTable没有点击后事件，所以将
		    	//点击后事件放在定时器中执行
		    	let Dom = document.getElementById('imageViewer')
		    	if(field=="图片"){
		    		let imageUrl = row['图片路径']
		    		
		    		if(imageUrl!=""){
		    			let $ul = $(`#imageViewer`)
		    			$ul.empty()
		    			let imgs = imageUrl.split(',')
		    			for(let item of imgs){
			    			let $li = $(`<li><img src="${imageRootUrl+item}" /></li>`)
			    			$ul.append($li)
			    		}

				    	let viw = new Viewer(Dom).show()

				    	Dom.addEventListener('hidden', function () {
						  viw.destroy()
						  // -> true
						}, false);
				    }else{
				    	alert("无图片")
			    		
			    	}
			    }
		    	
		    }
		})	
	}else{
		TABLE.bootstrapTable({
		    columns:[{
	    		radio:true,
	    		class:'hidden'
		    }],
			    data:[],
			    formatNoMatches:()=>"无记录",
			})	
	}
	
}
