({
	doInit : function(component, event, helper) {
		var action = component.get("c.getListingSource");
        var inputsel1 = component.find("ListingSourceDynamic");
        var opts1=[];
        action.setCallback(this,function(a){
            for(var i=0;i<a.getReturnValue().length;i++){
                opts1.push({"class":"optionClass",label:a.getReturnValue()[i],value:a.getReturnValue()[i]});
            }
           inputsel1.set("v.options",opts1); 
        });
        $A.enqueueAction(action);
        var action = component.get("c.getListingScenario");
        var inputsel2 = component.find("ListingScenarioDynamic");
        var opts2=[];
        action.setCallback(this, function(a) {
            for(var i=0;i< a.getReturnValue().length;i++){
                opts2.push({"class": "optionClass", label: a.getReturnValue()[i], value: a.getReturnValue()[i]});
            }
            inputsel2.set("v.options", opts2);

        });
        $A.enqueueAction(action);
	},
    closeMe : function(component, event, helper) {
		helper.closeMe(component);
	},
})