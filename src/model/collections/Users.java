package model.collections;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.StringTokenizer;

import model.User;
import model.types.UserState;
import model.types.UserType;

public class Users {

	public static String usersFileLocation = "D:\\dev\\flightreservation\\WebContent\\res\\users.csv";
	
	private ArrayList<User> users;
	
	public Users() {
		this(usersFileLocation);
	}
	
	public Users(String path) {
		users = new ArrayList<User>();
		BufferedReader reader = null;
		
		try {
			File file = new File(path);

			reader = new BufferedReader(new FileReader(file));
			readUsers(reader);
		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
			if (reader != null ) {
				try {
					reader.close();
				}
				catch (Exception e) { 
				}
			}
		}
	}

	private void readUsers(BufferedReader reader) {
		String line = null;
		StringTokenizer st;
		try {
			while ((line = reader.readLine()) != null) {
				line = line.trim();
				
				if (line.equals(""))
					continue;
				
				st = new StringTokenizer(line, ",");
				
				String username = st.nextToken().trim();
				String password = st.nextToken().trim();;
				String name = st.nextToken().trim();;
				String surname = st.nextToken().trim();;
				String phoneNumber = st.nextToken().trim();;
				String email = st.nextToken().trim();;
				String imagePath = st.nextToken().trim();
				UserState state = UserState.parseString(st.nextToken().trim());
				UserType type = UserType.parseString(st.nextToken().trim());
					
				User newUser = new User(username, password, name, surname, phoneNumber, email, imagePath, state, type);
				users.add(newUser);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public void saveUsers() {
		try {
			PrintWriter writer = new PrintWriter(usersFileLocation);
			
			for (User user : users) {
				writer.println(user.toCsvString());
			}
			
			writer.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public ArrayList<User> getUsers() {
		return this.users;
	}
	
	public void addUser(User user) {
		this.users.add(user);
	}
	
	public User checkLoginValidation(User userToCheck) {
		for (User user : users) {
			if (user.getUsername().equals(userToCheck.getUsername()) &&
					user.getPassword().equals(userToCheck.getPassword())) {
				
				return user;
			}
		}
		
		return null;
	}
	
	public User containsUsername(String username) {
		for (User user : users) {
			if (user.getUsername().equals(username)) {
				return user;
			}
		}
		
		return null;
	}
}
