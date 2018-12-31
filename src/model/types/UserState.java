package model.types;

public enum UserState {

	NORMAL, BLOCKED;
	
	public static UserState parseString(String value) {
		switch (value.toUpperCase()) {
		case "NORMAL"  : return NORMAL;
		case "BLOCKED" : return BLOCKED;
		default        : return NORMAL;
		}
	}
}
