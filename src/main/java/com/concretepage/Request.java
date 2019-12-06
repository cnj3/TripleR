package com.concretepage;

import java.sql.Time;
import java.util.Date;

public class Request {
	private Integer request_id;
	private String building_name;
	private String room_num;
	private Date date;
	private Time start_time;
	private Time end_time;
	
	public Request(Integer request_id, String building_name, String room_num, Date date, Time start_time, Time end_time) {
		// TODO Auto-generated constructor stub
		this.request_id = request_id;
		this.building_name = building_name;
		this.room_num = room_num;
		this.date = date;
		this.start_time = start_time;
		this.end_time = end_time;
		
	}
	public Integer getRequest_id() {
		return request_id;
	}
	public void setRequest_id(Integer request_id) {
		this.request_id = request_id;
	}
	public String getBuilding_name() {
		return building_name;
	}
	public void setBuilding_name(String building_name) {
		this.building_name = building_name;
	}
	public String getRoom_num() {
		return room_num;
	}
	public void setRoom_num(String room_num) {
		this.room_num = room_num;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public Time getStart_time() {
		return start_time;
	}
	public void setStart_time(Time start_time) {
		this.start_time = start_time;
	}
	public Time getEnd_time() {
		return end_time;
	}
	public void setEnd_time(Time end_time) {
		this.end_time = end_time;
	}
}
