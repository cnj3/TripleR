package com.concretepage;

public class Movie {
	private String title;
	private String tagline;
	private int released;
	
	public Movie(String title, String tagline, int released) {
		this.title = title;
		this.tagline = tagline;
		this.released = released;
	}
	
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getTagline() {
		return tagline;
	}
	public void setTagline(String tagline) {
		this.tagline = tagline;
	}
	public int getReleased() {
		return released;
	}
	public void setReleased(int released) {
		this.released = released;
	}
	
	
	
	
	

}
