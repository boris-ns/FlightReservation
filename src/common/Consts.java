package common;

import javax.servlet.ServletContext;
import javax.ws.rs.core.Context;

public class Consts {
	
	@Context
	ServletContext servletCtx;
	
	public static final String usersImgLocation = "res/images/users";
	
	public static final String destinationsImgLocation = "res/images/destinations";
	
}
