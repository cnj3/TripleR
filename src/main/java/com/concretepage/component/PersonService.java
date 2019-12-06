package com.concretepage.component;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.concretepage.Person;
import com.concretepage.dao.copy.PersonRepository;

@Service
public class PersonService implements IPersonService {
	@Autowired
	PersonRepository personRepository;
	
	@Override
	public Person getPersonDetail(Integer id){
		Person p = new Person();
		p.setId(id);
		p.setLocation("Varanasi");
		p.setName("Ram");
		return p;
	}

	@Override
	public List<Person> getAllPersons() {
		// TODO Auto-generated method stub
		return personRepository.getAllPersons();
		
	}
}
