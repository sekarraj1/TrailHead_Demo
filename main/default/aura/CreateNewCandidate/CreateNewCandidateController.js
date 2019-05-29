({
    doInit : function(component, event, helper) {
        //Get the picklist values for listing source and senario
		helper.getPicklistValues(component);
	},
 	closeMe : function(component, event, helper) {
		helper.closeMe(component);
	},
	validateCandidate : function(component, event, helper) {
	    //Check if empty
	    console.log('VALIDATE CANDIDATE..');
	    var street = component.find("street");
        var city = component.find("city");
        var zip = component.find("zip");
        var county = component.find("county");
        var zip1 = component.find("zipValid");
		var value = component.get("v.street1");
        //Added for claiming logic from Entera
        var listingDate = component.get("v.listingDate");
		
        if(street.get("v.value") == '' || city.get("v.value") == '' || zip.get("v.value") == '' || county.get("v.value") == '' || !listingDate) 
        {
            alert('Please enter all of the mandatory fields.');
        }
     
        else 
		{
			if (isNaN(zip.get("v.value")))
			{
                //Validation for Zip from Custom setting
				alert("Please enter a valid zip code.");
			} 
			else
			{				
				helper.validateZip(component, event);
			}
        }

    }
})