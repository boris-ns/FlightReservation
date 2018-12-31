package model.types;

public enum UserType {

	REGULAR, ADMIN;
	
	public static UserType parseString(String value) {
		switch (value.toUpperCase()) {
		case "REGULAR" : return REGULAR;
		case "ADMIN"   : return ADMIN;
		default        : return null;
		}
	}
}
