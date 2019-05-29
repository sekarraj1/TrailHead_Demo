({
 
    doInit: function(component, event, helper) {
        // call the helper function on component load
        helper.getChildRecors(component, event);
    },
 
    addSelected: function(component, event, helper) {
        // create array[list] type temp. variable for store child record's id's from selected checkboxes.  
        var tempIDs = [];
 
        // get(find) all checkboxes with aura:id "checkBox"
        var getAllId = component.find("checkBox");
 
        // play a for loop and check every checkbox values 
        // if value is checked(true) then add those Id (store in Text attribute on checkbox) in tempIDs var.
        for (var i = 0; i < getAllId.length; i++) {
            
          if (getAllId[i].get("v.value") == true) {
                tempIDs.push(getAllId[i].get("v.text"));
            }
        }
 
        // call the helper function and pass all selected record id's.   
        helper.addSelectedHelper(component, event, tempIDs);
    },
})