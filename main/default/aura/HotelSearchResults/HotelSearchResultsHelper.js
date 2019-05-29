({
	onSearch: function(component,helper,hotelTypeId){        
        var action = component.get("c.getHotels");
        var params = {"hotelTypeId" : hotelTypeId};
        if (params) {
            action.setParams(params);
        }
        action.setCallback(this , function(response){
            var state = response.getState();
            //console.log(state);
            if (state === "SUCCESS"){
                var hotels = response.getReturnValue();
            	component.set("v.hotels", hotels);
            } else if (state === "INCOMPLETE") {
                // show a toast or create a callback to control this state as well.
                console.log("Failed to connect Salesforce!!");
            }else if (state === "ERROR") {
                var errors = response.getError();
                if (!errors) {
                    errors = [{"message" : "Unknown Error Occured"}];
                }
                
                /*if(failureCallback){
                    failureCallback.call(this,errors);
                }*/
                
                console.log(errors);
            }
            
        });
        
        $A.enqueueAction(action);
    }
})