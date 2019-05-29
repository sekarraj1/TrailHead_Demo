({
	closeMe : function(comp,refreshState)  { 
        comp.destroy();
        if(refreshState === "true") {
        	$A.get('e.force:refreshView').fire();    
        } else {
            this.gotoList(comp);
        }
	},
    gotoList : function (comp) {
        console.log('in Go to list. ');
        var navEvent = $A.get("e.force:navigateToList");
        navEvent.setParams({
            "listViewName": "My Opportunities",
            "scope": "Acq_Opportunity__c"
        });
        navEvent.fire();
    }
})