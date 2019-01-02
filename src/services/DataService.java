package services;

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

import model.User;
import model.collections.Users;
import model.types.UserState;
import model.types.UserType;

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
	@Path("/getAllUsers")
	@Produces(MediaType.APPLICATION_JSON)
	public ArrayList<User> getAllUsers() {
		User user = (User) request.getSession().getAttribute("user-info"); // Get info about user that want the data
		
		if (user.getType() == UserType.ADMIN) {
			return Data.getUsers(servletCtx).getUsers();
		}
		
		return new ArrayList<User>();
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
}
