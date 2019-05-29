public class HotelSearchController {
    @AuraEnabled
    public static List<Hotel_Type__c> getHotelTypes() {
        List<Hotel_Type__c> hotelTypes = new List<Hotel_Type__c>();
        hotelTypes = [select Id,Name from Hotel_Type__c];
       	return hotelTypes;
    }
    @AuraEnabled
    public static List<Hotel__c> getHotels(String hotelTypeId) {
        List<Hotel__c> hotels = new List<Hotel__c>();
        if (String.isEmpty(hotelTypeId)) {
            hotels = [select Id,Name,Picture__c from Hotel__c ];
        } else{
            hotels = [select Id,Name,Picture__c from Hotel__c where Hotel_Type__c = :hotelTypeId ];
        }
        
        return hotels;
    }

}