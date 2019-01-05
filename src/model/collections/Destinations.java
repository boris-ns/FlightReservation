package model.collections;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.StringTokenizer;

import model.Destination;
import model.types.DestinationState;


public class Destinations {

	public static String destinationsFileLocation = "D:\\dev\\flightreservation\\WebContent\\res\\destinations.csv";
	
	private ArrayList<Destination> destinations;
	
	public Destinations() {
		this(destinationsFileLocation);
	}
	
	public Destinations(String path) {
		destinations = new ArrayList<Destination>();
		BufferedReader reader = null;
		
		try {
			File file = new File(path);

			reader = new BufferedReader(new FileReader(file));
			readDestinations(reader);
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

	private void readDestinations(BufferedReader reader) {
		String line = null;
		StringTokenizer st;
		try {
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				
				if (line.equals(""))
					continue;
				
				st = new StringTokenizer(line, ",");
				
				String name = st.nextToken().trim();
				String country = st.nextToken().trim();
				String airportName = st.nextToken().trim();
				String airportCode = st.nextToken().trim();
				String location = st.nextToken().trim();
				String imagePath = st.nextToken().trim();
				DestinationState state = DestinationState.parseString(st.nextToken().trim());
				
				Destination newDestination = new Destination(name, country, airportName, airportCode, location, imagePath, state);
				destinations.add(newDestination);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void saveDestinations() {
		try {
			PrintWriter writer = new PrintWriter(destinationsFileLocation);
			
			for (Destination dest : destinations) {
				writer.println(dest.toCsvString());
			}
			
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public void addDestination(Destination dest) {
		this.destinations.add(dest);
	}
	
	public ArrayList<Destination> getDestinations() {
		return this.destinations;
	}
	
	public Destination findDestination(String destName) {
		for (Destination dest : destinations) {
			if (dest.getName().equals(destName)) {
				return dest;
			}
		}
		
		return null;
	}
}
