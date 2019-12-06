package com.concretepage.dao.copy;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.concretepage.Person;

@Repository
public class PersonRepositoryImpl implements PersonRepository {

	@Autowired
	DataSource dataSource;
	
	private static final String dbName = "heroku_5418a301cb118d9";
	
	@Override
	public List<Person> getAllPersons() {
		// TODO Auto-generated method stub

		
		try {
			getBuildings();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		
		List<Person> people_list = new ArrayList();

		Person  p1 = new Person();
		p1.setId(20);
		
		people_list.add(p1);

		
		return people_list;
//		return null;
	}
	
	public void getBuildings()
		    throws SQLException {
			//SELECT * FROM heroku_5418a301cb118d9.buildings;
		
		    Statement stmt = null;
		    String query = "select * " +
		                   "from " + dbName + ".buildings";
		    try {
		        stmt = dataSource.getConnection().createStatement();
		        ResultSet rs = stmt.executeQuery(query);
		        while (rs.next()) {
		            String buildingName = rs.getString("building_name");
		            System.out.println(buildingName);
		        }
		    } catch (SQLException e ) {
//		        JDBCTutorialUtilities.printSQLException(e);
		    	System.out.println("exception");
		    } finally {
		        if (stmt != null) { stmt.close(); }
		    }
		}

}
