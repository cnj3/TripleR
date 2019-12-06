package com.concretepage.dao.copy;

import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Repository;

import com.concretepage.BuildingRoom;
import com.concretepage.SuggestRoom;

@Repository
public interface SuggestRoomRepository {

	public BuildingRoom getSuggestions(Date date, Time start_time, Time end_time, int capacity) throws SQLException;
}
