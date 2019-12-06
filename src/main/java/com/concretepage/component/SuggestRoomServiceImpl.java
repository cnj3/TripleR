package com.concretepage.component;

import java.util.Date;
import java.sql.SQLException;
import java.sql.Time;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.concretepage.BuildingRoom;
import com.concretepage.SuggestRoom;
import com.concretepage.dao.copy.SuggestRoomRepository;

@Service
public class SuggestRoomServiceImpl implements SuggestRoomService {

	@Autowired
	SuggestRoomRepository suggestRoomRepository;
	
	@Override
	public BuildingRoom getSuggestions(Date date, Time start_time, Time end_time, int capacity) throws SQLException {
		return suggestRoomRepository.getSuggestions(date, start_time, end_time, capacity);
	}


}
