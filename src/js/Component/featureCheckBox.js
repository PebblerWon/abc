

let E = $("#featureCheckBox")

async function init(){
	for(let item of window.app.features){
		let item2 = $(`
			<label>
				<input name="featureCheckBox" type="checkbox" value="${item['id']}" />
				<span>${item['text']}</span>
			</label>
		`)
		E.append(item2)
	}
	E.find("input:first").prop("checked",true)
	E.find("input").on('click',(e)=>{
		let sel = getSelected(e)
		if(sel.length==0){
			e.preventDefault()
		}
			
	})
}

function getSelected(e){
	let a = E.find("input[name='featureCheckBox']")
	let sel = []
	for(let item of a){
		let i = $(item)
		if(i.prop("checked"))
			sel.push(i.val())
	}
	return sel
}

export default{
	init
}

