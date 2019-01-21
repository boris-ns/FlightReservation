package model;

public class ReservationInfo {

	private Reservation reservation;
	private Flight flight;
	
	public ReservationInfo() {
		
	}

	public ReservationInfo(Reservation reservation, Flight flight) {
		this.reservation = reservation;
		this.flight = flight;
	}

	public Reservation getReservation() {
		return reservation;
	}

	public void setReservation(Reservation reservation) {
		this.reservation = reservation;
	}

	public Flight getFlight() {
		return flight;
	}

	public void setFlight(Flight flight) {
		this.flight = flight;
	}
}
