let thisBtn = $("#jiBen_qk")
let R = $("#right")
let F = $("#footer")

module.exports ={
	init,dispose
}  

//该工具的注销方法
function dispose(){
	thisBtn.removeClass('btn-primary')
	thisBtn.addClass('btn-default')
	R.hide()
	F.hide()
}

//该工具的注册方法
function init(){
	thisBtn.removeClass('btn-default')
	thisBtn.addClass('btn-primary')
	R.show()
	F.show()
}