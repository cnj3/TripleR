package com.concretepage.component;

import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;

public interface CheckAvailabilityService {

	Integer checkAvailability(String building_name, String room_num, Date date, Time start_time, Time end_time) throws SQLException;

}
