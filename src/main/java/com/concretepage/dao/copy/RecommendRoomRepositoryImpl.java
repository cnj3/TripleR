package com.concretepage.dao.copy;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.util.Collection;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Queue;

import javax.sql.DataSource;

import org.neo4j.driver.internal.InternalNode;
import org.neo4j.driver.internal.spi.Connection;
import org.neo4j.driver.v1.AuthTokens;
import org.neo4j.driver.v1.Driver;
import org.neo4j.driver.v1.GraphDatabase;
import org.neo4j.driver.v1.Record;
import org.neo4j.driver.v1.Session;
import org.neo4j.driver.v1.StatementResult;
import org.neo4j.driver.v1.Transaction;
import org.neo4j.driver.v1.TransactionWork;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.concretepage.Building;
import com.concretepage.BuildingRoom;
import com.concretepage.Movie;

@Repository
public class RecommendRoomRepositoryImpl implements RecommendRoomRepository, AutoCloseable {  

	@Autowired
	DataSource dataSource;
	
	private static final String dbName = "heroku_5418a301cb118d9";
	
	private static Driver driver = null;
	
	@Transactional(readOnly = true)
	public BuildingRoom getRecommendation(final String building_name, String room_num, Date date, Time start_t, Time end_t) throws SQLException {
		
		Queue<Building> neighbors = new LinkedList<Building>();
		
		Building og = new Building(building_name);
		
		//System.out.println("START TIME: " + start_t.toString());
		
		neighbors.add(og);
		boolean found = false;
		SimpleDateFormat sdfr = new SimpleDateFormat("yyyy-MM-dd");

		while(!neighbors.isEmpty() && !found) {
			
			Building curr = neighbors.poll();
			
			Statement stmt = null;
			
			//check if any rooms are available for given time in this building
				// 1) get all rooms in building
				//SELECT * FROM heroku_5418a301cb118d9.building_room br WHERE br.building_name= 'Altgeld'
			String query = "select * from " + dbName + ".building_room br" + 
				" where br.building_name = '" + curr.getBuilding_name() + "'";
			
			System.out.println("QUERY: " + query);
			
		    stmt = dataSource.getConnection().createStatement();
	        ResultSet rs = stmt.executeQuery(query);
	        String curr_building = "";
	        
	        while (rs.next()) {
	        	System.out.println("room: " + rs.getString("room_num"));
	        	String buildingName = rs.getString("building_name");
	        	curr_building = buildingName;
	            String roomNum = rs.getString("room_num");
	            Integer capacity = rs.getInt("capacity");
	            
	            // check if this room is available for given time
	            if(!(buildingName.equals(building_name) && roomNum.equals(room_num))) { // make sure it is not the og building and roomnum
	            	//select count(*) from heroku_5418a301cb118d9.booking where building_name = 'Altgeld' AND room_num=141 AND date= '2020-05-23' AND start_time='08:00:00' 
		            Statement stmt2 = null;

	            	String query2 = "select count(*) cnt from " + dbName + ".booking" + 
	            			" where building_name = '" + buildingName + "' AND room_num = " + roomNum + 
	            			" AND date = '" + sdfr.format(date) + "' AND start_time = '" + start_t + "'";
	            	//System.out.println("QUERY2: " + query2);
	            	
	            	stmt2 = dataSource.getConnection().createStatement();
	            	ResultSet rs2 = stmt2.executeQuery(query2);
	            	
	            	while(rs2.next()) {
	            		//System.out.println("rs2: " + rs2);
	            		int cnt = rs2.getInt("cnt");
	            		if(cnt == 0) { // 0 means room is not in booking table for given time and date
	            			found = true;
	            			BuildingRoom recommend = new BuildingRoom(buildingName, roomNum, capacity);
	            			return recommend;
	            		}
	            		
	            	}
	           
	            }
	        
	        }
	        
	        // no room found in current building
	        // neo4j: query neighboring buildings
	        	//MATCH (a:Building {building_name: 'Lincoln Hall'})-[r:Neighbor_Of]-(b:Building)
				//RETURN a, r, b
	        // add neighbors to queue 
			
			String connectionURL = "bolt://localhost:7687";
			String password = "giraf2fE!@";
			
			driver = GraphDatabase.driver(connectionURL, AuthTokens.basic("neo4j", password));
			
	        final String cb = curr_building;
			try (Session session = driver.session()){
				
				List<Record> movie = session.writeTransaction(new TransactionWork<List<Record>>() {

					@Override
					public List<Record> execute(Transaction tx) {
						// TODO Auto-generated method stub
						//"MATCH (a:Building {building_name: $bn})-[r:Neighbor_Of]-(b:Building)" + "RETURN a, b"
						StatementResult result = tx.run("MATCH (a:Building {building_name: '" + cb + "' })-[r:Neighbor_Of]-(b:Building) RETURN a,b");
						
						//TODO: change the hardcoded building_name into current building name
						return result.list();
						

					}
					
				} );
				
				
				for(int i = 0; i < movie.size(); i++) {
					//System.out.println("MOVIE: " + movie.get(i).toString());
					Map<String, Object> m = movie.get(i).asMap();
					InternalNode n = (InternalNode) m.get("b");
					String n_building_name = n.get("building_name").asString();
					System.out.println("neighbor: " + n_building_name);
					
					Building adj = new Building(n_building_name);
					
					neighbors.add(adj);

				}
				
				
			}
	        
			
			
		}
		
		BuildingRoom not_found = new BuildingRoom("No recommendation found", "na", 0);
		return not_found;
		
	}

	

	@Override
	public void close() throws Exception {
		// TODO Auto-generated method stub
		System.out.println("Closing!");
		driver.close();
		
		
	}

	
}
