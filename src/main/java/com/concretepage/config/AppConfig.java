package com.concretepage.config;  
  
import javax.sql.DataSource;

import org.apache.commons.dbcp.BasicDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
  
@Configuration 
@ComponentScan("com.concretepage") 
@EnableWebMvc   
public class AppConfig {  
	
	//mysql://us-cdbr-iron-east-05.cleardb.net/heroku_5418a301cb118d9?reconnect=true
	//[database type]://[username]:[password]@[host]:[port]/[database name]

	
    @Bean
    public DataSource testDataSource() {
        BasicDataSource bds = new BasicDataSource();
        bds.setDriverClassName("com.mysql.jdbc.Driver");
        bds.setUrl("jdbc:mysql://us-cdbr-iron-east-05.cleardb.net/heroku_5418a301cb118d9?reconnect=true");
        bds.setUsername("b1d0ebf6c7b621");
        bds.setPassword("0eb2121c");
        return bds;
    }

}  
