public without sharing class ClaimCandidateController {
	@AuraEnabled
    public static Acq_Opportunity__c retriveCandidateDetails(String apn, String county, ID state) {
        List<Acq_Opportunity__c> candidates;
        State__c s;
        String status;
        String uniqueApn;
        if(county != '' && state != null) {
            s = [SELECT Name FROM State__c WHERE Id = :state];
            if(s != null){
                uniqueApn = apn + '-' + county + '-' + s.Name;
            } else {
                uniqueApn = apn + '-' + county;
            }
            candidates = [SELECT ID, Address__r.Street__c, Address__r.City__c,
                            Address__r.Zip__c, Address__r.County__c, Address__r.State__r.Name
                    FROM Acq_Opportunity__c
                    WHERE Unique_APN__c =:uniqueApn limit 1];

        } else {
            candidates = [SELECT ID, Address__r.Street__c, Address__r.City__c,
                            Address__r.Zip__c, Address__r.County__c, Address__r.State__r.Name
                    FROM Acq_Opportunity__c
                    WHERE APN__c =:apn limit 1];
        }
        return candidates[0];
    }	
    @AuraEnabled
    public static List<String> getListingSource(){
        List<String> options1 = new List<String>();
        Schema.DescribeFieldResult fieldResult = Acq_Opportunity__c.listing_source__c.getDescribe();
        List<Schema.PicklistEntry> plel = fieldResult.getPicklistValues();
        for(Schema.PicklistEntry f:plel){
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