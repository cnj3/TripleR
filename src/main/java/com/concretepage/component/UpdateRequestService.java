package com.concretepage.component;

import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;

import org.springframework.stereotype.Service;

import com.concretepage.Request;

public interface UpdateRequestService {

	Integer updateRequest(Integer request_id, String building_name, String room_num, Date date, Time start_t, Time end_t) throws SQLException;

	Integer deleteRequest(Integer request_id) throws SQLException;

	Request searchRequest(Integer request_id) throws SQLException;

}
