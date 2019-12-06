package com.concretepage.dao.copy;

import java.sql.SQLException;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.concretepage.BuildingRoom;

@Repository
public interface BuildingRoomRepository {

	public List<BuildingRoom> getAllBuildingRooms() throws SQLException;

	public List<BuildingRoom> getBRInCapacity(Integer min_cap, Integer max_cap) throws SQLException;

}
