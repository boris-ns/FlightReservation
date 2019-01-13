package services;
import java.io.InputStream;
import java.util.ArrayList;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;
import org.glassfish.jersey.media.multipart.FormDataParam;

import common.Consts;
import model.Destination;
import model.DestinationToEdit;
import model.Flight;
import model.User;
import model.collections.Destinations;
import model.collections.Flights;
import model.collections.Users;
import model.types.DestinationState;
import model.types.UserState;
import model.types.UserType;
import utils.ImageWriter;

@Path("/data")
public class DataService {

	@Context
	HttpServletRequest request;
	@Context
	ServletContext servletCtx;
	
	
	@GET
	@Path("/test")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		return "Hello data!";
	}
	

	@GET
	@Path("/getUserInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUserInfo() {
		User user = (User) request.getSession().getAttribute("user-info");
		return user;
	}
	
	@GET
	@Path("/getAllUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<User> getAllUsers() {
		User user = (User) request.getSession().getAttribute("user-info"); // Get info about user that want the data
		
		if (user.getType() == UserType.ADMIN) {
			return Data.getUsers(servletCtx).getUsers();
		}
		
		return new ArrayList<User>();
	}
	
	@GET
	@Path("/getAllDestinations")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Destination> getAllDestinations() {
		Destinations dest = Data.getDestinations(servletCtx);
		return dest.getDestinations();
	}
	
	@POST
	@Path("/blockUser")
	@Consumes(MediaType.TEXT_PLAIN)
	public Response blockUser(String username) {
		Users users = Data.getUsers(servletCtx);
		User user = users.containsUsername(username);
		
		if (user != null) {
			user.setState(UserState.BLOCKED);
			users.saveUsers();
			return Response.ok("OK").build();
		}

		return Response.ok("User doesn't exist").build();
	}
	
	@POST
	@Path("/unblockUser")
	@Consumes(MediaType.TEXT_PLAIN)
	public Response unblockUser(String username) {
		Users users = Data.getUsers(servletCtx);
		User user = users.containsUsername(username);
		
		if (user != null) {
			user.setState(UserState.NORMAL);
			users.saveUsers();
			return Response.ok("OK").build();
		}

		return Response.ok("User doesn't exist").build();
	}
	
	@POST
	@Path("/editUser")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User editUser(User user) {
		Users users = Data.getUsers(servletCtx);
		User userToEdit = users.containsUsername(user.getUsername());
		
		if (userToEdit == null) {
			return user;
		}
		
		userToEdit.setUsername(user.getUsername());
		userToEdit.setPassword(user.getPassword());
		userToEdit.setName(user.getName());
		userToEdit.setSurname(user.getSurname());
		userToEdit.setPhoneNumber(user.getPhoneNumber());
		userToEdit.setEmail(user.getEmail());
		
		users.saveUsers();
		
		return userToEdit;
	}
	
	@POST
	@Path("/editUserImage")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public User registerUser(	@FormDataParam("username") String username,
								@FormDataParam("file") InputStream inStream,
								@FormDataParam("file") FormDataContentDisposition fileDetail) {
		
		System.out.println("[EDIT-IMAGE-UPLOAD] " + username);
		Users users = Data.getUsers(servletCtx);
		User user = users.containsUsername(username);
		
		if (user == null) {
			return null;
		} else {
			String location = Consts.usersImgLocation + "/" + user.getUsername();
			String imageLocation = ImageWriter.saveImage(location, inStream, fileDetail);
			user.setImagePath(imageLocation);
			users.saveUsers();
			return user;
		}
	}
	
	@POST
	@Path("/changeDestinationState")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Destination archvieDestination(Destination destination) {
		Destinations dests = Data.getDestinations(servletCtx);
		Destination dest = dests.findDestination(destination.getName());
		
		if (dest != null) {
			DestinationState newState = (destination.getState() == DestinationState.ACTIVE) ? DestinationState.ARCHIVED : DestinationState.ACTIVE; 
			dest.setState(newState);
			dests.saveDestinations();
			return dest;
		}

		return null;
	}
	
	@POST
	@Path("addDestination")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Destination addDestination(Destination destination) {
		Destinations dests = Data.getDestinations(servletCtx);
		
		if (dests.findDestination(destination.getName()) == null) {
			destination.setState(DestinationState.ACTIVE);
			destination.setImagePath("imagePath");
			dests.addDestination(destination);
			dests.saveDestinations();
			
			return destination;
		}
		
		return null;
	}
	
	@POST
	@Path("/addImageForDestination")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public Destination addImageForDestination(@FormDataParam("name") String name,
											  @FormDataParam("file") InputStream inStream,
											  @FormDataParam("file") FormDataContentDisposition fileDetail) {
		
		Destinations dests = Data.getDestinations(servletCtx);
		Destination dest = dests.findDestination(name);
		
		if (dest == null) {
			return null;
		} else {
			String imageLocation = Consts.destinationsImgLocation + "/" + name;
			String fullImageLocation = ImageWriter.saveImage(imageLocation, inStream, fileDetail);
			dest.setImagePath(fullImageLocation);
			dests.saveDestinations();
			
			return dest;
		}
	}
	
	@POST
	@Path("/editDestination")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public Destination editDestination(DestinationToEdit destination) {
		Destinations dests = Data.getDestinations(servletCtx);
		Destination destToEdit = dests.findDestination(destination.getOldName());
		
		if (destToEdit == null) {
			return null;
		}

		destToEdit.setName(destination.getName());
		destToEdit.setCountry(destination.getCountry());
		destToEdit.setAirportName(destination.getAirportName());
		destToEdit.setAirportCode(destination.getAirportCode());
		destToEdit.setLocation(destination.getLocation());
		
		dests.saveDestinations();
			
		return destToEdit;
	}
	
	@GET
	@Path("/getAllFlights")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<Flight> getAllFlights() {
		Flights flights = Data.getFlights(servletCtx);
		return flights.getFlights();
	}
	
	@POST
	@Path("/addFlight")
	@Produces(MediaType.APPLICATION_JSON)
	public Flight addFlight(Flight flightToAdd) {
		Flights flights = Data.getFlights(servletCtx);
		
		if (flights.findFlight(flightToAdd.getFlightId()) == null) {
			Destinations destinations = Data.getDestinations(servletCtx);
			Destination startDest = destinations.findDestinationByAirportCode(flightToAdd.getStartDest().getAirportCode());
			Destination endDest = destinations.findDestinationByAirportCode(flightToAdd.getEndDest().getAirportCode());

			if (startDest == null || endDest == null) {
				return null;
			}
			
			flights.addFlight(flightToAdd);
			flights.saveFlights();
			
			return flightToAdd;
		}
		
		return null;
	}
	
	@POST
	@Path("/removeFlight")
	@Produces(MediaType.APPLICATION_JSON)
	public Response removeFlight(Flight flightToRemove) {
		Flights flights = Data.getFlights(servletCtx);
		
		// You cant delete flight if it has reservations
		if (flightToRemove.getReservations().size() != 0) {
			return null;
		}
		
		if (!flights.removeFlight(flightToRemove)) {
			return null;
		}

		flights.saveFlights();
		return Response.ok("OK").build();
	}
}
