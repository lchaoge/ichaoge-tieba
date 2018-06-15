/*
 * Description: UrlMapping后台接口
 * Author: chaoge
 * Date: 2018/05/23
*/


export default class UrlMapping {
	constructor(){
		this.isLocalHost = window.location.host.toLowerCase() == 'http://localhost:8080';
		this.origin = window.location.origin;
		
		this.POST_QUERYCOMMONINFO = (this.isLocalHost?'/apis':this.origin)+'/wumart/partner/queryCommonInfo';                 
		this.POST_QUERYSUBJECTTYPE = (this.isLocalHost?'/apis':this.origin)+'/wumart/partner/querySubjectType';              
		
	}
	
}
