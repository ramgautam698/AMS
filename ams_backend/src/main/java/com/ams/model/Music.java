package com.ams.model;

import java.sql.Timestamp;

import com.ams.utils.Genre;
import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "music")
@Data
public class Music
{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", nullable=false)
	private Integer id;
	
	@ManyToOne
	@JoinColumn(name="artish_id")
	private Artist artishId;
	
	@Column(name = "title", columnDefinition = "VARCHAR(25)", nullable = false)
	private String title;
	
	@Column(name = "album_name", columnDefinition = "VARCHAR(50)", nullable = false)
	private String albumName;
	
	private Genre genre;
	
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
