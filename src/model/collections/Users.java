package model.collections;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.StringTokenizer;

import model.User;
import model.types.UserState;

public class Users {

	private ArrayList<User> users;
	
	public Users() {
		this("D:\\dev\\flightreservation\\WebContent\\res\\users.csv");
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
					
				User newUser = new User(username, password, name, surname, phoneNumber, email, imagePath, state);
				users.add(newUser);
			}
		} catch (Exception ex) {
			ex.printStackTrace();
		}
	}
	
	public ArrayList<User> getUsers() {
		return this.users;
	}
	
	public void addUser(User user) {
		this.users.add(user);
	}
	
	public boolean checkLoginValidation(User userToCheck) {
		for (User user : users) {
			if (user.getUsername().equals(userToCheck.getUsername()) &&
					user.getPassword().equals(userToCheck.getPassword())) {
				
				return true;
			}
		}
		
		return false;
	}
}
