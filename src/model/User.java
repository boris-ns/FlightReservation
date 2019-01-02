package model;

import model.types.UserState;
import model.types.UserType;

public class User {

	private String username;
	private String password;
	private String name;
	private String surname;
	private String phoneNumber;
	private String email;
	private String imagePath; // da li ce biti samo putanja iili objekat slike ?
	private UserState state;
	private UserType type;
	
	
	public User() {
	}
	
	public User(String username, String password, String name, String surname, String phoneNumber, String email,
			String imagePath, UserState state, UserType type) {

		this.username = username;
		this.password = password;
		this.name = name;
		this.surname = surname;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.imagePath = imagePath;
		this.state = state;
		this.type = type;
	}
	
	public User(User user) {
		this.username = user.username;
		this.password = user.password;
		this.name = user.name;
		this.surname = user.surname;
		this.phoneNumber = user.phoneNumber;
		this.email = user.email;
		this.imagePath = user.imagePath;
		this.state = user.state;
		this.type = user.type;
	}
	
	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;

		User other = (User) obj;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}


	@Override
	public String toString() {
		return "User [username=" + username + ", password=" + password + ", name=" + name + ", surname=" + surname
				+ ", phoneNumber=" + phoneNumber + ", email=" + email + ", imagePath=" + imagePath + ", state=" + state
				+ ", type=" + type + "]";
	}
	
	public String toCsvString() {
		return username + "," + password + "," + name + "," + surname + "," + phoneNumber + "," + email + "," + 
				imagePath + "," + state + "," + type;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getPhoneNumber() {
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public UserState getState() {
		return state;
	}

	public void setState(UserState state) {
		this.state = state;
	}

	public UserType getType() {
		return type;
	}

	public void setType(UserType type) {
		this.type = type;
	}
}
