package model.types;

public enum DestinationState {

	ACTIVE, ARCHIVED;
	
	public static DestinationState parseString(String value) {
		switch (value.toUpperCase()) {
		case "ACTIVE"   : return ACTIVE;
		case "ARCHVIED" : return ARCHIVED;
		default         : return null;
		}
	}
}
