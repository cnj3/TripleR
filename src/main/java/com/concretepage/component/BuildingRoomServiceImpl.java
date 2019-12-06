package com.concretepage.component;

import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.concretepage.BuildingRoom;
import com.concretepage.dao.copy.BuildingRoomRepository;

@Service
public class BuildingRoomServiceImpl implements BuildingRoomService {

	@Autowired
	BuildingRoomRepository buildingRoomRepository;
	
	@Override
	public List<BuildingRoom> getAllBuildingRooms() throws SQLException {
		return buildingRoomRepository.getAllBuildingRooms();
	}

	@Override
	public List<BuildingRoom> getBRInCapacity(Integer min_cap, Integer max_cap) throws SQLException {
		return buildingRoomRepository.getBRInCapacity(min_cap, max_cap);
	}

}
