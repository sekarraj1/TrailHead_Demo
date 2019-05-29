({
	getCountyData : function(component,Selectedstate) {
		var getCounty = component.get("c.getCountyList");
        getCounty.setParams({
            'state':Selectedstate
        });
        getCounty.setCallback(this, function(response) {
            if(response.getState() =='SUCCESS'){
               
                var countyData = response.getReturnValue();
                component.set('v.candidateCounty',countyData);
            } 
               
           
        });
     $A.enqueueAction(getCounty);
	},
    checkClaimStatus : function(component){
        var action = component.get("c.checkClaim");
        var candidateAPN = component.get("v.candidateAPN");
        var candidateCounty = component.get("v.selectedCounty");
        var stateName = component.get("v.selectedValue");
        var stateID = component.get("v.stateId").Id;
        action.setParams({
            "apn" : candidateAPN,
            "county" : candidateCounty,
            "state" : stateID
        });
        action.setCallback(this,function(a){
            if(a.getState()==="SUCCESS"){
                var candidateStatus = a.getReturnValue();
                //alert(candidateStatus);
               /*if(candidateStatus == 'Claim Candidate') {
                    this.toastFunction("success","Opportunity Already exists.", "Claim the opportunity.");
                    $A.createComponent(
                        "c:ClaimCandidate",
                        {
                            "candidateAPN": candidateAPN,
                            "body" : candidateCounty
                        },
                        function(msgBox){
                            if (component.isValid()) {
                                var targetCmp = component.find('ModalDialogPlaceholder');
                                var body = targetCmp.get("v.body");
                                body.push(msgBox);
                                targetCmp.set("v.body", body);
                            }
                        }
                    );
                } else */
                if(candidateStatus == 'New Candidate') {
                     alert(candidateStatus);
                    this.toastFunction("success","Creating New Opportunity.", "Opportunity does not exists, creating new.");
                	$A.createComponent(
                        "c:CreateNewCandidate",
                        {
                            "apn" : candidateAPN,
                            "county" : candidateCounty,
                            "state" : stateID,
                            "selectedLookUpRecord" : component.get("v.selectedLookUpRecord")
                        },
                        function(msgBox){
                            if (component.isValid()) {
                                var targetCmp = component.find('ModalDialogPlaceholder');
                                var body = targetCmp.get("v.body");
                                body.push(msgBox);
                                targetCmp.set("v.body", body);
                            }
                        }
                    );
                } else{
                    this.toastFunction("error","Error !!", "Please try again.");
                }
            }
        });
        $A.enqueueAction(action);
    },
    toastFunction : function(type, title, message) {
        var toastEvent = $A.get("e.force:showToast");
        toastEvent.setParams({
            "type" : type,
            "title" : title,
            "message" : message
        });
        toastEvent.fire();
    }
})