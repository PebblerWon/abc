import $ from 'jquery'
import {Host} from '../util/config'
const interFaceName = "baseSituation.asmx"

const RiverBaseSituationUrl = Host + interFaceName + '/RiverBaseSituation'

	
function RiverBaseSituation( riverCode){
	return new Promise(function(resolve,reject){
		$.ajax({
			method:'post',
			url:RiverBaseSituationUrl,
			data:{
				riverCode:riverCode
			},
			success:(data)=>{
				resolve(data)
			},
			error:(err)=>{
				reject(err)
			}
		})
	})
}

export{
	RiverBaseSituation
}