/*
* 政区树和河流列表的点击事件不仅要触发该控件的功能（获取河流列表等）
* 还要根据已选择的 顶部菜单触发相应的功能
*/

export default function clickHandle(){
	let currentTool = window.app.currentTool
	if(currentTool!=undefined){
		require('../Tool/'+ currentTool).init()
	}
}