public without sharing class CreateCandidateController {
    @AuraEnabled
    public static List<String> getListingSource(){
        List<String> options1 = new List<String>();
        Schema.DescribeFieldResult fieldResult = Acq_Opportunity__c.listing_source__c.getDescribe();
        List<Schema.PicklistEntry> ple1 = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry f: ple1) {
            options1.add(f.getLabel());
        }
        return options1;
    }

    @AuraEnabled
    public static List<String> getListingScenario(){
        List<String> options2 = new List<String>();
        Schema.DescribeFieldResult fieldResult = Acq_Opportunity__c.listing_scenario__c.getDescribe();
        List<Schema.PicklistEntry> ple2 = fieldResult.getPicklistValues();
        for (Schema.PicklistEntry f: ple2) {
            options2.add(f.getLabel());
        }
        return options2;
    }
    

}