package com.ams.model;

import java.sql.Timestamp;

import com.ams.utils.Gender;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "artist")
@Data
public class Artist
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable=false)
	private Integer id;
	
	@Column(name = "name", columnDefinition = "VARCHAR(50)", nullable = false)
	private String name;
	
	@Column(name = "dob", columnDefinition = "timestamp default now()", nullable = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private Timestamp dob;
	
	private Gender gender;
	
	@Column(name="address", columnDefinition = "VARCHAR(100)")
	private String address;
	
	@Column(name = "first_release_year", columnDefinition = "VARCHAR(5)", nullable = false)
	private String firstReleaseYear;
	
	@Column(name = "no_of_albums_released", nullable=false, columnDefinition = "int default 0")
	private Integer noOfAlbumsReleased;
	
	@Column(name = "created_at", columnDefinition = "timestamp default now()", nullable = false, insertable = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private Timestamp createdAt;
	
	@Column(name = "updated_at", columnDefinition = "timestamp default now()", nullable = false, insertable = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private Timestamp updatedAt;
	
	@PrePersist
    public void prePersist()
	{
        if (createdAt == null)
        {
        	createdAt = new Timestamp(System.currentTimeMillis());
        }
        if (updatedAt == null)
        {
        	updatedAt = new Timestamp(System.currentTimeMillis());
        }
    }
	
	public void updated()
	{
		updatedAt = new Timestamp(System.currentTimeMillis());
	}
}
