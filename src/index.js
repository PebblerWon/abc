
/*加载插件*/
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.js'
import '../public/bootstrap-treeview.min.css'
import '../public/bootstrap-treeview.min.js'
import esriLoader from 'esri-loader'
/*加载插件*/

import {GiSApiUrl,TDTUrl,TileInfoObj} from './js/util/mapConfig'
import {UserIsLogin} from './js/interface/UserInterface'
import areaTree from './js/Component/areaTree'
import riverList from './js/Component/riverList'


var _ = window.app = {
	map:undefined,
	currentTool:undefined,
	loading:0
}

async function main(){
	/*为全局绑定ajax加载事件*/
	bindAjaxLoading()
    /*为全局绑定ajax加载事件*/

   
	/**/
	let userInfo = await UserIsLogin("admin","123456")
	//console.log(userInfo)
	/**/

	/*为菜单按钮绑定点击事件*/
	$('.headerBtn').click((e)=>{
		//console.log(e.target.id)
		headerBtnHandleClick(e.target.id)
	})
	/*为菜单按钮绑定点击事件*/

	/*加载行政区划树*/
	areaTree.init()
	/*加载行政区划树*/

	/*加载河流*/
	riverList.init()
	/*加载河流*/

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
			_.map = new Map('map', {
			  	zoom:8,
	          	logo:false
			});
			_.map.on("layers-add-result", init);

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
	        _.map.addLayers([imgMap,imgMapMarker])
	        function init(e){
	        	$("#loading").hide()
		  		_.map.centerAt(new Point([113.52,34.58],new SpatialReference({ wkid:4326 })))
			}
	})
	.catch(err => {
	  // handle any script or module loading errors
	  console.error(err);
	});
	/*加载地图*/

	
}

main()

function bindAjaxLoading(){
	$(document).bind("ajaxSend", function () {
		window.app.loading++;
		if(window.app.loading>0)
        	$("#loading").show();
    }).bind("ajaxComplete", function () {
    	window.app.loading--;
    	if(window.app.loading==0)
        	$("#loading").hide();
    });
}

function headerBtnHandleClick(clickBtnid){
	//点击之前的工具是什么
	let oldCurrentTool = window.app.currentTool
	//把当前工具设置为点击的工具
	



	try{
		if(oldCurrentTool == clickBtnid){
			window.app.currentTool = undefined
			require('./js/Tool/'+clickBtnid).dispose()
		}else{
			window.app.currentTool = clickBtnid

			if(oldCurrentTool!=undefined)
				require('./js/Tool/'+oldCurrentTool).dispose()
			
			require('./js/Tool/'+clickBtnid).init()
		}
	}catch(err){
		console.log(err)
	}
}



