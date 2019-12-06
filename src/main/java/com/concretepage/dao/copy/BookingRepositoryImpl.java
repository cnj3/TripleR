package com.concretepage.dao.copy;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.concretepage.Booking;


@Repository
public class BookingRepositoryImpl implements BookingRepository {

	@Autowired
	DataSource dataSource;
	
	private static final String dbName = "heroku_5418a301cb118d9";
	
	
	@Override
	public Integer checkAvailability(String building_name, String room_num, Date date, Time start_time, Time end_time) throws SQLException {
		
		Statement stmt = null;
		SimpleDateFormat sdfr = new SimpleDateFormat("yyyy-MM-dd");
		
		String query = "select b.building_name, b.room_num, b.date, b.start_time, b.end_time" + 
				" from " + dbName + ".booking as b" + 
				" where b.building_name = \'" + building_name + "\'"   + 
				" and \'" + room_num + "\' = b.room_num " + 
				" and \'" + sdfr.format(date) + "\' = b.date " + 
				" and \'" + start_time.toString() + "\' = b.start_time";
		
		System.out.println(query);
		
	    
	    stmt = dataSource.getConnection().createStatement();
        ResultSet rs = stmt.executeQuery(query);
        int curr = 0;
        while (rs.next()) {
        	curr++;
            String buildingName = rs.getString("building_name");
            String roomNum = rs.getString("room_num");
            Date _date = rs.getDate("date");
            Time startTime = rs.getTime("start_time");
            Time endTime = rs.getTime("end_time");
            
            Booking b = new Booking(buildingName, roomNum, _date, startTime, endTime);
            
            System.out.print(buildingName);
            System.out.print(" " + roomNum);
            System.out.print(" " + _date.toString());
            System.out.print(" " + startTime.toString());
            System.out.print(" " + endTime.toString());
            System.out.println();
            
            // exists in table -> not available
               
        }
	    //exists in table -> not available
        if(curr != 0) return -1;
        
        //does not exist in booking table -> add it to request table
        Statement stmt1 = null;
		String query1 = "insert into " + dbName + ".request " + 
				"(building, date, start_time, end_time, room) " + 
				"values (\'" + building_name + "\', \'" + 
				sdfr.format(date) + "\', \'" + start_time + "\', \'" + 
				end_time + "\', \'" + room_num + "\')";
		
		System.out.println(query1);
	    
	    stmt = dataSource.getConnection().createStatement();
        int rs1 = stmt.executeUpdate(query1);
        
        
        //does not exist in booking table -> add it to booking table
        Statement stmt2 = null;
		String query2 = "insert into " + dbName + ".booking " + 
				"(building_name, date, start_time, end_time, room_num) " + 
				"values (\'" + building_name + "\', \'" + 
				sdfr.format(date) + "\', \'" + start_time + "\', \'" + 
				end_time + "\', \'" + room_num + "\')";
		
		System.out.println(query2);
	    
	    stmt2 = dataSource.getConnection().createStatement();
        int rs2 = stmt.executeUpdate(query2);
        
        
        //return requestID
        Statement stmt3 = null;
		String query3 = "select requestID from " + dbName + ".request " + 
				"where building = \'" + building_name + 
				"\' and date = \'" + sdfr.format(date) + 
				"\' and start_time = \'" + start_time + 
				"\' and end_time = \'" + end_time + 
				"\' and room = \'" + room_num + "\'";
		
		System.out.println(query3);
	    
	    stmt = dataSource.getConnection().createStatement();
        ResultSet rs3 = stmt.executeQuery(query3);
        Integer ret = -2;
        while(rs3.next()) {
            ret = (Integer) rs3.getInt("requestID");
            
        }
        
		return ret;



	}

}
