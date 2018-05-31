import {Host} from '../util/config'
const interFaceName = "AreaInterface.asmx"

const GetAreaTreeUrl = Host + interFaceName + '/GetAreaTree'
const UserslogoutUrl = Host + interFaceName + '/Userslogout'
const UsersUpdateUrl = Host + interFaceName + '/UsersUpdate'
const CreateUserUrl = Host + interFaceName + '/CreateUser'
const SearchUserUrl = Host + interFaceName + '/SearchUser'
const DeleteUserUrl = Host + interFaceName + '/DeleteUser'

	
function GetAreaTree( UserName){
	return new Promise(function(resolve,reject){
		$.ajax({
			method:'post',
			url:GetAreaTreeUrl,
			data:{
				UserName:UserName
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
	GetAreaTree
}