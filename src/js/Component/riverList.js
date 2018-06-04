import clickHandle from './clickHandle'

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
	    onClickCell:(field, value, row)=>{
	    	//bootstrapTable没有点击后事件，所以将
	    	//点击后事件放在定时器中执行
	    	setTimeout(
	    		()=>{clickHandle()},
	    		0
	    	)
	    }
	});
}

function load(data){
	/*console.log(data)*/
	E.bootstrapTable('load',data)
}

function getSelections(){
	return E.bootstrapTable('getSelections')
}
export default{
	init,load,getSelections
}