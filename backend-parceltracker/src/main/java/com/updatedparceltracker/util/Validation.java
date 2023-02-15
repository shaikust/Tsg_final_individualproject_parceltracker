package com.updatedparceltracker.util;

public class Validation {
  private Validation(){
    throw new IllegalStateException("Utility class");
  }
    public static boolean isBlank(Integer id){
        return id.describeConstable().isEmpty();
    }
    public static boolean isBlank(String name){
        return name.isBlank();
    }
    public static boolean validateEmail(String email) {
        return email.matches("^[a-zA-Z0-9_+&-]+(?:\\.[a-zA-Z0-9_+&-]+)*@(?:[a-zA-Z0-9-]+\\.)+[a-zA-Z]{1,7}$");
    }
    public static boolean validatePassword(String password){
        return  password.matches("^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{5,}$");
    }
    public static boolean isBlank(String email,String password){
        return validateEmail(email)&&validatePassword(password);
    }
    public static boolean validatePhoneNumber(String phoneNumber) {
        return phoneNumber.matches("^\\d{10}$");
    }
}
