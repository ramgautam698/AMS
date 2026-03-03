package com.ams.model;

import java.sql.Timestamp;

import com.ams.utils.Gender;
import com.ams.utils.RoleType;
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
@Table(name = "users")
@Data
public class Users
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable=false)
	private Integer id;
	
	@Column(name = "first_name", columnDefinition = "VARCHAR(25)", nullable = false)
	private String firstName;
	
	@Column(name = "last_name", columnDefinition = "VARCHAR(25)", nullable = false)
	private String lastName;
	
	@Column(name = "email", columnDefinition = "VARCHAR(50)", unique = true)
	private String email;
	
	@Column(name="password", columnDefinition = "VARCHAR(255)")
	private String password;
	
	@Column(name = "phone", columnDefinition = "VARCHAR(20)", nullable = false)
	private String phone;
	
	@Column(name = "dob", columnDefinition = "timestamp default now()", nullable = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private Timestamp dob;
	
	private Gender gender;
	
	@Column(name="address", columnDefinition = "VARCHAR(100)")
	private String address;
	
	@Column(name = "created_at", columnDefinition = "timestamp default now()", nullable = false, insertable = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private Timestamp createdAt;
	
	@Column(name = "updated_at", columnDefinition = "timestamp default now()", nullable = false, insertable = true)
	@JsonFormat(shape = JsonFormat.Shape.STRING)
	private Timestamp updatedAt;
	
	private RoleType roleType;
	
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
