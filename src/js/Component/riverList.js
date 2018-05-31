let E =  $('#riverListTable')

async function init(){
	E.bootstrapTable({
	    columns: [{
	    	radio:true,
	    	class:'hidden'
	    },{
	        field: 'riverCode',
	        class:'hidden'
	    },{
	        field: 'riverName',
	        title: '河流名称',
	        align: 'center'
	    }],
	    formatNoMatches:()=>"无河流",
	    clickToSelect:true,
	    onClickRow:(e)=>{
	    	console.log(e)
	    }
	});
}

function load(data){
	console.log(data)
	E.bootstrapTable('load',data)
}

function getSelections(){
	return E.bootstrapTable('getSelections')
}
export default{
	init,load
}