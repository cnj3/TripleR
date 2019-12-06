package com.concretepage.component;

import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.concretepage.BuildingRoom;
import com.concretepage.dao.copy.RecommendRoomRepository;

@Service
public class RecommendRoomServiceImpl implements RecommendRoomService {

	@Autowired
	RecommendRoomRepository recommendRoomRepository;
	
	@Transactional(readOnly = true)
	public BuildingRoom recommendRoom(String building_name, String room_num, Date date, Time start_t, Time end_t) throws SQLException {
		return recommendRoomRepository.getRecommendation(building_name, room_num, date, start_t, end_t);
	}

}
