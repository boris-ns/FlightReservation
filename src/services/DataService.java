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

import model.Destination;
import model.User;
import model.collections.Destinations;
import model.collections.Users;
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
			String imageLocation = ImageWriter.saveImage(user.getUsername(), inStream, fileDetail);
			user.setImagePath(imageLocation);
			users.saveUsers();
			return user;
		}
	}
}
