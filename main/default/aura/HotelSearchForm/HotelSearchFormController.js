({
	doInit : function(component, event, helper) {
        
        var createNewBoat = $A.get("e.force:createRecord");
        if (createNewBoat) {
            component.set("v.showNewButton", true);
        }else{
             component.set("v.showNewButton", false);
        }
        var action = component.get("c.getHotelTypes");

        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.htypes", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
    
        // Send action off to be executed
        $A.enqueueAction(action);
            
        },
    handleChange:function(component, event, helper) {
        var y=component.find("hotelTypes").get("v.value");
        console.log("val :  "+ y);
        component.set("v.selectedType",component.find("hotelTypes").get("v.value"));
    },
    onFormSubmit:function(component, event, helper) {
        debugger
        // var myEvent = $A.get("e.c:BoatSearchEvent");
        // myEvent.setParams({"typeId": component.get("v.selectedType")});
        // myEvent.fire();
        console.log("selectType "+ component.get("v.selectedType") );
        var hotelTypeId = component.get("v.selectedType");
        console.log("Search button pressed " + hotelTypeId);
        var formSubmit = component.getEvent("formsubmit");
        formSubmit.setParams({
            "formData":{"hotelTypeId" : hotelTypeId}
        });
        formSubmit.fire();
        }
})