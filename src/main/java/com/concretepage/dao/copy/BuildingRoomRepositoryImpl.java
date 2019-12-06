package com.concretepage.dao.copy;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.concretepage.BuildingRoom;

@Repository
public class BuildingRoomRepositoryImpl implements BuildingRoomRepository {
	
	@Autowired
	DataSource dataSource;
	
	private static final String dbName = "heroku_5418a301cb118d9";
	
	@Override
	public List<BuildingRoom> getAllBuildingRooms() throws SQLException {
		List<BuildingRoom> br_list = new ArrayList<BuildingRoom>();
		
	    Statement stmt = null;
	    String query = "select * " +
	                   "from " + dbName + ".building_room";
	    try {
	        stmt = dataSource.getConnection().createStatement();
	        ResultSet rs = stmt.executeQuery(query);
	        while (rs.next()) {
	            String buildingName = rs.getString("building_name");
	            String roomNum = rs.getString("room_num");
	            Integer capacity = rs.getInt("capacity");
	            
	            System.out.println(buildingName);
	            System.out.println(roomNum);
	            System.out.println(capacity);
	            
	            BuildingRoom curr = new BuildingRoom(buildingName, roomNum, capacity);
	            br_list.add(curr);
	        }
	    } catch (SQLException e ) {
	    	System.out.println("exception");
	    } finally {
	        if (stmt != null) { stmt.close(); }
	    }
		
		
		return br_list;
	}

	@Override
	public List<BuildingRoom> getBRInCapacity(Integer min_cap, Integer max_cap) throws SQLException {
		// TODO Auto-generated method stub
		
		List<BuildingRoom> br_list = new ArrayList<BuildingRoom>();
		
	    Statement stmt = null;
	    String query = "select building_name, room_num, capacity " +
	                   "from " + dbName + ".building_room " +
	                   "where capacity >= " + min_cap + " and capacity <= " + max_cap;
	    
//	    SELECT building_name, room_num 
//	    FROM heroku_5418a301cb118d9.building_room 
//	    WHERE capacity > 1 AND capacity < 42;
	    
	    System.out.println(query);
		
	    
	    stmt = dataSource.getConnection().createStatement();
        ResultSet rs = stmt.executeQuery(query);
        
        while (rs.next()) {
            String buildingName = rs.getString("building_name");
            String roomNum = rs.getString("room_num");
            Integer capacity = rs.getInt("capacity");
            
            System.out.println(buildingName);
            System.out.println(roomNum);
            System.out.println(capacity);
            
            BuildingRoom curr = new BuildingRoom(buildingName, roomNum, capacity);
            br_list.add(curr);
        }
        
		return br_list;
	}


}
