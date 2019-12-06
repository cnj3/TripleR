package com.concretepage.component;

import java.util.Date;
import java.sql.SQLException;
import java.sql.Time;
import java.util.List;

import com.concretepage.BuildingRoom;
import com.concretepage.SuggestRoom;

public interface SuggestRoomService {

	//BuildingRoom getSuggestions(int capacity) throws SQLException;

	BuildingRoom getSuggestions(Date date, Time start_time, Time end_time, int capacity) throws SQLException;
}
