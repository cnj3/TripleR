package com.concretepage.component;

import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.concretepage.Request;
import com.concretepage.dao.copy.UpdateRequestRepository;

@Service
public class UpdateRequestServiceImpl implements UpdateRequestService {

	@Autowired
	UpdateRequestRepository updateRequestRepository;
	
	
	@Override
	public Integer updateRequest(Integer request_id, String building_name, String room_num, Date date, Time start_t,
			Time end_t) throws SQLException {
		// TODO Auto-generated method stub
		return updateRequestRepository.updateRequest(request_id, building_name, room_num, date ,start_t, end_t);
	}


	@Override
	public Integer deleteRequest(Integer request_id) throws SQLException {
		// TODO Auto-generated method stub
		return updateRequestRepository.deleteRequest(request_id);
	}


	@Override
	public Request searchRequest(Integer request_id) throws SQLException {
		// TODO Auto-generated method stub
		return updateRequestRepository.searchRequest(request_id);
	}

}
