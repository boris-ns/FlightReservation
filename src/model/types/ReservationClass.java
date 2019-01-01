package model.types;

public enum ReservationClass {

	FIRST_CLASS, BUSSINESS_CLASS, ECONOMY_CLASS;
	
	public static ReservationClass parseString(String value) {
		switch (value.toUpperCase()) {
		case "FIRST_CLASS"     : return FIRST_CLASS;
		case "BUSSINESS_CLASS" : return BUSSINESS_CLASS;
		case "ECONOMY_CLASS"   : return ECONOMY_CLASS;
		default                : return null;
		}
	}
}
