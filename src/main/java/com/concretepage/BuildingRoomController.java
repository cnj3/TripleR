package com.concretepage;

import java.sql.SQLException;
import java.sql.Time;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.web.SpringBootServletInitializer;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.concretepage.component.BuildingRoomService;
import com.concretepage.component.CheckAvailabilityService;
import com.concretepage.component.RecommendRoomService;
import com.concretepage.component.SuggestRoomService;
import com.concretepage.component.UpdateRequestService;

@RestController
@RequestMapping("/data")
public class BuildingRoomController {
	
	@Autowired 
	private BuildingRoomService buildingRoomService;
	
	@Autowired
	private CheckAvailabilityService checkAvailabilityService;
	
	@Autowired
	private UpdateRequestService updateRequestService;
	
	@Autowired
	private RecommendRoomService recommendRoomService;
	
	@Autowired
	private SuggestRoomService suggestRoomService;
	
	
	/**
	 * sends back building_name, room_num, and capacity to the server
	 * @return
	 * @throws SQLException
	 */
	@RequestMapping("/br")
	public List<BuildingRoom> getAllBuildingRooms() throws SQLException {
		List<BuildingRoom> br_list = buildingRoomService.getAllBuildingRooms();
		
		return br_list;
	}
	
	
	/**
	 * send back a positive request_id if room is available
	 * else, sends back a negative request_id (invalid)
	 * 
	 * @param building_name
	 * @param room_num
	 * @param start_time
	 * @param end_time
	 * @return
	 * @throws SQLException 
	 */
	@RequestMapping("/checkAvailability") 
	public Integer checkAvailability(@RequestParam("building_name") String building_name,
			@RequestParam("room_num") String room_num,
			@RequestParam("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date, 
			@RequestParam("start_time") String start_time,
			@RequestParam("end_time") String end_time) throws SQLException
	{     
		
		Time start_t = java.sql.Time.valueOf(start_time);
		Time end_t = java.sql.Time.valueOf(end_time);
		
		
		Integer requestID = checkAvailabilityService.checkAvailability(building_name, room_num, date, start_t, end_t);
		return requestID;
		
	}
	
	/**
	 * returns 1 if update was successful 
	 * 
	 * @param request_id
	 * @param building_name
	 * @param room_num
	 * @param date
	 * @param start_time
	 * @param end_time
	 * @return
	 * @throws SQLException
	 */
	@RequestMapping("/updateMapping")
	public Integer updateRequest(@RequestParam("request_id") Integer request_id,
			@RequestParam("building_name") String building_name,
			@RequestParam("room_num") String room_num,
			@RequestParam("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date, 
			@RequestParam("start_time") String start_time,
			@RequestParam("end_time") String end_time) throws SQLException {
		
		Time start_t = java.sql.Time.valueOf(start_time);
		Time end_t = java.sql.Time.valueOf(end_time);
		
		return updateRequestService.updateRequest(request_id, building_name, room_num, date, start_t, end_t);
		
	}
	
	/**
	 * return lists of buildings+rooms that have capacity within given params
	 * @param min_cap
	 * @param max_cap
	 * @return
	 * @throws SQLException
	 */
	@RequestMapping("/inCapacity")
	public BuildingRoom brInCapacity(
		@RequestParam("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date, 
		@RequestParam("start_time") String start_time,
		@RequestParam("end_time") String end_time,
		@RequestParam("capacity") Integer capacity) throws SQLException {
		
		Time start_t = java.sql.Time.valueOf(start_time);
		Time end_t = java.sql.Time.valueOf(end_time);
		
		return suggestRoomService.getSuggestions(date, start_t, end_t, capacity);
		
	}
//	@RequestMapping("/inCapacity")
//	public List<BuildingRoom> brInCapacity(@RequestParam("min_capacity") Integer min_cap,
//			@RequestParam("max_capacity") Integer max_cap) throws SQLException {
//		List<BuildingRoom> br_list = buildingRoomService.getBRInCapacity(min_cap, max_cap);
//		return br_list;
//	}
	
	@RequestMapping("/deleteRequest")
	public Integer deleteRequest(@RequestParam("request_id") Integer request_id) throws SQLException {
		Integer ret = updateRequestService.deleteRequest(request_id);
		return ret;
	}
	
	@RequestMapping("/searchRequest")
	public Request searchRequest(@RequestParam("request_id") Integer request_id) throws SQLException {
		
		Request ret = updateRequestService.searchRequest(request_id); 
		return ret;
		
	}
	
	
	// NEO4J QUERY CALL
	@RequestMapping("/recommendRoom")
	public BuildingRoom recommendRoomRequest(@RequestParam("building_name") String building_name,
			@RequestParam("room_num") String room_num,
			@RequestParam("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date, 
			@RequestParam("start_time") String start_time,
			@RequestParam("end_time") String end_time) throws SQLException {
		
		Time start_t = java.sql.Time.valueOf(start_time);
		Time end_t = java.sql.Time.valueOf(end_time);
		
		return recommendRoomService.recommendRoom(building_name, room_num, date, start_t, end_t);
		
	}
	
	@RequestMapping("/example")
	public int example() {
		System.out.println("IN EXAMPLE");
		return 1;
	}
	
//	@RequestMapping("/suggestRoom")
//	public BuildingRoom suggestRoom(
////			@RequestParam("date") @DateTimeFormat(pattern="yyyy-MM-dd") Date date, 
////			@RequestParam("start_time") String start_time,
////			@RequestParam("end_time") String end_time,
////			@RequestParam("capacity") Integer capacity) throws SQLException {
////		
////		Time start_t = java.sql.Time.valueOf(start_time);
////		Time end_t = java.sql.Time.valueOf(end_time);
////		
////		return suggestRoomService.getSuggestions(date, start_t, end_t, capacity);
//		) {
//			return null;
//	
//	}

	
	
}
