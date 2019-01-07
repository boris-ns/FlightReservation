package services;

import javax.servlet.ServletContext;

import model.collections.Destinations;
import model.collections.Flights;
import model.collections.Reservations;
import model.collections.Users;

public class Data {
	
	public static Users getUsers(ServletContext sCtx) {
		Users users = (Users) sCtx.getAttribute("users");
		
		if (users == null) { 
			users = new Users();
			sCtx.setAttribute("users", users);
		}
		
		return users;
	}
	
	public static Destinations getDestinations(ServletContext sCtx) {
		Destinations destinations = (Destinations) sCtx.getAttribute("destinations");
		
		if (destinations == null) {
			destinations = new Destinations();
			sCtx.setAttribute("destinations", destinations);
		}
		
		return destinations;
	}
	
	public static Reservations getReservations(ServletContext sCtx) {
		Reservations reservations = (Reservations) sCtx.getAttribute("reservations");
		
		if (reservations == null) {
			Users users = getUsers(sCtx);
			reservations = new Reservations(users);
			sCtx.setAttribute("reservations", reservations);
		}
		
		return reservations;
	}

	public static Flights getFlights(ServletContext sCtx) {
		Flights flights = (Flights) sCtx.getAttribute("flights");
		
		if (flights == null) {
			Destinations destinations = getDestinations(sCtx);
			Reservations reservations = getReservations(sCtx);
			
			flights = new Flights(destinations, reservations);
			sCtx.setAttribute("flights", flights);
		}
		
		return flights;
	}
}
