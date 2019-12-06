package com.concretepage;

import java.util.ArrayList;
import java.util.List;

import org.neo4j.ogm.annotation.EndNode;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.Relationship;
import org.neo4j.ogm.annotation.RelationshipEntity;
import org.neo4j.ogm.annotation.StartNode;

@RelationshipEntity(type = "Room_In")
public class Inside {
	
    @Id @GeneratedValue private Long id;
	
	private List<Inside> inside = new ArrayList<Inside>();
	
	@StartNode
	private Building building;
	
	@EndNode
	private BuildingRoom room;
	
}
