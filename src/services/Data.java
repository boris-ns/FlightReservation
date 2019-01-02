package services;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.core.Context;

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
}
