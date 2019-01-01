package model;

import model.types.DestinationState;

public class Destination {

	private String name;
	private String country;
	private String airportName;
	private String airportCode;
	private String location; // coordinates for google maps ?
	private String imagePath;
	private DestinationState state;
	
	
	public Destination() {
	}

	public Destination(String name, String country, String airportName, String airportCode, String location,
			String imagePath, DestinationState state) {
		this.name = name;
		this.country = country;
		this.airportName = airportName;
		this.airportCode = airportCode;
		this.location = location;
		this.imagePath = imagePath;
		this.state = state;
	}

	@Override
	public String toString() {
		return "Destionation [name=" + name + ", country=" + country + ", airportName=" + airportName + ", airportCode="
				+ airportCode + ", location=" + location + ", imagePath=" + imagePath + ", state=" + state + "]";
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getAirportName() {
		return airportName;
	}

	public void setAirportName(String airportName) {
		this.airportName = airportName;
	}

	public String getAirportCode() {
		return airportCode;
	}

	public void setAirportCode(String airportCode) {
		this.airportCode = airportCode;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public DestinationState getState() {
		return state;
	}

	public void setState(DestinationState state) {
		this.state = state;
	}
}
