public with sharing class SearchCandidateController {
    @AuraEnabled
    public static String checkClaim(String apn, String county, Id state) {
        //Null check
        system.debug(apn+county+state);
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
            candidates = [
                SELECT  ID
                        , Property_Claimed__c
                FROM    Acq_Opportunity__c
                WHERE   Unique_APN__c = :uniqueApn
                    AND (Status__c != 'Dead' AND Broker_Offer_Status__c != 'Rejected')
            ];

        } else {
            candidates = [SELECT ID, Property_Claimed__c
                        FROM Acq_Opportunity__c
                        WHERE APN__c =:apn];
        }


        if(candidates.size() > 1) {
            //More candidate with same APN, county and state
            //status = 'More than 1 candidate';
            status = 'No County OR State';
        } else if(candidates.size() == 1) {
            for(Acq_Opportunity__c c : candidates){
                If(c.Property_Claimed__c == false){
              		status = 'Claim Candidate'; //Allow to claim candidate - Claim candidate
				} else if (c.Property_Claimed__c == true) {
					status = 'Candidate Claimed'; //Sorry you cannot claim the property - toast
				}
            }
        } else {
            //Create a new Candidate
            status = 'New Candidate';
        }

        return status;

    }
    @AuraEnabled
    public static List<State__c> getState(){
        return[SELECT id,Name
              FROM State__c
              ORDER by Name];
    }
    
    @AuraEnabled
    public static State__c getStateId(String StateName){
        return[select id from State__c where Name=:StateName];
    }
    @AuraEnabled
    public static List<County__c> getCountyList(String state){
        return[select id,Name,State__r.Name from County__c where State__r.Name=:state order by Name];
    }

}