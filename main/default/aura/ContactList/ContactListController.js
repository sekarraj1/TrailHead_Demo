({
	handleApplicationEventFired : function(component, event, helper) {
		var accId = event.getParam("accoId");
        var action = component.get("c.getContacts");
        
        action.setParams({accId:accId});
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                var contactLis = response.getReturnValue();
                component.set("v.contactData", contactLis);
                
            } // handel callback error 
            
        });
        $A.enqueueAction(action);
	}
})