package com.concretepage;

import java.util.ArrayList;
import java.util.List;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@NodeEntity
public class Building {
	@Id @GeneratedValue private Long id;
	
	private String building_name;
	
	@Relationship(type = "Room_In")
	private List<BuildingRoom> rooms = new ArrayList<BuildingRoom>();
	
	public Building(String building_name) {
		this.building_name = building_name;
	}

	public String getBuilding_name() {
		return building_name;
	}

	public void setBuilding_name(String building_name) {
		this.building_name = building_name;
	}
}
