package services;

import java.io.File;
import java.io.InputStream;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;

import com.sun.jersey.multipart.FormDataParam;

import model.User;
import model.collections.Users;
import model.types.UserState;
import model.types.UserType;

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
	public User loginUser(User user) {
		System.out.println("LOGIN: " + user);
	
		// @TODO: Don't forget Cookies ! There will be more stuff when we gather user info
		// Probably we will need to send user info instead true/false
		// or when home page loads we will send separate GET requests for info we need
		Users users = getUsers();
		return users.checkLoginValidation(user);
	}
	
	
//	@POST
//	@Path("/register")
//	@Consumes(MediaType.MULTIPART_FORM_DATA)
//	public String registerUser(@FormDataParam("user") User user, @FormDataParam("file") InputStream inStream,
//			@FormDataParam("file") FormDataContentDisposition cdh) {
//		
//		String uploadFileLocation = "D:\\dev\\flightreservation\\WebContent\\res\\images\\";
//
//		String uploadedFileLocation = "D://uploadedFiles/" + fileDetail.getFileName();
//	    System.out.println(uploadedFileLocation);
//	    // save it
//	    File  objFile=new File(uploadedFileLocation);
//	    if(objFile.exists())
//	    {
//	        objFile.delete();
//
//	    }
//
//	    saveToFile(uploadedInputStream, uploadedFileLocation);
//	    
//		// @TODO: Implement this. Don't return String.
//		return "OK";
//	}
	
	@POST
	@Path("/register")
	@Consumes(MediaType.APPLICATION_JSON)
	@Produces(MediaType.APPLICATION_JSON)
	public User registerUser(User user) {
		System.out.println("[REGISTER] " + user);
		
		Users users = getUsers();
		if (users.getUsers().contains(user)) {
			return null;
		} else {
			user.setType(UserType.REGULAR);
			user.setState(UserState.NORMAL);
			user.setImagePath("imagePath");
			users.addUser(user);
			users.saveUsers();
			return user;
		}
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
