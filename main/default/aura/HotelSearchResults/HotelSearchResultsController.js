({
	doInit : function(component, event, helper) {
		helper.onSearch(component,helper,"");
	},
    
    doSearch : function(component, event, helper) {
        var args = event.getParam('arguments');
        if(args) {
            helper.onSearch(component,helper,args.hotelTypeId);
        }
        
    },
    onBoatSelect : function (component, event, helper) {
        var hotelId = event.getParam("hotelId");
        component.set("v.selectedHotelId", hotelId);
    }
})