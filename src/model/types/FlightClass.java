package model.types;

public enum FlightClass {
	
	CHARTER, REGIONAL, OVERSEAS;
	
	public static FlightClass parseString(String value) {
		switch (value.toUpperCase()) {
		case "CHARTER"  : return CHARTER;
		case "REGIONAL" : return REGIONAL;
		case "OVERSEAS" : return OVERSEAS;
		default         : return null;
		}
	}
}
