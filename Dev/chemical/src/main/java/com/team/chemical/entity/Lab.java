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
	@OneToMany(mappedBy = "lab")
	@JsonManagedReference("labInventory")
    private Set<Inventory> inventories = new HashSet<>();

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
    	//TODO : 추천 해주기
    	List<List<Inventory>> list = new LinkedList<>();
    	//list.get(0)은 추천해주는 것들의 List<Inventory>
    	//list.get(1)은 추천하지 않는 것들의 List<Inventory>
    	List<Inventory> suggest = new LinkedList<>();
    	List<Inventory> notSuggest = new LinkedList<>();
    	
    	for (Inventory inventory : this.getInventories()) {
    		boolean canSuggest = true;
    		//각각 조건들을 체크해가며 조건 하나라도 실패하면 cansuggest가 false가 됨
    		//성상 체크 
    		if (chemical.getStatus().contains("liquid")) {
    			//액체
    			if (!(chemical.getMeltingPoint() <= inventory.getTemperature() &&
    					inventory.getTemperature() <= chemical.getBoilingPoint())) {
    				canSuggest = false;
    			}
    		} else if (chemical.getStatus().contains("gas")) {
    			//기체
    			if (!(chemical.getBoilingPoint() <= inventory.getTemperature())) {
    				canSuggest = false;
    			}
    		} else {
    			//고체
    			if (!(inventory.getTemperature() <= chemical.getMeltingPoint())) {
    				canSuggest = false;
    			}
    		}
    		
    		//조해성 체크
    		if (chemical.isDeliquescent() && inventory.getHumidity()!=-1) {
    			canSuggest = false;
    		}
    		
    		//풍해성
    		if (chemical.isEfflorescence() && inventory.getHumidity()!=1) {
    			canSuggest = false;
    		}
    		
    		//빛반응성
    		if (chemical.isPhotoReaction() && inventory.isIlluminance()) {
    			canSuggest = false;
    		}
    		
    		//인화성
    		if (chemical.isFlammability() && inventory.isOximeter()) {
    			canSuggest = false;
    		}
    		
    		//발화성 
    		if (chemical.isIgnitability() && inventory.isOximeter()) {
    			canSuggest = false;
    		}
    		
    		
    		//폭발
    		if(chemical.isEfflorescence() && !inventory.isExplosion()) {
    			canSuggest = false;
    		}
    		
    		if (canSuggest) {
    			suggest.add(inventory);
    		} else {
    			notSuggest.add(inventory);
    		}
    	}
    	
    	list.add(suggest);
    	list.add(notSuggest);
    	
    	return list;
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