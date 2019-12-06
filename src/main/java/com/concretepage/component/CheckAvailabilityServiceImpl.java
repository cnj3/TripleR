package com.concretepage.component;

import java.util.Date;
import java.sql.SQLException;
import java.sql.Time;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.concretepage.dao.copy.BookingRepository;

@Service
public class CheckAvailabilityServiceImpl implements CheckAvailabilityService {
	
	@Autowired
	BookingRepository bookingRepository;

	@Override
	public Integer checkAvailability(String building_name, String room_num, Date date, Time start_time, Time end_time) throws SQLException {
		// TODO Auto-generated method stub
		return bookingRepository.checkAvailability(building_name, room_num, date, start_time, end_time);
	}

}
