import {Host} from '../util/config'
const interFaceName = "RiverInterface.asmx"

const GetRiverListByRegionCodeUrl = Host + interFaceName + '/DSCDToRiverModel'

	
function GetRiverListByRegionCode( regionCode){
	return new Promise(function(resolve,reject){
		$.ajax({
			method:'post',
			url:GetRiverListByRegionCodeUrl,
			data:{
				RegionCode:regionCode
			},
			success:(data)=>{
				let a = JSON.parse(data)

				resolve(a.riverInf)
			},
			error:(err)=>{
				reject(err)
			}
		})
	})
}

export{
	GetRiverListByRegionCode
}