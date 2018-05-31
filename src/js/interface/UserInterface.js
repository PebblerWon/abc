import $ from 'jquery'
import {Host} from '../util/config'
const interFaceName = "UserInterface.asmx"

const UserIsLoginUrl = Host + interFaceName + '/UserIsLogin'
const UserslogoutUrl = Host + interFaceName + '/Userslogout'
const UsersUpdateUrl = Host + interFaceName + '/UsersUpdate'
const CreateUserUrl = Host + interFaceName + '/CreateUser'
const SearchUserUrl = Host + interFaceName + '/SearchUser'
const DeleteUserUrl = Host + interFaceName + '/DeleteUser'

	
function UserIsLogin( UserName,  PassWord){
	return new Promise(function(resolve,reject){
		$.ajax({
			method:'post',
			url:UserIsLoginUrl,
			data:{
				UserName:UserName,
				PassWord:PassWord
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
	UserIsLogin
}