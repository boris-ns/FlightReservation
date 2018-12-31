package services;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import model.User;
import model.collections.Users;

@Path("/auth")
public class AuthService {
	
	@Context
	ServletContext servletCtx;

	@GET
	@Path("/test")
	@Produces(MediaType.TEXT_PLAIN)
	public String test() {
		return "Hello World!";
	}
	
	@POST	
	@Path("/login")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public boolean loginUser(User user) {
		System.out.println("LOGIN: " + user);
		Users users = getUsers();
		return users.checkLoginValidation(user);
	}
	
	
	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public String registerUser(User user) {
		
		// @TODO: Implement this
		return "OK";
	}
	
	private Users getUsers() {
		Users users = (Users) servletCtx.getAttribute("users");
		
		if (users == null) { 
			users = new Users();
			servletCtx.setAttribute("users", users);
		}
		
		return users;
	}
}
