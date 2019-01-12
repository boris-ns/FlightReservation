package model.collections;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.StringTokenizer;

import model.Destination;
import model.Flight;
import model.Reservation;
import model.types.FlightClass;

public class Flights {

	public static String flightsFileLocation = "D:\\dev\\flightreservation\\WebContent\\res\\flights.csv";
	
	private ArrayList<Flight> flights;
	
	public Flights(Destinations destinations, Reservations reservations) {
		this(flightsFileLocation, destinations, reservations);
	}
	
	public Flights(String path, Destinations destinations, Reservations reservations) {
		flights = new ArrayList<Flight>();
		BufferedReader reader = null;
		
		try {
			File file = new File(path);
			reader = new BufferedReader(new FileReader(file));
			readFlights(reader, destinations, reservations);
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			if (reader != null ) {
				try {
					reader.close();
				}
				catch (Exception e) { 
				}
			}
		}
	}

	private void readFlights(BufferedReader reader, Destinations destinations, Reservations reservations) {
		String line = null;
		StringTokenizer st;
		try {
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				
				if (line.equals(""))
					continue;
				
				st = new StringTokenizer(line, ",");

				String flightId = st.nextToken().trim();
				
				String startDestAirportCode = st.nextToken().trim();
				Destination startDest = destinations.findDestinationByAirportCode(startDestAirportCode);
				
				String endDestAirportCode = st.nextToken().trim();
				Destination endDest = destinations.findDestinationByAirportCode(endDestAirportCode);

				// If there are 11 elements in one CSV line that means there are reservations for this flight
				ArrayList<Reservation> reservs = new ArrayList<Reservation>();
				if (st.countTokens() == 11) {
					String reservationsIds = st.nextToken().trim();
					reservs = getReservations(reservationsIds, reservations);
				}
				
				float ticketPrice = Float.parseFloat(st.nextToken().trim());
				String airplaneModel = st.nextToken().trim();
				int numFirstClassSeats = Integer.parseInt(st.nextToken().trim());
				int numBussinessClassSeats = Integer.parseInt(st.nextToken().trim());
				int numEconomyClassSeats = Integer.parseInt(st.nextToken().trim());
				
				String dateStr = st.nextToken().trim();
		        SimpleDateFormat parser = new SimpleDateFormat("dd.MM.yyyy.");
		        Date date = parser.parse(dateStr);
				
				FlightClass flightClass = FlightClass.parseString(st.nextToken().trim());
				
				
				Flight newFlight = new Flight(flightId, startDest, endDest, reservs, ticketPrice, airplaneModel, 
						numFirstClassSeats, numBussinessClassSeats, numEconomyClassSeats, date, flightClass);
				flights.add(newFlight);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	private ArrayList<Reservation> getReservations(String reservationsIds, Reservations reservations) {
		ArrayList<Reservation> reservs = new ArrayList<Reservation>();
		String[] tokens = reservationsIds.split(";");
		
		for (String token : tokens) {
			int id = Integer.parseInt(token);
			Reservation reservation = reservations.findReservationById(id);
			
			if (reservation != null) {
				reservs.add(reservation);
			}
		}
		
		return reservs;
	}
	
	public void saveFlights() {
		try {
			PrintWriter writer = new PrintWriter(flightsFileLocation);
			
			for (Flight flight : flights) {
				writer.println(flight.toCsvString());
			}
			
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void addFlight(Flight flight) {
		this.flights.add(flight);
	}
	
	public ArrayList<Flight> getFlights() {
		return this.flights;
	}
	
	public Flight findFlight(String flightId) {
		for (Flight flight : flights) {
			if (flight.getFlightId().equals(flightId)) {
				return flight;
			}
		}
		
		return null;
	}
}
