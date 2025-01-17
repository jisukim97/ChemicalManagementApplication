package com.team.chemical.entity;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="inventory")
@Getter
@Setter
@ToString
@NoArgsConstructor
//화학 약품 보관함
public class Inventory {

    /**
     * 보관함 아이디 : 의미있는 조합의 이름으로 바꿀 것
     */
	@Id
    private String id;

    /**
     * 보관함 이름
     */
	@Column
    private String name;

    /**
     * 보관함 온도
     */
	@Column
    private float temperature;

    /**
     * 보관함 습도 -1 / 0 / 1
     */
	@Column
    private int humidity;

    /**
     * 보관함 조도
     */
	@Column
    private boolean illuminance;

    /**
     * 보관함 산소 농도 
     */
	@Column
    private boolean oximeter;

    /**
     * 보관함 폭발 방지 
     */
	@Column
    private boolean explosion;

    /**
     * 보관함에 저장 되어 있는 약품들(재고들)
     */
	@OneToMany(fetch = FetchType.EAGER, mappedBy = "inventory")
	@JsonManagedReference("inventoryStock")
    private Set<Stock> stocks = new HashSet<>();

	
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "lab_id")
    @JsonBackReference("labInventory")
    private Lab lab;

	
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
		Inventory other = (Inventory) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}
	
	public void makeId(int labId) {
		if (this.temperature < -3.0) {
			//냉동고
			this.id = (labId + "A" + (int)(Math.random()*1000));
		} else if (this.temperature < 5.0) {
			//냉장고 
			this.id = (labId + "B" + (int)(Math.random()*1000));
		} else if (this.temperature < 28.0) {
			//상온
			this.id = (labId + "C" + (int)(Math.random()*1000));
		} else if (this.temperature < 45.0) {
			//인큐베이터
			this.id = (labId + "D" + (int)(Math.random()*1000));
		} else {
			//오븐
			this.id = (labId + "E" + (int)(Math.random()*1000));
		}

	}

}