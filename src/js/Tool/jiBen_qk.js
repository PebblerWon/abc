import riverList from '../Component/riverList'
import jiBen_qk_c from '../Controler/jiBen_qk_c'
import {RiverBaseSituation} from '../interface/BaseSituation'

let thisBtn = $("#jiBen_qk")
let R = $("#right")

module.exports ={
	init,dispose
}  

//该工具的注销方法
function dispose(){
	thisBtn.removeClass('btn-primary')
	thisBtn.addClass('btn-default')
	R.empty()
	R.hide()
}

//该工具的注册方法
function init(){
	thisBtn.removeClass('btn-default')
	thisBtn.addClass('btn-primary')
	R.show()

	let selectRiver = riverList.getSelections()
	if(selectRiver.length==0){
		R.empty()
		let obj = new jiBen_qk_c()
		R.append(obj)
	}else{
		let riverCode = selectRiver[0]['riverCode']
		RiverBaseSituation(riverCode).then((data)=>{
			let a = JSON.parse(data).data
			R.empty()
			let obj = new jiBen_qk_c(
				a['河流名称'],
				a['河道类型'],
				a['有无堤防'],
				a['底宽'],
				a['口宽'],
				a['深度'],""
			)
			R.append(obj)
		})
	}
}