
/*加载插件*/
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import '../public/bootstrap-treeview.min.css'
import '../public/bootstrap-treeview.min.js'
import esriLoader from 'esri-loader'
import {GiSApiUrl,TDTUrl,TileInfoObj} from './js/util/mapConfig'
/*加载插件*/

import {UserIsLogin} from './js/interface/UserInterface'
import {initTreeData} from './js/Component/areaTree'

async function main(){
	window.app={
		map:undefined,currentTool:undefined
	}
	
	/**/
	let userInfo = await UserIsLogin("admin","123456")
	console.log(userInfo)
	/**/

	/*为菜单按钮绑定点击事件*/
	$('.headerBtn').click((e)=>{
		console.log(e.target.id)
		require('./js/util/test')()
	})
	/*为菜单按钮绑定点击事件*/

	/*加载行政区划树*/
	let tree = await initTreeData()
	$('#areaTree').treeview({data: tree});
	/*加载行政区划树*/

	/*加载地图*/
	esriLoader.loadModules([
			"esri/map",
			"esri/layers/ArcGISDynamicMapServiceLayer",
			'esri/geometry/Point','esri/graphic',
			'esri/SpatialReference',
			"esri/layers/FeatureLayer","esri/symbols/SimpleLineSymbol",
			"esri/renderers/SimpleRenderer","esri/Color",
			"esri/layers/WebTiledLayer",
		    "esri/layers/TileInfo",
	    ], 
	    {url:GiSApiUrl}
	)
	.then(([
		Map,
		ArcGISDynamicMapServiceLayer,
		Point,Graphic,
		SpatialReference,
		FeatureLayer,SimpleLineSymbol,
		SimpleRenderer, Color,
		WebTiledLayer,TileInfo,
		domClass, domConstruct, on,
		]) => {
			// create map with the given options at a DOM node w/ id 'mapNode'
			var map = window.app.map;
			map = new Map('map', {
			  	zoom:8,
	          	logo:false
			});
			console.log(map === window.app.map)
			map.on("layers-add-result", init);

			let tileInfo = new TileInfo(TileInfoObj)
	       	let imgMap = new WebTiledLayer(TDTUrl.ImgUrl, {
	            "id": "TiandituImg",
	            "subDomains": ["t0", "t1", "t2"],
	            "tileInfo": tileInfo
	        });

	        //底图标注
	        let imgMapMarker = new WebTiledLayer(
	        	TDTUrl.MarkerUrl, {
	            "id": "TiandituImgMarker",
	            "subDomains": ["t0", "t1", "t2"],
	            "tileInfo": tileInfo
	        });
	        map.addLayers([imgMap,imgMapMarker])
	        function init(e){
		  		console.log(map === window.app.map)
		  		map.centerAt(new Point([113.52,34.58],new SpatialReference({ wkid:4326 })))
			}
	})
	.catch(err => {
	  // handle any script or module loading errors
	  console.error(err);
	});
	/*加载地图*/

	
}

function headerBtnHandleClick(clickBtnid){
	let currentTool =window.app.currentTool
	let newCurrentTool = clickBtnid
	switch(newCurrentTool){
		case "":

	} 
}


main()
