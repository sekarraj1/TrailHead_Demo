({
	closeMe : function(comp) {
		comp.destroy();
        $A.get('e.force:refreshView').fire();
	},
    getCandidateDetails : function(comp) {
        var action = comp.get("c.retriveCandidateDetails");
        action.setParams({
            "apn" : comp.get("v.candidateAPN")
        });
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {
                console.log("Got the candidate !!");
                comp.set("v.opp", a.getReturnValue());
            } else if (a.getState() === "ERROR") {
                $A.log("Errors", a.getError());
            }
        });
        $A.enqueueAction(action);
    }
})