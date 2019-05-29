({
	closeMe : function(component)  { 
        component.destroy();
        $A.get('e.force:refreshView').fire();
	},
    getPicklistValues : function(component) {
        var action = component.get("c.getListingSource");
        var inputsel1 = component.find("ListingSourceDynamic");
        var opts1=[];
        action.setCallback(this, function(a) {
            for(var i=0;i< a.getReturnValue().length;i++){
                opts1.push({"class": "optionClass", label: a.getReturnValue()[i], value: a.getReturnValue()[i]});
            }
            inputsel1.set("v.options", opts1);

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

    validateZip : function(component, event) {
        console.log('Starting the validate zip');
        var zip = component.find("zip");
        var action = component.get("c.validateZipFromSettings");
        action.setParams({
            "zip" : zip.get("v.value")
        });
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {
                console.log("Got the response for Validation... !!");
                console.log("Fire event - ZIP is " + zip.get("v.value") );
                component.set("v.zipValid", a.getReturnValue());
                console.log("---> response.getReturnValue()" +a.getReturnValue());
                if(a.getReturnValue() == false)
                {
                    alert('Please enter a zip code that is within a valid market.')
                }
                else if(a.getReturnValue() == true)
                {
                    this.validateEnteraLogic(component, event);
                }
            } else if (a.getState() === "ERROR") {
                $A.log("Errors", a.getError());
            }
        });
        $A.enqueueAction(action);
    },
    validateEnteraLogic : function(component, event) {
    	//Start with the Entera logic before validation of address.
    	//If Entera logic validation is successful, then go to Validate Candidate
    	
        var zip = component.find("zip");
        var action = component.get("c.checkEnteraClaim");
        action.setParams({
            "zip" : zip.get("v.value"),
            "ListingSourceDynamic" : component.get("v.ListingSource"),
            "ListingScenarioDynamic" : component.get("v.ListingScenario"),
            "ListingDate" : component.get("v.listingDate")
        });
        action.setCallback(this, function(a) {
            if (a.getState() === "SUCCESS") {
                console.log("validateEnteraLogic---> response.getReturnValue()" +a.getReturnValue());
                if(a.getReturnValue() == false)
                {
                    alert('Cannot create & claim the opportunity')
                }
                else if(a.getReturnValue() == true)
                {
                    this.validateCandidate(component, event);
                }
            } else if (a.getState() === "ERROR") {
                $A.log("Errors", a.getError());
            }
        });
        $A.enqueueAction(action);
    },
	validateCandidate : function(component, event) {
        console.log('Fire the ChangeToValidateScreen event');
        var compEvent = component.getEvent("moveToValidate");
        var street = component.find("street");
        var city = component.find("city");
        var zip = component.find("zip");
        var county = component.find("county");
        console.log('Fire event - County is ' + county.get("v.value"));
        console.log('Fire event - ListingSource is' + component.get("v.ListingSource"))
        compEvent.setParams({
            "street" : street.get("v.value"),
            "city" : city.get("v.value"),
            "zip" : zip.get("v.value"),
            "county" : county.get("v.value"),
            "state" : component.get("v.state"),
            "lstnSource" : component.get("v.ListingSource"),
            "lstnScenario" : component.get("v.ListingScenario"),
            "lstnDate" : component.get("v.listingDate")
        });
        compEvent.fire();
        component.destroy();
    }
})