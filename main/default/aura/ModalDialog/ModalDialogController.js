({
	closeMe : function(component, event, helper) {
        var refreshState = component.get("v.doRefresh");
		helper.closeMe(component,refreshState);
	}
})