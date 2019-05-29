({
    getAccountData : function(component){
        //Load the Account data from apex
        var action = component.get("c.getAccounts");
        var toastReference = $A.get("e.force:showToast");
        action.setParams({name:"sekar"});
        action.setCallback(this,function(response){
            var state = response.getState();
            if(state == "SUCCESS"){
                var accountWrapper = response.getReturnValue();
                if(accountWrapper.success){
                    //Setting data to be displayed in table
                    component.set("v.accountData",accountWrapper.accountsList);
                    toastReference.setParams({
                        "type" : "Success",
                        "title" : "Success",
                        "message" : accountWrapper.message,
                        "mode" : "dismissible"
                    });
                } // handel server side erroes, display error msg from response 
                else{
                    toastReference.setParams({
                        "type" : "Error",
                        "title" : "Error",
                        "message" : accountWrapper.message,
                        "mode" : "sticky"
                    }); 
                }
            } // handel callback error 
            else{
                toastReference.setParams({
                    "type" : "Error",
                    "title" : "Error",
                    "message" : 'An error occurred during initialization '+state,
                    "mode" : "sticky"
                });
            }
            toastReference.fire();
        });
        $A.enqueueAction(action);
    }
})