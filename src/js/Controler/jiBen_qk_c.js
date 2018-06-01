

export default function jiBen_qk_c(
	RiverNam="",
	RiverType="",
	IsHasBeware="",
	RiverLength="",
	BottomWidth="",
	MouthWidth="",
	Depth="",
	Note=""
){
	let  e = `
	<div class="jiBen_qk_c">
		<form class="form-horizontal">
		<fieldset disabled>
			<div class="form-group">
			    <label  class="control-label">河流名称</label>
			    <input  class="form-control"  value=${RiverNam}>
			</div>
		  	<div class="form-group">
			    <label  class="control-label">河道类型</label>
			    <input  class="form-control"  value=${RiverType}>
		  	</div>
		  	<div class="form-group">
			    <label  class="control-label">有无堤防</label>
			    <input  class="form-control"  value=${IsHasBeware}>
		  	</div>
		  	<div class="form-group">
			    <label  class="control-label">河段长度</label>
			    <input  class="form-control"  value=${RiverLength}>
		  	</div>
		  	<div class="form-group">
			    <label  class="control-label">底宽</label>
			    <input  class="form-control"  value=${BottomWidth}>
		  	</div>
		  	<div class="form-group">
			    <label  class="control-label">口宽</label>
			    <input  class="form-control"  value=${MouthWidth}>
		  	</div>
		  	<div class="form-group">
			    <label  class="control-label">深度</label>
			    <input  class="form-control"  value=${Depth}>
		  	</div>
		  	<div class="form-group">
			    <label  class="control-label">备注</label>
			    <input  class="form-control"  value=${Note}>
		  	</div>
		</fieldset>
		</form>
	</div>
	`
	return $(e)
}

