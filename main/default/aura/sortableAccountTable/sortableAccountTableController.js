({
    onInit : function(component,event,helper){
        // Setting column information.To make a column sortable,set sortable as true on component load
        component.set("v.accountColumns",[
            {
                label : 'Name',
                fieldName : 'Name',
                type : 'text',
                sortable : true
            },
            {
                label : 'Account Source',
                fieldName : 'AccountSource',
                type : 'text',
                sortable : true
            },
            {
                label : 'Rating',
                fieldName : 'Rating',
                type : 'text',
                sortable : true
            },
            {
                label : 'Employees',
                fieldName : 'NumberOfEmployees',
                type : 'number',
                sortable : true
            }
        ]);
        // call helper function to fetch account data from apex
        helper.getAccountData(component);
    },
    showCaseDeleteModal : function(component,event,helper){
        var idx = event.target.id;
        var getAccId = $A.get("e.c:ContactListEvent");
        getAccId.setParams({"accoId":idx});
        getAccId.fire();
        
    }
})