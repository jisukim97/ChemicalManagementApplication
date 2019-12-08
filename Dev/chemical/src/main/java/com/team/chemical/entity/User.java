package com.team.chemical.entity;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="user")
@Getter
@Setter
@ToString
@NoArgsConstructor
//회원
public class User {
    /**
     * 
     */
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    /**
     * 
     */
	@Column
    private String name;

    /**
     * 
     */
	@Column
    private String email;

    /**
     * 
     */
	@Column
    private String password;

    /**
     * 
     */
	@Column
    private LocalDate labEnrollDate;

    /**
     * 
     */
    @ManyToOne
    @JoinColumn(name = "lab_id")
    @JsonBackReference("labUser")
    private Lab myLab;

    /**
     * 
     */
    @ManyToMany
    @JoinTable(name="user_stock_date",
    		joinColumns=@JoinColumn(name="user_id"),
    		inverseJoinColumns=@JoinColumn(name="stock_id"))
    private Set<Stock> dateAlarm = new HashSet<>();
    
    @ManyToMany
    @JoinTable(name="user_stock_volume",
    		joinColumns=@JoinColumn(name="user_id"),
    		inverseJoinColumns=@JoinColumn(name="stock_id"))
    private Set<Stock> volumeAlarm = new HashSet<>();

    @ManyToMany
    @JoinTable(name="user_illnessalarm",
    		joinColumns=@JoinColumn(name="user_id"),
    		inverseJoinColumns=@JoinColumn(name="illnessalarm_id"))
    private Set<IllnessAlarm> illnessAlarm = new HashSet<>();
   
    
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

    
}