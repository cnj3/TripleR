package com.concretepage.dao.copy;

import java.sql.SQLException;
import java.sql.Time;
import java.util.Collection;
import java.util.Date;
import java.util.Map;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.concretepage.Building;
import com.concretepage.BuildingRoom;

@Repository
public interface RecommendRoomRepository  { //extends Neo4jRepository //extends CrudRepository<BuildingRoom, Long>

	public BuildingRoom getRecommendation(@Param("building_name") String building_name, String room_num, Date date, Time start_t, Time end_t) throws SQLException;
	
//	public Iterable<Map<String, Object>> getAllTomMovies();

	
	/*@Query("MATCH (a:Building {building_name: 'Lincoln Hall'})-[r:Neighbor_Of]-(b:Building)\n" + 
			"		RETURN a, r, b")
		Collection<Building> graph(@Param("building_name") String building_name);
	*/
}
