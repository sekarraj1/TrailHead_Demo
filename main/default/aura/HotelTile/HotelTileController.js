({
	onHotelClick : function(component, event, helper) {
        var hotelSelectEvent = component.getEvent("onHotelSelect");
        hotelSelectEvent.setParams({"hotelId" : component.get("v.hotel").Id});
        hotelSelectEvent.fire();
        
        //To retrieve the application event - event type is the required one.
        var hotelSelectedEvent = $A.get("e.c:HotelSelected");
        hotelSelectedEvent.setParams({"hotel" : component.get("v.hotel")});
        hotelSelectedEvent.fire();
        
        var hotel = component.get("v.hotel");
        var plotMapMarkerEvent = $A.get("e.c:PlotMapMarker");
        plotMapMarkerEvent.setParams(
            {
                "lat": hotel.Geolocation__Latitude__s,
                "sObjectId": hotel.Id,
                "long": hotel.Geolocation__Longitude__s,
                "label":hotel.Name 
            }
        );
        plotMapMarkerEvent.fire();
        //console.log("event triggered");
    }
})