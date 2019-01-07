package model;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import model.types.FlightClass;

public class Flight {

	private String flightId;
	private Destination startDest;
	private Destination endDest;
	private ArrayList<Reservation> reservations;
	private float ticketPrice;
	private String airplaneModel;
	private int numFirstClassSeats;
	private int numBussinessClassSeats;
	private int numEconomyClassSeats;
	private Date flightDate;
	private FlightClass flightClass;
	
	
	public Flight() {
	}
	
	public Flight(String flightId, Destination startDest, Destination endDest, ArrayList<Reservation> reservations,
			float ticketPrice, String airplaneModel, int numFirstClassSeats, int numBussinessClassSeats,
			int numEconomyClassSeats, Date flightDate, FlightClass flightClass) {
		
		this.flightId = flightId;
		this.startDest = startDest;
		this.endDest = endDest;
		this.reservations = reservations;
		this.ticketPrice = ticketPrice;
		this.airplaneModel = airplaneModel;
		this.numFirstClassSeats = numFirstClassSeats;
		this.numBussinessClassSeats = numBussinessClassSeats;
		this.numEconomyClassSeats = numEconomyClassSeats;
		this.flightDate = flightDate;
		this.flightClass = flightClass;
	}

	@Override
	public String toString() {
		return "Flight [flightId=" + flightId + ", startDest=" + startDest + ", endDest=" + endDest + ", reservations="
				+ reservations + ", ticketPrice=" + ticketPrice + ", airplaneModel=" + airplaneModel
				+ ", numFirstClassSeats=" + numFirstClassSeats + ", numBussinessClassSeats=" + numBussinessClassSeats
				+ ", numEconomyClassSeats=" + numEconomyClassSeats + ", flightDate=" + flightDate + ", flightClass="
				+ flightClass + "]";
	}
	
	public String toCsvString() {
		StringBuilder sb = new StringBuilder();
		SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy.");
        String dateStr = formatter.format(flightDate);
		
		sb.append(flightId + "," + startDest.getAirportCode() + "," + endDest.getAirportCode() + ",");
		
		for (Reservation reservation : reservations) {
			sb.append(reservation.getReservationId() + ";");
		}
		
		sb.deleteCharAt(sb.length() - 1); // Delete last ';'
		sb.append(",");
		sb.append(ticketPrice + "," + airplaneModel + "," + numFirstClassSeats + "," + numBussinessClassSeats + "," + numEconomyClassSeats
				 + "," + dateStr + "," + flightClass);
		
		return sb.toString();
	}

	public String getFlightId() {
		return flightId;
	}

	public void setFlightId(String flightId) {
		this.flightId = flightId;
	}

	public Destination getStartDest() {
		return startDest;
	}

	public void setStartDest(Destination startDest) {
		this.startDest = startDest;
	}

	public Destination getEndDest() {
		return endDest;
	}

	public void setEndDest(Destination endDest) {
		this.endDest = endDest;
	}

	public ArrayList<Reservation> getReservations() {
		return reservations;
	}

	public void setReservations(ArrayList<Reservation> reservations) {
		this.reservations = reservations;
	}

	public float getTicketPrice() {
		return ticketPrice;
	}

	public void setTicketPrice(float ticketPrice) {
		this.ticketPrice = ticketPrice;
	}

	public String getAirplaneModel() {
		return airplaneModel;
	}

	public void setAirplaneModel(String airplaneModel) {
		this.airplaneModel = airplaneModel;
	}

	public int getNumFirstClassSeats() {
		return numFirstClassSeats;
	}

	public void setNumFirstClassSeats(int numFirstClassSeats) {
		this.numFirstClassSeats = numFirstClassSeats;
	}

	public int getNumBussinessClassSeats() {
		return numBussinessClassSeats;
	}

	public void setNumBussinessClassSeats(int numBussinessClassSeats) {
		this.numBussinessClassSeats = numBussinessClassSeats;
	}

	public int getNumEconomyClassSeats() {
		return numEconomyClassSeats;
	}

	public void setNumEconomyClassSeats(int numEconomyClassSeats) {
		this.numEconomyClassSeats = numEconomyClassSeats;
	}

	public Date getFlightDate() {
		return flightDate;
	}

	public void setFlightDate(Date flightDate) {
		this.flightDate = flightDate;
	}

	public FlightClass getFlightClass() {
		return flightClass;
	}

	public void setFlightClass(FlightClass flightClass) {
		this.flightClass = flightClass;
	}
}
