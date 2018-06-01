import {GetAreaTree} from '../interface/AreaInterface'
import {GetRiverListByRegionCode} from '../interface/RiverInterface'
import riverList from './riverList'
import clickHandle from './clickHandle'

let E = $('#areaTree')





async function init(){
	let tree = await initTreeData()
	E.treeview({data: tree});

	/*
	*	政区树选择事件
	*	根据选择的政区代码获取河流列表
	*/
	E.on('nodeSelected' , (e,data)=>{
		clickHandle()
		
		console.log(e)
		let regionCode = data.tag
		GetRiverListByRegionCode(regionCode).then((res)=>{
			let data = []

			res.forEach(item=>{
				data.push({
					riverCode:item.RiverCode,
					riverName:item.RiverNam
				})
			})

			riverList.load(data)
		})

		console.log(getSelected())
	})
}

function getSelected(){
	return E.treeview('getSelected');
}

export default{
	init,getSelected
}

async function initTreeData(){
	var areaTree = await GetAreaTree('admin')
	var data = [JSON.parse(areaTree).data]
	var tree = processTreeData(data)
	return tree
}
/*处理政区树，删除长度为0的nodes属性*/
function processTreeData(data){
	for(let i = 0; i<data.length;i++){
		let item = data[i]

		for(var key in item){
			if(key=="nodes"){
				if(item[key].length==0){
					delete item.nodes
				}else{
					processTreeData(item.nodes)
				}
				
			}
		}
	}
	return data
}