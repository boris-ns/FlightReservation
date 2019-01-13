package model;

public class FlightToEdit extends Flight {

	private String oldFlightId;
	
	public FlightToEdit() {
		super();
	}

	public FlightToEdit(String oldFlightId) {
		super();
		this.oldFlightId = oldFlightId;
	}

	public String getOldFlightId() {
		return oldFlightId;
	}

	public void setOldFlightId(String oldFlightId) {
		this.oldFlightId = oldFlightId;
	}
}
