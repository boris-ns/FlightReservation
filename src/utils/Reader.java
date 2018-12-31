package utils;

import java.io.IOException;
import java.util.ArrayList;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import model.User;
import model.collections.Users;

public class Reader {

	public static ArrayList<User> readUsers(String path) {
		
		ObjectMapper mapper = new ObjectMapper();

		Users users;
		try {
			users = mapper.readValue(path, Users.class);
			return users.getUsers();
		} catch (JsonParseException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
	}
}
