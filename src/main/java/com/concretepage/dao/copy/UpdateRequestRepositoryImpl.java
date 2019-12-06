package com.concretepage.dao.copy;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Date;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.concretepage.BuildingRoom;
import com.concretepage.Request;

@Repository
public class UpdateRequestRepositoryImpl implements UpdateRequestRepository {

	@Autowired
	DataSource dataSource;
	
	private static final String dbName = "heroku_5418a301cb118d9";
	
	
	
	@Override
	public Integer updateRequest(Integer request_id, String building_name, String room_num, Date date, Time start_t,
			Time end_t) throws SQLException {
		
		//update the row by requestid in request table
		Statement stmt = null;
		SimpleDateFormat sdfr = new SimpleDateFormat("yyyy-MM-dd");
		
		String query = "update " + dbName + ".request " + 
				"set building = \'" + building_name + "\' , " + 
				"date = \'" + sdfr.format(date) + "\' , " + 
				"start_time = \'" + start_t.toString() + "\' , " + 
				"end_time = \'" + end_t.toString() + "\' , " +
				"room = \'" + room_num + "\' " + 
				" where requestID = " + request_id;
		
//		UPDATE heroku_5418a301cb118d9.request
//		SET 
//			building = 'Bevier',
//		    date = '2020=06-28',
//		    start_time = '08:00:00',
//		    end_time = '08:30:00',
//		    room = '108'
//		WHERE requestID = 251;
		
		System.out.println(query);
		
	    
	    stmt = dataSource.getConnection().createStatement();
        int rs = stmt.executeUpdate(query);
		
		return (Integer) rs;
		
	}



	@Override
	public Integer deleteRequest(Integer request_id) throws SQLException {
		// TODO Auto-generated method stub
		Statement stmt = null;
		SimpleDateFormat sdfr = new SimpleDateFormat("yyyy-MM-dd");
		
		String query = "delete from " + dbName + ".request where requestID = " + request_id;
		
//		DELETE FROM heroku_5418a301cb118d9.request
//		WHERE requestID = 201;
		
		System.out.println(query);
		
	    stmt = dataSource.getConnection().createStatement();
        int rs = stmt.executeUpdate(query);
        
        
		//TODO: delete from bookings table
//        Statement stmt1 = null;
//		
//		String query1 = "";
//		
//		System.out.println(query1);
//		
//	    stmt = dataSource.getConnection().createStatement();
//        int rs1 = stmt.executeUpdate(query1);
//        
//        

		
		return (Integer) rs;
	}



	@Override
	public Request searchRequest(Integer request_id) throws SQLException {
		// TODO Auto-generated method stub
		
		Statement stmt = null;
	    String query = "select requestID, building, date, start_time, end_time, room " + 
	    		"from " + dbName + ".request " + 
	    		"where requestID="+ request_id;
	    
//	    SELECT requestID, building, date, start_time, end_time, room 
//	    FROM heroku_5418a301cb118d9.request
//	    WHERE requestID=11;
	    
	    System.out.println(query);
	    
	    
	    stmt = dataSource.getConnection().createStatement();
        ResultSet rs = stmt.executeQuery(query);
        
        Request req = null;
        int curr = 0;
        while (rs.next()) {
        	curr ++;
        	Integer requestId = rs.getInt("requestID");
            String buildingName = rs.getString("building");
            Date _date = rs.getDate("date");
            Time start_t = rs.getTime("start_time");
            Time end_t = rs.getTime("end_time");
            String roomNum = rs.getString("room");
            
            req = new Request(requestId, buildingName, roomNum, _date, start_t, end_t);
            
            System.out.println(buildingName);
            System.out.println(roomNum);
            
        }
		if(curr == 0) {
			req = new Request(null, null, null, null, null, null);
		}
		
		return req;
	}

}
