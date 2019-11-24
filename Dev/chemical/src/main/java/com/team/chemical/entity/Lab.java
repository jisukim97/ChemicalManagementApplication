package com.team.chemical.entity;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.OneToMany;
import javax.persistence.OrderColumn;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="lab")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Lab {

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
    private String password;

    /**
     * 
     */
	@OneToMany(mappedBy = "myLab")
	@JsonManagedReference("labUser")
    private Set<User> members = new HashSet<>();

    /**
     * 
     */
    @OneToMany
    @JoinTable(name="lab_inventory",
    		joinColumns=@JoinColumn(name="lab_id"),
    		inverseJoinColumns=@JoinColumn(name="inventory_id"))
    @OrderColumn(name = "list_idx")
    private List<Inventory> inventories = new LinkedList<>();

    /**
     * 
     */
    @OneToMany
    @JoinTable(name="lab_apparatus",
    		joinColumns=@JoinColumn(name="lab_id"),
    		inverseJoinColumns=@JoinColumn(name="apparatus_id"))
    @OrderColumn(name = "list_idx")
    private List<Apparatus> apparatus = new LinkedList<>();

    /**
     * chemical이 추천될 장소. 첫번째 원소(바깥 리스트의 첫번째 원소 : 리스트)는 추천될 리스트
     * @param chemical
     * @return
     */
    public List<List<Inventory>> getSuggestList(Chemical chemical){
    	
    	return null;
    }

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
		Lab other = (Lab) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
    
}