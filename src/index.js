
/*加载插件*/
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-table/dist/bootstrap-table.min.css'
import 'bootstrap-table/dist/bootstrap-table.min.js'
import 'viewerjs/dist/viewer.min.css'
import '../public/bootstrap-treeview.min.css'
import '../public/bootstrap-treeview.min.js'
import esriLoader from 'esri-loader'
/*加载插件*/

import {GiSApiUrl,TDTUrl,TileInfoObj} from './js/util/mapConfig'
import {UserIsLogin} from './js/interface/UserInterface'
import areaTree from './js/Component/areaTree'
import riverList from './js/Component/riverList'
import {Host} from './js/util/config.js'


var _ = window.app = {
	map:undefined,
	currentTool:undefined,
	loading:0,
	user:undefined,
	features:[
		{id:"Intake", text:"取水口" },
        {id:"Drain", text:"排水口" },
        {id:"Outlet", text:"排污口" },
        {id:"IndustrialPollution", text:"沿河工业企业" },
        {id:"Farms", text:"沿河养殖场" },
        {id:"RiverDump", text:"沿河垃圾" },
        {id:"ResidentialArea", text:"居民聚集区" },
        {id:"RiverSandMining", text:"河道内采砂" },
        {id:"WadingBuilding", text:"涉水建筑物" },
        {id:"Bridge", text:"桥梁" },
        {id:"BarrageDam", text:"拦河闸、坝" },
        {id:"ProductionAndLiving", text:"生产生活污染" },
        {id:"FarmlandOccupation", text:"农田侵占" },
        {id:"RiverAndLakeStatus", text:"河湖现状" },
        {id:"Other", text:"其他"},
        {id:"Dam", text:"水闸" }
	]
}

function initComponent(){
	/*添加底部标签页组件*/
	let $tabUl = $("#footer ul")
	for(let item of window.app.features){
		let newItem = $(`
			<li role="presentation" >
				<a href="#detailInfo" id="${item['id']}"  role="tab" data-toggle="tab">${item['text']}</a>
			</li>`
		)
		$tabUl.append(newItem) 
	}
}


async function main(){
	
	initComponent()


	/*为全局绑定ajax加载事件*/
	bindAjaxLoading()
    /*为全局绑定ajax加载事件*/

   
	/**/
	_.user = await UserIsLogin("admin","123456")
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
	initMap()
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

function initMap(){
	esriLoader.loadModules([
			"esri/map",
			"esri/layers/ArcGISDynamicMapServiceLayer",
			'esri/SpatialReference',
			"esri/layers/FeatureLayer","esri/symbols/SimpleLineSymbol",
			"esri/renderers/SimpleRenderer","esri/Color",
			"esri/layers/WebTiledLayer",
		    "esri/layers/TileInfo",
		    "esri/layers/GraphicsLayer",
		    "esri/geometry/Point",
		    "esri/geometry/Polyline",
		    "esri/geometry/Polygon",
		    "esri/symbol/PictureMarkerSymbol",
		    "esri/symbol/CartographicLineSymbol",
		    "esri/symbol/SimpleFillSymbol",
		    "esri/Graphic",
	    ], 
	    {url:GiSApiUrl}
	)
	.then(([
		Map,
		ArcGISDynamicMapServiceLayer,
		SpatialReference,
		FeatureLayer,SimpleLineSymbol,
		SimpleRenderer, Color,
		WebTiledLayer,TileInfo,GraphicsLayer,
		Point,Polyline,Polygon,PictureMarkerSymbol,
		CartographicLineSymbol,SimpleFillSymbol,
		Graphic,
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

	        /*添加16类要素图层*/
	        for(let item of _.features){
	        	$.ajax({
			        type: "GET",
			        url: `Host/${item.id}Interface.asmx/GetList`,
			        dataType: "json",
			        success: function (data) {
			        	let newGlayer = new GraphicsLayer({id:item.id})

	                    $(data.data).each(function (index, value) {
			                //console.log(IntakeInfo);
			                var coorStr = value.CoordinateStr;
			                var name = value.Name;
			                var id = value.Id;
			                let newGraphic = new myNewGraphic(coorStr, name, id, item.id,item.text)
			                newGlayer.add(newGraphic)
			            });
	                    newGlayer.on("click", function (e) {
	                        e.stopPropagation();
	                        console.log(e);
	                        let geometryType = e.graphic.geometry.type;
	                        let entityName = e.graphic.attributes.entityName;
	                        let Id = e.graphic.attributes.id;
	                        //getInfoByIDService(Id, entityName);
	                        switch (geometryType) {
	                            case "point":
	                                console.log(e.graphic.attributes);
	                                break;
	                            case "polyline":
	                                console.log(e.graphic.attributes)
	                                break;
	                            case "polygon":
	                                console.log(e.graphic.attributes)
	                                break;
	                        }
	                        console.log(geometryType);
	                    })

	                    _.map.addLayer(graphicLayerIntake);
			        }
			    });
	        	
	        }
	        
	        function init(e){
	        	$("#loading").hide()
		  		_.map.centerAt(new Point([113.52,34.58],new SpatialReference({ wkid:4326 })))
			}

			function myNewGraphic(coorStr, name, id, entityName,entityText){
				let lineSymbol = new CartographicLineSymbol(
				  CartographicLineSymbol.STYLE_SOLID,
				  new Color("#0000FF"), 2,
				  CartographicLineSymbol.CAP_ROUND,
				  CartographicLineSymbol.JOIN_MITER, 5
				);

				//用来展示面的symbol
				let fillSymbol = SimpleFillSymbol(
				    SimpleFillSymbol.STYLE_SOLID,
				    new SimpleLineSymbol(
				        SimpleLineSymbol.STYLE_SOLID,
				        new Color('#000'),
				        1
				    ),
				    new Color([255, 0, 0, 0.1])
				);
				let res
				let coorArr = coorStr.split(" ");
			    let length = coorArr.length;
			    let xx, yy;
			    xx = coorArr[0].split(",")[0];
			    yy = coorArr[0].split(",")[1];
			    xx1 = coorArr[length - 1].split(",")[0];
			    yy1 = coorArr[length - 1].split(",")[1];
			    //Attribute参数  
			    let attr = {
			        "name": name,
			        "id": id,
			        "entityName": entityName,
			        "entityText":entityText
			    };
			    if (coorArr.length == 1) {
			        //设置标注的经纬度 
			        let pt = new Point(xx, yy, map.spatialReference);
			        let symbol1 = new PictureMarkerSymbol(`../img/${entityText}.png`, 27, 35);
			        //创建图像  
			        res = new Graphic(pt, symbol1, attr);
			        
			    }else if (coorArr.length > 1 && xx == xx1 && yy == yy1) {//坐标串首尾坐标点相同，为面
			        let path = [];
			        $(coorArr).each(function (index, value) {
			            path.push([value.split(',')[0], value.split(',')[1]]);
			        });
			        let polygon = new Polygon(map.spatialReference);
			        //添加多边形的各个角的顶点坐标，注意：首尾要链接，也就是说，第一个点和最后一个点要一致  
			        polygon.addRing(path);
			        res = new Graphic(polygon, fillSymbol, attr);
			        
			    } else if (coorArr.length > 1 && xx != xx1 || yy != yy1) {//坐标串首尾坐标点不同，为线
			        let path = [];
			        $(coorArr).each(function (index, value) {
			            path.push([value.split(',')[0], value.split(',')[1]])
			        });
			        let line = new Polyline({
			            "paths": [path],
			            "spatialReference": { "wkid": 4326 }
			        });
			        res = new Graphic(line, lineSymbol, attr);
			    }
			    return res
			}
	})
	.catch(err => {
	  // handle any script or module loading errors
	  console.error(err);
	});
}



