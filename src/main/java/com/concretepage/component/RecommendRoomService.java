package com.concretepage.component;

import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;

import com.concretepage.BuildingRoom;
import com.concretepage.dao.copy.RecommendRoomRepository;

public interface RecommendRoomService {
	
	BuildingRoom recommendRoom(String building_name, String room_num, Date date, Time start_t, Time end_t) throws SQLException;

	BuildingRoom recommendRoom(Date date, Time start_t, Time end_t, Integer capacity);

}
