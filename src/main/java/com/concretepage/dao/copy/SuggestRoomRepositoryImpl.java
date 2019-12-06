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
import com.concretepage.SuggestRoom;

@Repository
public class SuggestRoomRepositoryImpl implements SuggestRoomRepository {
	
	@Autowired
	DataSource dataSource;
	
	private static final String dbName = "heroku_5418a301cb118d9";
	
	@Override
	public List<BuildingRoom> getSuggestions(int capacity) throws SQLException {
		List<BuildingRoom> br_list = new ArrayList<BuildingRoom>();
		
	    Statement stmt = null;
	    String query = "{call recommend_room(?) }";

	    try {
	        stmt = dataSource.getConnection().createStatement();
	        stmt.setInt(1, capacity);
	        
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
}
