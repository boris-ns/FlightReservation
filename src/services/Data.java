package services;

import java.util.ArrayList;

import javax.servlet.ServletContext;

import model.Flight;
import model.collections.Destinations;
import model.collections.Flights;
import model.collections.Reservations;
import model.collections.Users;
import model.types.DestinationState;

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
	
	public static ArrayList<Flight> getActiveFlights(ServletContext sCtx) {
		Flights flights = getFlights(sCtx);
		ArrayList<Flight> activeFlights = new ArrayList<Flight>();
		
		for (int i = 0; i < flights.getFlights().size(); ++i) {
			Flight f = flights.getFlights().get(i);

			if (f.getStartDest().getState() == DestinationState.ACTIVE && f.getEndDest().getState() == DestinationState.ACTIVE) {
				activeFlights.add(f);
			}
		}
		
		return activeFlights;
	}
}
