package utils;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

import org.glassfish.jersey.media.multipart.FormDataContentDisposition;

public class ImageWriter {

	public static String saveImage(String username, InputStream inStream, FormDataContentDisposition fileDetail) {
		String uploadFileLocation = "D:/dev/frserver/images";
		
		File file = new File(uploadFileLocation + "/" + username);
		file.mkdir();
		
		String fileLocation = uploadFileLocation + "/" + username + "/" + fileDetail.getFileName();
	    ImageWriter.saveImageToFile(inStream, fileLocation);
	    
	    return fileLocation;
	}
	
	private static void saveImageToFile(InputStream uploadedInputStream, String uploadedFileLocation) {
	    try {
	        OutputStream out = null;
	        int read = 0;
	        byte[] bytes = new byte[1024];
	
	        out = new FileOutputStream(new File(uploadedFileLocation));
	        while ((read = uploadedInputStream.read(bytes)) != -1) {
	            out.write(bytes, 0, read);
	        }

	        out.flush();
	        out.close();
	    } catch (IOException e) {
	        e.printStackTrace();
	    }
	}
}
