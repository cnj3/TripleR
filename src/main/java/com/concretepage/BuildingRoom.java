package com.concretepage;
import java.util.List;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@NodeEntity
public class BuildingRoom {
	
	@Id @GeneratedValue private Long id;
	
	private String building_name;
	private String room_num;
	private Integer capacity;
	
	@Relationship(type = "Room_In", direction = Relationship.INCOMING)
	private List<Inside> inside; 
	// "Room_In"
	

	public BuildingRoom(String building_name, String room_num, Integer capacity) {
		// TODO Auto-generated constructor stub
		this.building_name = building_name;
		this.room_num = room_num;
		this.capacity = capacity;
	}
	
	public BuildingRoom(String building_name, String room_num) {
		// TODO Auto-generated constructor stub
		this.building_name = building_name;
		this.room_num = room_num;
	}
	
	public BuildingRoom(String building_name) {
		// TODO Auto-generated constructor stub
		this.building_name = building_name;
	}
	

	
	public BuildingRoom() {
		
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
	public Integer getCapacity() {
		return capacity;
	}
	public void setCapacity(Integer capacity) {
		this.capacity = capacity;
	}
}

