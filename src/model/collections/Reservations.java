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

import model.Reservation;
import model.User;
import model.types.ReservationClass;

public class Reservations {

public static String reservationsFileLocation = "D:\\dev\\flightreservation\\WebContent\\res\\reservations.csv";
	
	private ArrayList<Reservation> reservations;
	
	public Reservations(Users users) {
		this(reservationsFileLocation, users);
	}
	
	public Reservations(String path, Users users) {
		reservations = new ArrayList<Reservation>();
		BufferedReader reader = null;
		
		try {
			File file = new File(path);

			reader = new BufferedReader(new FileReader(file));
			readReservations(reader, users);
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

	private void readReservations(BufferedReader reader, Users users) {
		String line = null;
		StringTokenizer st;
		try {
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				
				if (line.equals(""))
					continue;
				
				st = new StringTokenizer(line, ",");
				

				int reservationId = Integer.parseInt(st.nextToken().trim());
				
				String username = st.nextToken().trim();
				User user = users.containsUsername(username);
				
				String dateTimeStr = st.nextToken().trim();
				SimpleDateFormat parser = new SimpleDateFormat("dd.MM.yyyy. HH:mm");
		        Date dateTime = parser.parse(dateTimeStr);
				
				ReservationClass reservationClass = ReservationClass.parseString(st.nextToken().trim());
				int numberOfPassengers = Integer.parseInt(st.nextToken().trim());

				Reservation newRes = new Reservation(reservationId, user, dateTime, reservationClass, numberOfPassengers);
				reservations.add(newRes);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void saveReservations() {
		try {
			PrintWriter writer = new PrintWriter(reservationsFileLocation);
			
			for (Reservation reservation : reservations) {
				writer.println(reservation.toCsvString());
			}
			
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void addReservations(Reservation reservation) {
		int lastId = 0;

		if (reservations.size() != 0)
			lastId = reservations.get(reservations.size() - 1).getReservationId();
		
		++lastId;
		reservation.setReservationId(lastId);
		
		this.reservations.add(reservation);
	}
	
	public ArrayList<Reservation> getReservationsForUser(User user) {
		ArrayList<Reservation> reservationsForUser = new ArrayList<Reservation>();
		
		for (Reservation r : reservations) {
			if (r.getUser().getUsername().equals(user.getUsername())) {
				reservationsForUser.add(r);
			}
		}
		
		return reservationsForUser;
	}
	
	public ArrayList<Reservation> getReservations() {
		return this.reservations;
	}
	
	public Reservation findReservationById(int id) {
		for (Reservation res : reservations) {
			if (res.getReservationId() == id) {
				return res;
			}
		}
		
		return null;
	}
}
