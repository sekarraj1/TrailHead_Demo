({
	doInit : function(component, event, helper) {
		//To get the state List
		var action = component.get("c.getState");
        action.setCallback(this,function(data){
            component.set("v.selectedLookUpRecord",data.getReturnValue());
        });
        $A.enqueueAction(action);
	},
    getCounty : function(component, event, helper){
        var parentValue = component.find('parentPicklist').get('v.value');
        var state = component.get("v.selectedValue");
        var getStateIdbyName = component.get("c.getStateId");
        getStateIdbyName.setParams({
            "StateName":state
        });
		getStateIdbyName.setCallback(this, function(response) {
            // alert(res.getState()+'trdt');
           component.set("v.stateId",response.getReturnValue());
            if(res.getState() === "SUCCESS"){
              // component.set("v.stateId",res.getReturnValue());
            }
        });
        
        if(parentValue !=''){
            component.set('v.disabledPick',false);
            helper.getCountyData(component,parentValue);
        } else {
            component.set('v.disabledPick',true);

        }

        $A.enqueueAction(getStateIdbyName);
    },
    handleEvent :function(component, event, helper){
        
    },
    doCreateRecord : function(component, event, helper){
        var value = component.get("v.candidateAPN");
		var stateVal = component.get("v.selectedCounty");
		var state = component.get("v.selectedValue");


				//component.set("v.candidateAPN", component.get("v.candidateAPN").replace(/\s/g, ""));
				helper.checkClaimStatus(component);
		}
    
})