package com.concretepage.dao.copy;
//package com.concretepage;
import com.concretepage.*;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository 
public interface PersonRepository {
	
	public List<Person> getAllPersons();
	

}



//package com.michaelcgood.dao;
//import org.springframework.data.repository.CrudRepository;
//import org.springframework.stereotype.Repository;
//import com.michaelcgood.model.System;
//@Repository
//public interface SystemRepository extends CrudRepository<System,Long> {
//}