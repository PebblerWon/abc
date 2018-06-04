import $ from 'jquery'
import {Host} from '../util/config'
const interFaceName = "baseSituation.asmx"

const RiverBaseSituationUrl = Host + interFaceName + '/RiverBaseSituation'
const SearchItemBaseSituationUrl  = Host + interFaceName + '/SearchItemBaseSituation'
const GetDataBySurveyRecordUrl = Host + interFaceName +'/GetDataBySurveyRecord'

       
       
	
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

function SearchItemBaseSituation(regionCode,riverCode){
	return new Promise(function(resolve,reject){
		$.ajax({
			method:'post',
			url:SearchItemBaseSituationUrl,
			data:{
				regionCode:regionCode,
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

/*根据所选的表名，政区代码，河流代码，调查人，调查时间获取调查记录*/
function GetDataBySurveyRecord(tableName, zqDM, riverDM, DCR, DCSJ){
	return new Promise(function(resolve,reject){
		$.ajax({
			method:'post',
			url:GetDataBySurveyRecordUrl,
			data:{
				tableName:tableName,
				zqDM:zqDM,
				riverDM:riverDM,
				DCR:DCR,
				DCSJ:DCSJ
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
	RiverBaseSituation,SearchItemBaseSituation,GetDataBySurveyRecord
}