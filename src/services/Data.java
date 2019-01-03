package services;

import javax.servlet.ServletContext;

import model.collections.Destinations;
import model.collections.Users;

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
}
