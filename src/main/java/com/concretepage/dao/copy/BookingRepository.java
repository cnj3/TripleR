package com.concretepage.dao.copy;

import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;

import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository {
	public Integer checkAvailability(String building_name, String room_num, Date date, Time start_time, Time end_time) throws SQLException;
}
