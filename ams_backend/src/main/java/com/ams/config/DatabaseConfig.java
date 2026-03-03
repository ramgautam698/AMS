package com.ams.config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;

public class DatabaseConfig
{
	@Value("${spring.datasource.url}")
	private static String dbUrl;
	
	@Value("${spring.datasource.username}")
	private static String userName;
	
	@Value("${spring.datasource.password}")
	private static String password;
	
	public static Object excuteStatement(String sql)
	{
		try
		(Connection conn = DriverManager.getConnection(dbUrl, userName, password);
				PreparedStatement pstmt = conn.prepareStatement(sql))
		{
			pstmt.setInt(1, 1);
			ResultSet rs = pstmt.executeQuery();
			return rs.getArray(0);
		}
		catch (SQLException e)
		{
			System.out.println("\nERROR in DatabaseConfig -> excuteStatement: " + e.getMessage());
			return null;
		}
	}
	
	public static <T> List<T> getWithType(String pname, Object[][] params, Class<T> type)
	{
		return null;
	}
}

//try
//{
//	// Establish connection
//	Connection conn = DriverManager.getConnection(dbUrl, userName, password);
//	// Create statement
//	Statement stmt = conn.createStatement();
//	// Execute query
//	ResultSet rs = stmt.executeQuery(sql);
//	while(rs.next())
//	{
//		//
//	}
//	// Close resources
//	rs.close();
//	stmt.close();
//	conn.close();
//}
//catch(Exception e)
//{
//	System.out.println("\nERROR in DatabaseConfig->excuteStatement: " + e.getMessage());
//}
