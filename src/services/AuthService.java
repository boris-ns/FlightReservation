package services;

import java.io.File;
import java.io.InputStream;

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

import model.User;
import model.collections.Users;
import model.types.UserState;
import model.types.UserType;
import utils.Writer;

@Path("/auth")
public class AuthService {
	
	@Context
	HttpServletRequest request;
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
		
		Users users = getUsers();
		
		User fullUserInfo = (User) request.getSession().getAttribute("user-info");
		if (fullUserInfo == null) {
			fullUserInfo = users.checkLoginValidation(user);
			
			if (fullUserInfo == null) { // If user is not registered to the app
				return null;
			}
			
			// if it is then just add object to session and continue with login
			request.getSession().setAttribute("user-info", fullUserInfo);
		}
		
		return fullUserInfo;
	}
	
	@GET
	@Path("/getUserInfo")
	@Produces(MediaType.APPLICATION_JSON)
	public User getUserInfo() {
		User user = (User) request.getSession().getAttribute("user-info");
		return user;
	}
	
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
	
	@POST
	@Path("/register-image")
	@Consumes(MediaType.MULTIPART_FORM_DATA)
	@Produces(MediaType.APPLICATION_JSON)
	public User registerUser(	@FormDataParam("username") String username,
								@FormDataParam("file") InputStream inStream,
								@FormDataParam("file") FormDataContentDisposition fileDetail) {
		
		System.out.println("[REGISTER-IMAGE-UPLOAD] " + username);
		Users users = getUsers();
		User user = users.containsUsername(username);
		
		if (user == null) {
			return null;
		} else {
			String imageLocation = saveImage(user.getUsername(), inStream, fileDetail);
			user.setImagePath(imageLocation);
			users.saveUsers();
			return user;
		}
	}
	
	private String saveImage(String username, InputStream inStream, FormDataContentDisposition fileDetail) {
		String uploadFileLocation = "D:\\dev\\frserver\\images\\";
		
		File file = new File(uploadFileLocation + "\\" + username);
		file.mkdir();
		
		String fileLocation = uploadFileLocation + "\\" + username + "\\" + fileDetail.getFileName();
	    Writer.saveImageToFile(inStream, fileLocation);
	    
	    return uploadFileLocation;
	}
	
	/**
	 * Returns Users object from servlet context.
	 * @return Users object
	 */
	private Users getUsers() {
		Users users = (Users) servletCtx.getAttribute("users");
		
		if (users == null) { 
			users = new Users();
			servletCtx.setAttribute("users", users);
		}
		
		return users;
	}
}
