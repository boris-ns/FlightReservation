package model;

import java.text.SimpleDateFormat;
import java.util.Date;

import model.types.ReservationClass;

public class Reservation {

	private int reservationId; // automatski se generise
	private User user;
	private Date dateTime;
	private ReservationClass reservationClass;
	private int numberOfPassengers;
	
	public Reservation() {
	}
	
	public Reservation(int reservationId, User user, Date dateTime, ReservationClass reservationClass, int numberOfPassengers) {
		this.reservationId = reservationId;
		this.user = user;
		this.dateTime = dateTime;
		this.reservationClass = reservationClass;
		this.numberOfPassengers = numberOfPassengers;
	}

	@Override
	public String toString() {
		return "Reservation [reservationId=" + reservationId + ", user=" + user + ", dateTime=" + dateTime
				+ ", reservationClass=" + reservationClass + ", numberOfPassengers=" + numberOfPassengers + "]";
	}
	
	public String toCsvString() {
		SimpleDateFormat formatter = new SimpleDateFormat("dd.MM.yyyy. HH:mm");
        String dateTimeStr = formatter.format(dateTime);
        
		return reservationId + "," + user.getUsername() + "," + dateTimeStr + "," + reservationClass + "," + numberOfPassengers;
	}

	public int getReservationId() {
		return reservationId;
	}
	
	public void setReservationId(int reservationId) {
		this.reservationId = reservationId;
	}
	
	public User getUser() {
		return user;
	}
	
	public void setUser(User user) {
		this.user = user;
	}
	
	public Date getDateTime() {
		return dateTime;
	}
	
	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}
	
	public ReservationClass getFlightClass() {
		return reservationClass;
	}
	
	public void setFlightClass(ReservationClass flightClass) {
		this.reservationClass = flightClass;
	}
	
	public int getNumberOfPassengers() {
		return numberOfPassengers;
	}

	public void setNumberOfPassengers(int numberOfPassengers) {
		this.numberOfPassengers = numberOfPassengers;
	}
}
