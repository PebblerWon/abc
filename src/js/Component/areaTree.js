import {GetAreaTree} from '../interface/AreaInterface'

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

export{
	initTreeData
}