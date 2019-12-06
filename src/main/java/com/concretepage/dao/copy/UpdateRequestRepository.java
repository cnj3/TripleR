package com.concretepage.dao.copy;

import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;

import org.springframework.stereotype.Repository;

import com.concretepage.Request;

@Repository
public interface UpdateRequestRepository {

	public Integer updateRequest(Integer request_id, String building_name, String room_num, Date date, Time start_t, Time end_t) throws SQLException;

	public Integer deleteRequest(Integer request_id) throws SQLException;

	public Request searchRequest(Integer request_id) throws SQLException;
	
}
