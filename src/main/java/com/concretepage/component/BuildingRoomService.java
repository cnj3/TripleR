package com.concretepage.component;

import java.sql.SQLException;
import java.util.List;

import com.concretepage.BuildingRoom;

public interface BuildingRoomService {

	List<BuildingRoom> getAllBuildingRooms() throws SQLException;

	List<BuildingRoom> getBRInCapacity(Integer min_cap, Integer max_cap) throws SQLException;

}
