package com.concretepage.component;

import java.util.List;

import com.concretepage.Person;


public interface IPersonService {
  public Person getPersonDetail(Integer id);

  public List<Person> getAllPersons();
}
